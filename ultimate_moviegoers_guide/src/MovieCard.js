import React from "react";
import "./MovieCard.css";
import Modal from "./Modal";
class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleModalToggle = () => {
    this.setState({
      open: !this.state.open
    });
    console.log("State of matter", this.state.open);
  };
  render() {
    return (
      <div className="post-card" key={this.props.movie.id}>
        <img className="image" alt="poster" src={this.props.movie.poster_src} />
        <div className="info">
          <div className="title">{this.props.movie.title}</div>
          <p className="overview">{this.props.movie.overview}...</p>
        </div>
        <p className="view_more" onClick={this.handleModalToggle}>
          More Info
        </p>
      </div>
    );
  }
}

export default MovieCard;
