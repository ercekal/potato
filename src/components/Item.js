import React, { Component, PropTypes } from 'react';
import moment from 'moment'

const cls = s => s ? `Item-${s}` : 'Item'

export default class Item extends Component {
  // static propTypes = {
    //   item: PropTypes.object.isRequired,
    // }

  date = Date.parse(this.props.item.published)
  render () {
    console.log(this.props)
    return (
      <div className={cls()}>
        <div className={cls('image')}>
          <img src={this.props.item.media.m} />
        </div>
        <div className={cls('right')}>
        <div className={cls('right-title')}>
            {this.props.item.title}
          </div>
          <div className={cls('right-details')}>
            {this.props.item.author}
            {'   '} Published: {moment(this.date).format("Do MMM YYYY")}
            {' '}at {moment(this.date).format("HH:mm")}
            {'   '}<a href={this.props.item.link}>View on Flickr</a>
          </div>
        </div>
      </div>
    )
  }
}