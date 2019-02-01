import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import MovieCard from './MovieCard.js'



import axios from 'axios';
const key = process.env.API_KEY;
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: null,
      open: false,
    }
    this.performSearch("avengers")
  } 
  performSearch(searchTerm) {

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}=` + searchTerm)
    .then(response =>{
      console.log("Bastarred", response)
      const results = response.data.results
      var movieRows = []
      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        //  console.log(movie.poster_path)

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({rows: movieRows, open: !this.state.open})
    })
    .catch(err => {
      console.log(err)
    })
  }
  playingNow = () => { 
    const currentDate = moment().format().slice(0, 10);
    console.log("This moment", currentDate)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&query=primary_release_date.gte=${currentDate}&primary_release_date.lte=${currentDate}`)
    .then(response =>{
      console.log("Bastarred", response)
      const results = response.data.results
      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        //  console.log(movie.poster_path)

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({rows: movieRows})
    })
    .catch(err => {
      console.log(err)
    })
  }
  topRated = () => {   
    // /discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&query=certification_country=US&certification=R&sort_by=vote_average.desc`)
    .then(response =>{
      console.log("Bastarred", response)
      const results = response.data.results
      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        //  console.log(movie.poster_path)

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({rows: movieRows})
    })
    .catch(err => {
      console.log(err)
    })
  }
  mostPopular = () => { 
    const now = moment().format().slice(0, 10);
    console.log("This moment", now)
    //discover/movie?sort_by=popularity.desc
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&query=sort_by=popularity.desc`)
    .then(response =>{
      console.log("Bastarred", response)
      const results = response.data.results
      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        //  console.log(movie.poster_path)

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({rows: movieRows})
    })
    .catch(err => {
      console.log(err)
    })
  }
  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }
  render() {
    return (
      <div className="container ">        
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img className="logo"alt="app icon" width = "74px" src="green_app_icon.svg"/>
              </td>
              <td width="8"/>
              <td>
                <h1>Ultimate Moviegoers Guide</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{display: "flex", justifyContent: "spaceBetween"}}className="nav">
        <input       
          className="text-input"           
         onChange={this.searchChangeHandler.bind(this)} placeholder="Search for a movie..."/>
        <div class="dropdown">
        <span>Filter</span>
        <div class="dropdown-content">
        <div className="item" onClick={this.playingNow}>Now Playing</div> <div className="item" onClick={this.mostPopular}>Popular</div> <div className="item" onClick={this.topRated }>Top Rated</div> 
        </div>
        </div>       
        </div>
        <div className="card-wrapp">
        {this.state.rows}  
        </div>
     
      </div>
       
    );
  }
}

export default App;
