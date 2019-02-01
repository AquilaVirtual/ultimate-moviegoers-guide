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
      movies: null,    
    }
    //Here we have Avengers as a default search term, so when a user visits the site, they done just see a blank page
    this.performSearch("avengers")
  } 
  //Noticeably, there's no life-cycle method being being called outside render in the whole of the application, 
  //this is because none is needed. And state is always populated at every time the application is running, which performSearch takes care of.
  performSearch(searchTerm) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}=` + searchTerm)
    .then(response =>{     
      const results = response.data.results
      var movieRows = []
      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path      

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({movies: movieRows})
    })
    .catch(err => {
      console.log("Erro here", err)
    })
  }
  //The reason why all methods for getting Rating, PlayingNow, Popular infos is because there's no obvious resean to separate concern.
  //It's farely easy to refactor for scalability
  playingNow = () => { 
    const currentDate = moment().format().slice(0, 10);
    console.log("This moment", currentDate)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&query=primary_release_date.gte=${currentDate}&primary_release_date.lte=${currentDate}`)
    .then(response =>{   
      const results = response.data.results
      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path   

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({movies: movieRows})
    })
    .catch(err => {
      console.log("Erro here", err)
    })
  }
  topRated = () => {   
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&query=certification_country=US&certification=R&sort_by=vote_average.desc`)
    .then(response =>{   
      const results = response.data.results
      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path       

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({movies: movieRows})
    })
    .catch(err => {
      console.log("Erro here", err)
    })
  }
  mostPopular = () => {     
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&query=sort_by=popularity.desc`)
    .then(response =>{ 
      const results = response.data.results
      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path      

        const movieRow = <div className="card-wrapp"><MovieCard key={movie.id} movie={movie}/> </div>
        movieRows.push(movieRow)
      })
      this.setState({movies: movieRows})
    })
    .catch(err => {
      console.log("Erro here", err)
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
        {this.state.movies}  
        </div>
     
      </div>
       
    );
  }
}

export default App;
