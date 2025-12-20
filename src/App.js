import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 11
  render() {
    return (

      <>
        <Router>
          <Navbar title="NewsApp" />
          <Routes>
            <Route
              exact
              path="/"
              key="general"
              element={<News pageSize={this.pageSize} country="us" category="general"  />}
            />
            <Route
              exact
              path="/business"
              key="business"
              element={<News pageSize={this.pageSize} country="us" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              key="entertainment"
              element={
                <News pageSize={this.pageSize} country="us" category="entertainment" />
              }
            />
         
            <Route
              exact
              path="/health"
              key="health"
              element={<News pageSize={this.pageSize} country="us" category="health" />}
            />
            <Route
              exact
              path="/sports"
              key="sports"
              element={<News pageSize={this.pageSize} country="us" category="sports"  />}
            />
            <Route
              exact
              path="/science"
              key="science"
              element={<News pageSize={this.pageSize} country="us" category="science" />}
            />
            <Route
              exact
              path="/technology"
              key="technology"
              element={<News pageSize={this.pageSize} country="us" category="technology" />}
            />
          </Routes>
        </Router>
      </>
    );
  }
}
