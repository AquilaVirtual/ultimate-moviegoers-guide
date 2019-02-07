import React, { Component } from "react";
import "./App.css";
import MovieCard from "./MovieCard.js";
import Navbar from "./Navbar";

import axios from "axios";
let key = process.env.API_KEY;
class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,     
    };
    //Here we have Avengers as a default search term, so when a user visits the site, they done just see a blank page
    this.performSearch("avengers");
  } 
  //Noticeably, there's no life-cycle method being called here,
  //this is because none is needed. And state is always populated at every time the application is running, which performSearch takes care of.
  performSearch = searchTerm => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=` +
          searchTerm
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
  filterActions = (val) => {
   let url = "";    
    if(val === "Now Playing") {
      url =  `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
    }
    else if(val === "Top Rated") {
      url =  `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}1b5adf76a72a13bad99b8fc0c68cb085&language=en-US&page=1`
    }
    else if(val === "Popular") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
    }
    axios
      .get(url
      )
      .then(response => {
        // console.log("These response", response);
        const results = response.data.results;
        if(results) {
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
      }
      else {
        return;
      }
      })
      .catch(err => {
        console.log("Error here", err);
      });    
  };
  render() {
    return (
      <div className="container ">
        <Navbar
          performSearch={this.performSearch}
          filterActions={this.filterActions}        
        />
        <div id="card-wrapp">{this.state.movies}</div>
      </div>
    );
  }
}

export default App;
