import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import favReducer from './favReducer';
import userReducer from './userReducer';

let reducers = combineReducers({
  cartReducer: cartReducer,
  favReducer: favReducer,
  userReducer: userReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
