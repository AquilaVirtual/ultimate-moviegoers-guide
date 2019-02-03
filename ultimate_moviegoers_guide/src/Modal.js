import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./modal.css";
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };  
  render() {    
    return (
      <div>
        <div className="" onClick={this.handleClickOpen}>
          More Info
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">
          <DialogActions>
            <div className="button-wrap">
              <button  onClick={this.handleClose}>
                X
              </button>
            </div>
          </DialogActions>
            <div className="header_large">
              <div className="title_large"> {this.props.movie.title}</div>
              <div className="release-date_large">
                {this.props.movie.release_date}
              </div>
            </div>
            <img
              className="image_large"
              alt="poster"
              src={this.props.movie.poster_src}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className="overview_large">{this.props.movie.overview}</span>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Modal;
