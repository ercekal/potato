import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItemDetails, fetchItems } from '../actions/index';
import { Link } from 'react-router-dom'

const cls = s => s ? `ItemDetails-${s}` : 'ItemDetails'

class ItemDetails extends Component {

  componentWillMount () {
    this.props.fetchItemDetails(this.props.match.params.itemTitle)
  }

  sliceDescription () {
    let description
    if (this.props.selectedItem) {
      description = this.props.selectedItem.description
      description = description.substr(description.lastIndexOf(' <p>') + 1)
      return description
    }
  }

  sliceAuthorLink () {
    let author
    if (this.props.selectedItem) {
      author = this.props.selectedItem.description
      author = author.substring(0, author.indexOf('posted'))
      return author.substring(4)
    }
  }

  renderTags () {
    let tags
    if (this.props.selectedItem) {
      tags = this.props.selectedItem.tags.split(" ")
    }
    return tags.map(tag => tag + ' ')
  }


  render () {
    const { selectedItem } = this.props
    if (!selectedItem) {
      return (
        <div className={cls('intro')}>
          Loading...
        </div>
      )
    } else if (selectedItem === 'none') {
      return (
        <div className={cls('intro')}>
          Please go to <Link to={'/'}>main page</Link> and navigate from there
        </div>
      )
    } else {

      const date = Date.parse(selectedItem.published)
      return (
        <div className={cls()}>
          <div className={cls('upper')}>
            <div className={cls('upper-left')}>
              <div className={cls('upper-left-title')}>
                <a href={selectedItem.link}>{selectedItem.title}</a>
              </div>
              <div className={cls('upper-left-details')}>
              <div dangerouslySetInnerHTML={{__html: this.sliceAuthorLink()}}>
              </div>
                {' '} | Published: {moment(this.date).format("Do MMM YYYY")}
                {' '}at {moment(this.date).format("HH:mm")}
              </div>
            </div>
            <div className={cls('upper-right')}>
              <Link to={'/'}>Back</Link>
            </div>
          </div>
          <div className={cls('lower')}>
            <div className={cls('lower-left')}>
              <img src={selectedItem.media.m} alt='' height='80px' width='80px'/>
            </div>
            <div className={cls('lower-right')}>
              <div dangerouslySetInnerHTML={{__html: this.sliceDescription()}}>
              </div>
              <div className={cls('tags')}>
                Tags: {this.renderTags()}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItemDetails, fetchItems }, dispatch)
}

function mapStateToProps(state) {
  return {
    selectedItem: state.items.selectedItem,
  }
}

ItemDetails.propTypes = {
  items: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
