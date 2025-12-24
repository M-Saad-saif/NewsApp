import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Fetch news articles
  const fetchArticles = async (pageNumber = 1, showLoader = false) => {
    if (showLoader && props.setProgress) props.setProgress(10);

    try {
      const url = `/api/news?category=${props.category}&page=${pageNumber}`;
      const data = await fetch(url);

      // Safely parse JSON
      const json = await data.json();

      if (json.error) {
        console.error("API Error:", json.error);
        return; // stop if error returned
      }

      setArticles((prevArticles) => {
        // Combine and remove duplicates based on URL
        const uniqueArticles = [
          ...prevArticles,
          ...json.articles.filter(
            (a) => !prevArticles.some((prev) => prev.url === a.url)
          ),
        ];
        return uniqueArticles;
      });
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      if (showLoader && props.setProgress) props.setProgress(100);
    }
  };

  //  componentDidUpdate (category / country change)
  useEffect(() => {
    document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`;
    setArticles([]);
    setPage(1);
    fetchArticles(1, true);
    // eslint-disable-next-line
  }, [props.category, props.country]);

  //  Infinite scroll
  const fetchMoreData = () => {
    fetchArticles(page + 1);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">
        NewsApp - Top {capitalizeFirstLetter(props.category)} News
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        style={{ overflow: "hidden" }}
      >
        <div className="row my-3">
          {articles.map((element, index) => (
            <div
              className="newsitem-constainer col-md-4"
              key={element.url + index}
            >
              <NewsItems
                title={element.title?.slice(0, 40) || ""}
                description={element.description?.slice(0, 80) || ""}
                imgUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author || "Unknown"}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
