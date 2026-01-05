import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 11;
  let Apikey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <Navbar title="NewsApp" />
        <LoadingBar color="#000000ff" height={3} progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                key="general"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                key="business"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                key="entertainment"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="entertainment"
              />
            }
          />

          <Route
            exact
            path="/health"
            element={
              <News
                key="health"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                key="sports"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                key="science"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                key="technology"
                Apikey={Apikey}
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
