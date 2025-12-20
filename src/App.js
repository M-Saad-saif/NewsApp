import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";

import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
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
              element={<News pageSize={6} country="us" category="general"  categorytitle=""/>}
            />
            <Route
              exact
              path="/business"
              key="business"
              element={<News pageSize={6} country="us" category="business" categorytitle="Business"/>}
            />
            <Route
              exact
              path="/entertainment"
              key="entertainment"
              element={
                <News pageSize={6} country="us" category="entertainment" categorytitle="Entertainment"/>
              }
            />
         
            <Route
              exact
              path="/health"
              key="health"
              element={<News pageSize={6} country="us" category="health" categorytitle="Health"/>}
            />
            <Route
              exact
              path="/sports"
              key="sports"
              element={<News pageSize={6} country="us" category="sports" categorytitle="Sports" />}
            />
            <Route
              exact
              path="/science"
              key="science"
              element={<News pageSize={6} country="us" category="science" categorytitle="Science"/>}
            />
            <Route
              exact
              path="/technology"
              key="technology"
              element={<News pageSize={6} country="us" category="technology" categorytitle="Technology"/>}
            />
          </Routes>
        </Router>
      </>
    );
  }
}
