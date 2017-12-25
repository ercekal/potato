import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems } from '../actions/index';
import Item from './Item'
import SearchBar from './SearchBar';

class List extends Component {
  // static propTypes = {
  //   items: PropTypes.array,
  // }

  componentWillMount() {
    this.props.fetchItems()
    console.log(this.props)
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
        return allItems.map(item => {
          return <Item key={item.title} item={item} />
        })
      }
    }
  }

  // renderList () {
  //   if (this.props.items.length > 0) {
  //     return this.props.items.map(item => {
  //       return <Item key={item.title} item={item} />
  //     })
  //   }
  // }

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
          Flicker Public Feed
          <SearchBar />
          {this.renderItemList()}
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItems }, dispatch)
}

function mapStateToProps(state) {
  console.log(state)
  return {
    items: state.items.items,
    searchTerm: state.search.searchTerm,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
