import axios from 'axios';

let defaultState = {
  selectedItems: {items: [], restaurantId: ''},
};

const addItemToCart = (quantity, userId, dishId) => {
  axios
    .post('http://localhost:3000/dish/addDishToCart/', {
      quantity: quantity,
      userId: userId,
      dishId: dishId,
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
    .then(() => console.log('added'));
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let newState = {...state};

      addItemToCart(1, 1, action.payload.id);

      if (newState.selectedItems.restaurantId !== action.payload.restaurantId) {
        newState.selectedItems.items = [];
      }

      const idx = state.selectedItems.items.findIndex(
        item => item.id === action.payload.id,
      );

      if (idx !== -1) {
        newState.selectedItems.items[idx].qty = action.payload.qty;
      } else {
        newState.selectedItems.items.push(action.payload);
      }

      newState.selectedItems = {
        items: newState.selectedItems.items.filter(item => item.qty !== 0),
        restaurantId: action.payload.restaurantId,
      };

      console.log(newState.selectedItems, '👉');
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
