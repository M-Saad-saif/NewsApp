import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 11;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({progress: progress})
  };

  render() {
    return (
      <>
        <Router>
          <Navbar title="NewsApp" />
          <LoadingBar color="#2f19f1ff"  progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              key="general"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              key="business"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              key="entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="entertainment"
                />
              }
            />

            <Route
              exact
              path="/health"
              key="health"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/sports"
              key="sports"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/science"
              key="science"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/technology"
              key="technology"
              element={
                <News
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country="us"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}
