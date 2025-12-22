import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    document.title = `NewsApp - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
    this.fetchArticles(1);
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country
    ) {
      document.title = `NewsApp - ${this.capitalizeFirstLetter(
        this.props.category
      )}`;
      this.setState({ page: 1, articles: [] }, () => this.fetchArticles(1));
    }
  }

  fetchArticles = async (page) => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70ee2adecca94fe59d560de1fd9039b3&page=${page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let response = await data.json();
    console.log(response);
    // Filter duplicates
    const uniqueArticles = response.articles.filter(
      (article) => !this.state.articles.some((a) => a.url === article.url)
    );

    this.setState({
      articles: this.state.articles.concat(uniqueArticles),
      totalResults: response.totalResults,
      page,
    });
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    this.fetchArticles(nextPage);
  };

  render() {
    return (
      <>
        <div className="container my-4">
          <h1>
            NewsApp -
            <small>
              Top {this.capitalizeFirstLetter(this.props.category)} news
            </small>
          </h1>

          <div className="News-section">
            <InfiniteScroll
              style={{ overflow: " hidden" }}
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner />}
            >
              <div className="row my-3">
                {(this.state.articles || []).map((element, index) => (
                  <div
                    className="col-md-4"
                    key={element.url + index} // ensures unique key
                  >
                    <NewsItems
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }
}
