import React, { Component } from "react";
import "./App.css";
import MovieCard from "./MovieCard.js";
import $ from "jquery";

import axios from "axios";
let key = process.env.API_KEY;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      url: null
    };
    //Here we have Avengers as a default search term, so when a user visits the site, they done just see a blank page
    this.performSearch("avengers");
  }
  //A simple reload function to reload the cards section when the logo is clicked.
  reload() {
    $(document).ready(function() {
      $("#logo").click(function() {
        $("#card-wrapp").load("#card-wrapp");
      });
    });
  }
  //Noticeably, there's no life-cycle method being being called outside render in the whole of the application,
  //this is because none is needed. And state is always populated at every time the application is running, which performSearch takes care of.
  performSearch(searchTerm) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=` +
          searchTerm
      )
      .then(response => {
        // console.log("These response", response)
        // console.log("Some Response", response)
        const results = response.data.results;
        var movieRows = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            movie.poster_src = "https://picsum.photos/200/300/?random";
          }
          const movieRow = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieRows.push(movieRow);
        });
        this.setState({ movies: movieRows });
      })
      .catch(err => {
        console.log("Erro here", err);
      });
  }
  //The reason why all methods for getting Rating, PlayingNow, Popular infos is because there's no obvious resean to separate concern.
  //It's farely easy to refactor for scalability
  nowPlaying = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}85&language=en-US&page=1`
      )
      .then(response => {
        const results = response.data.results;
        var movieRows = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            movie.poster_src = "https://picsum.photos/200/300/?random";
          }
          const movieRow = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieRows.push(movieRow);
        });
        this.setState({ movies: movieRows });
      })
      .catch(err => {
        console.log("Erro here", err);
      });
  };
  topRated = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
      )
      .then(response => {
        const results = response.data.results;
        var movieRows = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            if (movie.poster_path) {
              movie.poster_src =
                "https://image.tmdb.org/t/p/w185" + movie.poster_path;
            } else {
              movie.poster_src = "https://picsum.photos/200/300/?random";
            }
          }
          const movieRow = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieRows.push(movieRow);
        });
        this.setState({ movies: movieRows });
      })
      .catch(err => {
        console.log("Erro here", err);
      });
  };
  mostPopular = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      )
      .then(response => {
        console.log("These response", response);
        const results = response.data.results;
        var movieRows = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            movie.poster_src = "https://picsum.photos/200/300/?random";
          }
          const movieRow = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieRows.push(movieRow);
        });
        this.setState({ movies: movieRows });
      })
      .catch(err => {
        console.log("Erro here", err);
      });
  };
  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div className="container ">
        <div className="nav-bar">
          <table className="titleBar">
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
              onChange={this.searchChangeHandler.bind(this)}
              placeholder="Search for a movie..."
            />
            <ul className="dropdown">
              <span>Filter</span>

              <div id="dropdown-content">
                <li id="item">
                  <span onClick={this.nowPlaying}> Now Playing</span>
                </li>
                <li id="item">
                  <span onClick={this.topRated}> Top Rated</span>
                </li>
                <li id="item">
                  <span onClick={this.mostPopular}>Popular</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div id="card-wrapp">{this.state.movies}</div>
      </div>
    );
  }
}

export default App;
