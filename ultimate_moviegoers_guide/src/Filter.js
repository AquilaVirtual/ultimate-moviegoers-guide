import React, { Component } from "react";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      item: ""
    };
  }
  //Having issues updating state with innerText of clicked element, when done it should help make filter actions in APP.js to be DRY
  handleFilter = () => {
    let item = "";
    let li = document.querySelectorAll("ul li");
    li.forEach(function(el) {
      return el.addEventListener("click", onClick, false);
    });
    function onClick(e) {
      let li = e.currentTarget;
      let span = li.querySelector("span");
      item = span.innerText;
    }
    this.setState({
      item: item
    });
    //this.props.filterActions(this.state.item);
  };
  render() {
    return (
      <div>
        <ul className="dropdown">
          <span>Filter</span>
          <div className="dropdown-content">
            <li className="item">
              <span onClick={this.props.nowPlaying}>Now Playing</span>
            </li>
            <li className="item">
              <span onClick={this.props.mostPopular}>Popular</span>
            </li>
            <li className="item">
              <span onClick={this.props.topRated}>Top Rated</span>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

export default Filter;
