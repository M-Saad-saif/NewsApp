import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";

import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar title="NewsApp" HomeTitle="Home" AboutTitle="About" />
        
        <News pageSize={6}/>
      </>
    );
  }
}
