import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null
    };
    this.performSearch("ant man");
  }
  performSearch(searchTerm) {
    const key = process.env.REACT_APP_SECRET;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}=` + searchTerm
      )
      .then(response => {
        console.log("Fire!", response);
        const results = response.data.results;
        var moviesArray = [];
        this.setState({ movies: moviesArray });
      })
      .catch(err => {
        console.log(err);
      });
  }
  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div className="container ">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="74px" src="green_app_icon.svg" />
              </td>
              <td width="8" />
              <td>
                <h1>Ultimate Moviegoers Guide</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "23%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            borderRadius: "5px"
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Search for a movie..."
        />
      </div>
    );
  }
}

export default App;
