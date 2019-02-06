import React, { Component } from "react";

class Navbar extends Component {
  handleSeachChange = event => {
    const searchTerm = event.target.value;
    this.props.performSearch(searchTerm);
  };
  render() {
    return (
      <div>
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
            <ul className="dropdown">
              <span>Filter</span>

              <div className="dropdown-content">
                <li className="item">
                  <span onClick={this.props.nowPlaying}>Now Playing</span>
                </li>
                <li className="item">
                  <span onClick={this.props.topRated}>Top Rated</span>
                </li>
                <li className="item">
                  <span onClick={this.props.mostPopular}>Popular</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
