import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

import React, { Component } from "react";

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

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    this.fetchArticles(1);
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country
    ) {
      this.setState({ page: 1 });
      this.fetchArticles(1);
    }
  }

  fetchArticles = async (page) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70ee2adecca94fe59d560de1fd9039b3&page=${page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let response = await data.json();
    this.setState({
      articles: response.articles,
      totalResults: response.totalResults,
      loading: false,
    });
  };

  handleNextbtn = async () => {
    if (
      this.state.page + 1 >
      Math.ceil((this.state.totalResults || 0) / this.props.pageSize)
    )
      return;
    const nextPage = this.state.page + 1;
    await this.fetchArticles(nextPage);
    this.setState({ page: nextPage });
  };

  handlePrevbtn = async () => {
    if (this.state.page <= 1) return;
    const prevPage = this.state.page - 1;
    await this.fetchArticles(prevPage);
    this.setState({ page: prevPage });
  };

  render() {
    return (
      <>
        <div className="container my-4">
          <h1>
            NewsApp - Top Daily news <i> {this.props.categorytitle}</i>
          </h1>
          {this.state.loading && <Spinner />}
          <div className="row my-3">
            {!this.state.loading &&
              (this.state.articles || []).map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
            <div className="btns">
              <button
                type="button"
                disabled={this.state.page <= 1}
                className="btn btn-primary"
                onClick={this.handlePrevbtn}
              >
                <i className="ri-arrow-left-fill"></i>Previous
              </button>
              <button
                type="button"
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
                className="btn btn-primary"
                onClick={this.handleNextbtn}
              >
                Next <i className="ri-arrow-right-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
