import React, { Component } from "react";
import "./App.css";
import MovieCard from "./MovieCard.js";
import Navbar from "./Navbar";
// import Filter from "./Filter";

import axios from "axios";
let key = process.env.API_KEY;
class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      url: null
    };
    //Here we have Avengers as a default search term, so when a user visits the site, they done just see a blank page
    this.performSearch("avengers");
  }
  
  //Noticeably, there's no life-cycle method being being called outside render in the whole of the application,
  //this is because none is needed. And state is always populated at every time the application is running, which performSearch takes care of.
  performSearch = searchTerm => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=` +
          searchTerm
      )
      .then(response => {
        // console.log("These response", response)
        // console.log("Some Response", response)
        const results = response.data.results;
        var movieArray = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            movie.poster_src = "https://picsum.photos/200/300/?random";
          }
          const movieItem = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieArray.push(movieItem);
        });
        this.setState({ movies: movieArray });
      })
      .catch(err => {
        console.log("Erro here", err);
      });
  };  
  // nowPlaying, topRated, and mostPopular methods need to be refactored into one method for code to be DRY.
  nowPlaying = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
      )
      .then(response => {
        const results = response.data.results;
        var movieArray = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            movie.poster_src = "https://picsum.photos/200/300/?random";
          }
          const movieItem = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieArray.push(movieItem);
        });
        this.setState({ movies: movieArray });
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
        let movieArray = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            if (movie.poster_path) {
              movie.poster_src =
                "https://image.tmdb.org/t/p/w185" + movie.poster_path;
            } else {
              movie.poster_src = "https://picsum.photos/200/300/?random";
            }
          }
          const movieItem = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieArray.push(movieItem);
        });
        this.setState({ movies: movieArray });
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
        // console.log("These response", response);
        const results = response.data.results;
        let movieArray = [];
        results.forEach(movie => {
          if (movie.poster_path) {
            movie.poster_src =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          } else {
            //Placeholder for a null poster_path
            movie.poster_src = "https://picsum.photos/200/300/?random";
          }
          const movieItem = (
            <div className="card-wrapp" key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />{" "}
            </div>
          );
          movieArray.push(movieItem);
        });
        this.setState({ movies: movieArray });
      })
      .catch(err => {
        console.log("Erro here", err);
      });
  };
  render() {
    return (
      <div className="container ">
        <Navbar
          performSearch={this.performSearch}
          mostPopular={this.mostPopular}
          topRated={this.topRated}
          nowPlaying={this.nowPlaying}
        />
        <div id="card-wrapp">{this.state.movies}</div>
      </div>
    );
  }
}

export default App;
