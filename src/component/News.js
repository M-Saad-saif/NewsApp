import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) =>
    str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const fetchArticles = async (pageNumber, showLoader = false) => {
    if (showLoader) props.setProgress(10);

    const BackendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    const url = `${BackendURL}/api/news?country=${props.country}&category=${props.category}&page=${pageNumber}&pageSize=${props.pageSize}`;

    const data = await fetch(url);
    const response = await data.json();

    if (showLoader) props.setProgress(100);

    const articlesFromResponse = response.articles || [];

    setArticles((prevArticles) => {
      const uniqueArticles = articlesFromResponse.filter(
        (article) => !prevArticles.some((a) => a.url === article.url)
      );
      return pageNumber === 1
        ? uniqueArticles
        : [...prevArticles, ...uniqueArticles];
    });

    setTotalResults(response.totalResults || 0);
    setPage(pageNumber);
    console.log("Fetched articles:", articlesFromResponse);
  };

  useEffect(() => {
    document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`;
    setArticles([]);
    setPage(1);
    fetchArticles(1, true);
  }, [props.category, props.country]);

  const fetchMoreData = () => {
    fetchArticles(page + 1);
  };

  return (
    <div className="container" style={{marginTop: "6rem"}}>
      <h1 className="text-center">
        <i className="fa-solid fa-newspaper"></i> NewsApp - Top{" "}
        {capitalizeFirstLetter(props.category)} News
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
            <div className="container d-flex justify-content-center col-md-4 my-3" key={element.url + index}>
              <NewsItems
                title={element.title?.slice(0, 40) || "No Title"}
                description={element.description?.slice(0, 80) || "No Description"}
                imgUrl={element.urlToImage || "https://via.placeholder.com/150"}
                newsUrl={element.url || "#"}
                author={element.author || "Unknown"}
                date={element.publishedAt || "Unknown"}
                source={element.source?.name || "Unknown"}
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
