import React, { Component } from "react";
import $ from "jquery";

import Filter from "./Filter";

class Navbar extends Component {
  handleSeachChange = event => {
    const searchTerm = event.target.value;
    this.props.performSearch(searchTerm);
  };
  componentDidMount(){
      this.reload() 
    }
    //A simple reload method to reload the cards section when the logo is clicked.
  reload = () => {
    $(document).ready(function() {
      $("#logo").click(function() {
        $("#card-wrapp").load("#card-wrapp");
      });
    });
  };

  render() {
    return (
      <div className="nav-bar">
        <table className="title-bar">
          <tbody>
            <tr>
              <td>
                <img
                  onClick={this.reload}
                  id="logo"
                  alt="app icon"
                  width="74px"
                  src="green_app_icon.svg"
                />
              </td>
              <td width="8" />
              <td>
                <h1>Ultimate Moviegoers Guide</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="nav">
          <input
            className="input-box"
            style={{ fontSize: "14px" }}
            onChange={this.handleSeachChange}
            placeholder="Search for a movie..."
          />
          <Filter
            mostPopular={this.props.mostPopular}
            topRated={this.props.topRated}
            nowPlaying={this.props.nowPlaying}
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
