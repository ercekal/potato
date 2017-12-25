import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems } from '../actions/index';
import Item from './Item'
import SearchBar from './SearchBar';

const INITIAL_LIMIT = 5
class List extends Component {
  // static propTypes = {
  //   items: PropTypes.array,
  // }

  componentWillMount() {
    this.props.fetchItems()
  }

  componentWillUnmount () {
    this.setState({ limit: INITIAL_LIMIT})
  }

  state = {
    limit: INITIAL_LIMIT,
  }

  onLoadMore = () => {
    this.setState({
      limit: this.state.limit + INITIAL_LIMIT
    });
  }

  renderItemList () {
    if (this.props.items.length > 0) {
      let allItems = this.props.items
      let selectedItems = []
      if (this.props.searchTerm) {
        selectedItems = allItems.filter(item => {
          return item.tags.includes(this.props.searchTerm)
        })
        return selectedItems.map(item => {
          return <Item key={item.title} item={item} />
        })
      } else {
        return allItems.slice(0, this.state.limit).map(item => {
          return <Item key={item.title} item={item} />
        })
      }
    }
  }

  render () {
    if (!this.props.items) {
      return(
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div className={'List'}>
          <div className={'List-header'}>
            Flicker Public Feed
          </div>
          <SearchBar />
          {this.renderItemList()}
          <a href="#" onClick={this.onLoadMore}>Load More</a>
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItems }, dispatch)
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
    searchTerm: state.search.searchTerm,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
