import React, { Component } from 'react';
import { searchItems } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchBar extends Component {

  constructor() {
    super()
    this.state = {
      term: ''
    }
  }

  onSearchChange(event) {
    this.props.searchItems(event.target.value)
    this.setState({
      term: event.target.value
    })
  }

  render() {
    return (
      <div className={'SearchBar'}>
        <input
          value={this.state.term}
          onChange={this.onSearchChange.bind(this)}
          placeholder='Search tags'
          />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchItems }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
