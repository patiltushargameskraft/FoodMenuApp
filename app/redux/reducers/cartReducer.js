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
    .then(() => console.log('Added to cart'));
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

const removeAllItemFromCart = () => {
  axios
    .delete('http://localhost:3000/cart/checkOutCartItems/1')
    .catch(err => {
      console.log(err);
      throw err;
    })
    .then(() => console.log('Removed All from cart'));
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let newState = {...state};

      console.log(action.payload.counterType);

      if (newState.selectedItems.restaurantId !== action.payload.restaurantId) {
        newState.selectedItems.items = [];
        removeAllItemFromCart();
      }

      if (action.payload.counterType === '+') {
        addItemToCart(1, 1, action.payload.id);
        newState.selectedItems.items.push(action.payload);
      } else if (action.payload.orderId) {
        removeItemFromCart(action.payload.orderId);
      }

      newState.selectedItems = {
        items: newState.selectedItems.items,
        restaurantId: action.payload.restaurantId,
      };

      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
