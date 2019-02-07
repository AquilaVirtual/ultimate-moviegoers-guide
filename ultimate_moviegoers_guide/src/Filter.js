import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});
class Filter extends React.Component {
  state = {
    filter: '',
  };
  handleChange = event => {
    this.setState({ filter: event.target.value });        
  };
  handleFilter = () => {
    this.props.filterActions(this.state.filter)
    this.setState({ filter: "" });        
  }
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete="off"> 
       
        <FormControl className={classes.margin}>        
          <NativeSelect
            value={this.state.filter}
            onChange={this.handleChange}
            onClick={this.handleFilter}          
            input={<BootstrapInput name="filter" id="filter-customized-native-simple" />}
          >
            <option value="" />
            <option value={"Now Playing"} >Now Playing</option>
            <option value={"Popular"} >Popular</option>
            <option value={"Top Rated"} >Top Rated</option>
          </NativeSelect>
        </FormControl>
      </form>
    );
  }
}
Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);

