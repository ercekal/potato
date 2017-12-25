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
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
  }

  // renderItemList() {
  //   let allItems = this.props.items
  //   let selectedItems = []
  //   if (this.props.selectedCategory !== "" && typeof(allItems) !== "undefined" && allItems.length > 0) {
  //     selectedItems = allItems.filter((item) => {
  //       return item.categories.find((ele) => {
  //         return ele.title === this.props.selectedCategory
  //       })
  //     })
  //     return <ItemList selectedCategoryTitle={this.props.selectedCategory} items={selectedItems} />
  //   }
  // }

  renderList () {
    if (this.props.items.length > 0) {
      console.log(this.props.items)
      return this.props.items.map(item => {
        console.log(item)
        return <Item key={item.published} item={item} />
      })
    }
  }

  render () {
    if (!this.props.items) {
      console.log(this.props.items)
      return(
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <div>
          <SearchBar />
          {this.renderList()}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
