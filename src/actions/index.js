import axios from 'axios'

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEM_DETAILS = 'FETCH_ITEM_DETAILS';
export const SEARCH_TERM = 'SEARCH_TERM';

export function fetchItems () {
  return dispatch => {
    axios.get('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&nojsoncallback=1')
    .then(res => {
      console.log(res.data.items)
      dispatch({
        type: FETCH_ITEMS,
        payload: res.data.items
      })
    })
  }
}

export function fetchItemDetails (itemTitle) {
  return  {
    type: FETCH_ITEM_DETAILS,
    payload: itemTitle
  }
}

export function searchItems (term) {
  return  {
    type: SEARCH_TERM,
    payload: term
  }
}
