import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import React, { Component } from "react";

export default class News extends Component {
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
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70ee2adecca94fe59d560de1fd9039b3&page=1&pageSize=${this.props.pageSize}`;

    this.setState({loading: true})

    let data = await fetch(url);
    let response = await data.json();
    this.setState({
      articles: response.articles,
      totalResults: response.totalResults,
      loading: false
    });
  }

  handleNextbtn = async () => {
    if (
      this.state.page + 1 >
      Math.ceil((this.state.totalResults || 0) / this.props.pageSize)
    )
      return;

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70ee2adecca94fe59d560de1fd9039b3&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let response = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: response.articles,
      loading: false,
    });
  };

  handlePrevbtn = async () => {
    if (this.state.page <= 1) return;

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=70ee2adecca94fe59d560de1fd9039b3&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({loading: true})

    let data = await fetch(url);
    let response = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: response.articles,
      loading: false
    });
  };

  render() {
    return (
      <>
        <div className="container my-4">
          <h1>NewsApp - top Daily news</h1>
          {this.state.loading && <Spinner />}
          <div className="row my-3">
            {!this.state.loading &&(this.state.articles || []).map((element) => {
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
