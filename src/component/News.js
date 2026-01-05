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
  const fetchArticles = async (pageNumber, showLoader = false) => {
    if (showLoader) props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.Apikey}&page=${pageNumber}&pageSize=${props.pageSize}`;

    const data = await fetch(url);
    const response = await data.json();

    if (showLoader) props.setProgress(100);

    setArticles((prevArticles) => {
      const uniqueArticles = response.articles.filter(
        (article) => !prevArticles.some((a) => a.url === article.url)
      );
      return pageNumber === 1
        ? uniqueArticles
        : [...prevArticles, ...uniqueArticles];
    });

    setTotalResults(response.totalResults);
    setPage(pageNumber);
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
       <i class="fa-solid fa-newspaper"></i> NewsApp - Top {capitalizeFirstLetter(props.category)} News
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
            <div className="newsitem-constainer col-md-4" key={element.url + index}>
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
  Apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func,
};

export default News;  