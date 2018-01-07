import { FETCH_ITEMS, FETCH_ITEM_DETAILS } from '../actions/index'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS:
    return {...state, items: action.payload};
    case FETCH_ITEM_DETAILS:
    let selectedItem
    if (state.items) {
      selectedItem = state.items.filter(item => item.title === action.payload)
    } else {
      selectedItem = ['none']
    }
    return {...state, selectedItem: selectedItem[0]};
    default:
  }
  return state;
}
