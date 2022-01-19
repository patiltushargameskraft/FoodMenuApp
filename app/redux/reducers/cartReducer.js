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

const removeItemFromCart = orderId => {
  axios
    .delete(`http://localhost:3000/cart/deleteFromCart/1/${orderId}`)
    .catch(err => {
      console.log(err);
      throw err;
    })
    .then(() => console.log('Removed from cart'));
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let newState = {...state};

      console.log(action.payload.counterType);

      if (newState.selectedItems.restaurantId !== action.payload.restaurantId) {
        newState.selectedItems.items = [];
      }

      if (action.payload.counterType === '+') {
        addItemToCart(1, 1, action.payload.id);
      } else if (action.payload.orderId) {
        removeItemFromCart(action.payload.orderId);
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
