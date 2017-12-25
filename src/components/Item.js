import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'

const cls = s => s ? `Item-${s}` : 'Item'

export default class Item extends Component {
  // static propTypes = {
    //   item: PropTypes.object.isRequired,
    // }
  sliceAuthorLink () {
    let author
    if (this.props.item) {
      author = this.props.item.description
      author = author.substring(0, author.indexOf('posted'))
      return author.substring(4)
    }
  }
  date = Date.parse(this.props.item.published)
  render () {
    const {item} = this.props
    return (
      <div className={cls()}>
        <Link to={`/item/${item.title}`}>
          <div className={cls('image')}>
            <img src={item.media.m} height='80px' width='80px'/>
          </div>
        </Link>
          <div className={cls('right')}>
          <Link to={`/item/${item.title}`}>
            <div className={cls('right-title')}>
              {item.title}
            </div>
          </Link>
            <div className={cls('right-details')}>
              <div className={cls('right-details-author')} dangerouslySetInnerHTML={{__html: this.sliceAuthorLink()}}>
              </div>
              <div className={cls('right-details-date')}>
              Published: {moment(this.date).format("Do MMM YYYY")}
              {' '}at {moment(this.date).format("HH:mm")}
              </div>

              <div className={cls('right-details-authorAndLink')}>
                <div className={cls('right-details-smallerView-author')} dangerouslySetInnerHTML={{__html: this.sliceAuthorLink()}}>
                </div>
                <div className={cls('right-details-itemLink')}>
                  <a href={item.link}>View on Flickr</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}