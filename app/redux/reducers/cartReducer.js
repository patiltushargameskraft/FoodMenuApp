import axios from 'axios';

let defaultState = {
  selectedItems: {items: [], restaurantId: ''},
};

const addItemToCart = (quantity, userId, dishId, addons) => {
  axios
    .post('http://localhost:3000/dish/addDishToCart/', {
      quantity: quantity,
      userId: userId,
      dishId: dishId,
      addons: addons,
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

      console.log('add_to_cart action payload -> ', action.payload);

      if (newState.selectedItems.restaurantId !== action.payload.restaurantId) {
        console.log("YES I REMOVED", "newState: ", newState.selectedItems.restaurantId, "old State", action.payload.restaurantId); 
        newState.selectedItems.items = [];
        removeAllItemFromCart();
      }

      if (action.payload.counterType === '+') {
        addItemToCart(1, 1, action.payload.id, action.payload.addons.map(addon => addon.id));
        newState.selectedItems.items.push(action.payload);
      } else if (action.payload.orderId) {
        removeItemFromCart(action.payload.orderId);
      }

      newState.selectedItems = {
        items: newState.selectedItems.items,
        restaurantId: action.payload.restaurantId,
      };

      console.log("item in new State", newState.selectedItems.items);

      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
