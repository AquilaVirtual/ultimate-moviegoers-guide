
import React from 'react'
import "./MovieCard.css"

import Modal from "./Modal";
class MovieCard extends React.Component {
  render() {    
return (
  <div>
  <div className="post-card" key={this.props.movie.id}>
  <img className="image"alt="poster" src={this.props.movie.poster_src}/>
  <div className="info">
  <div className="title">{this.props.movie.title}</div>
  <div className="release_date">{this.props.movie.release_date}</div>
  <p className="overview">{this.props.movie.overview}...</p>
  </div>
  <div className="view_more" onClick={this.handleModalToggle}   > <Modal movie={this.props.movie}/></div>
  </div>
   </div>
)
  }
}

export default MovieCard;