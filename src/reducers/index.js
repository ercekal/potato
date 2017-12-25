import { combineReducers } from 'redux';
import ItemsReducer from './items_reducer';
import SearchReducer from './search_reducer';

const rootReducer = combineReducers({
  items: ItemsReducer,
  search: SearchReducer
});

export default rootReducer;
