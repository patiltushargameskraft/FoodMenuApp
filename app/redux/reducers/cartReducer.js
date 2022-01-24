import axios from 'axios';
const _ = require('lodash');

let defaultState = {
  selectedItems: {items: [], restaurantId: null},
};

//reducer

let cartReducer = (state = defaultState, action) => {
  let newState = {
    ...state,
    selectedItems: {
      restaurantId: state.selectedItems.restaurantId,
      items: [...state.selectedItems.items],
    },
  };

  console.log('action Type', action.type);
  // console.log('action Payload', JSON.stringify(action.payload));

  switch (action.type) {
    case 'ADD_TO_CART': {
      if (newState.selectedItems.restaurantId !== action.payload.restaurantId) {
        newState.selectedItems.items = [];
        newState.selectedItems.restaurantId = action.payload.restaurantId;
      }

      if (action.payload.counterType === '+') {
        newState.selectedItems.items.push(action.payload.item);
      } else {
        newState.selectedItems.items = newState.selectedItems.items.filter(
          item => item.order_id !== action.payload.orderId,
        );
      }
      console.log('NEWS STATE', newState.selectedItems.items);
      return newState;
    }

    case 'LOAD_CART': {
      newState.selectedItems = action.payload.selectedItems;
      return newState;
    }

    case 'UPDATE_ITEM_IN_CART': {
      let index = newState.selectedItems.items.findIndex(
        item => item.order_id === action.payload.orderId,
      );
      newState.selectedItems.items[index].quantity += 1;
      return newState;
    }

    case 'CHECK_OUT_CART': {
      newState.selectedItems.items = [];
      newState.selectedItems.restaurantId = null;
      return newState;
    }

    case 'DECREASE_QUANTITY': {
      let index = newState.selectedItems.items.findIndex(
        item => item.order_id === action.payload.orderId,
      );
      newState.selectedItems.items[index].quantity -= 1;
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;

//action Creators

export const modifyItemInCartThunk =
  (item, number, counterType, restaurantId) => (dispatch, getState) => {
    const onDispatch = (item, orderId) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          item,
          restaurantId: item.restaurant_id,
          counterType: counterType,
          orderId,
        },
      });
    };

    const userId = getState().userReducer.userId;

    let cartIsEmpty = 0;

    if (
      getState().cartReducer.selectedItems.items.length &&
      getState().cartReducer.selectedItems.restaurantId !== item.restaurant_id
    ) {
      axios
        .delete(
          `https://food-menu-app-backend.herokuapp.com/cart/checkOutCartItems/${userId}`,
        )
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          cartIsEmpty = 1;
          console.log('Removed All from cart');
        });
    }

    if (counterType === '+') {
      const cartItems = getState().cartReducer.selectedItems.items;
      for (let i = 0; i < cartItems.length && cartIsEmpty !== 1; i++) {
        if (
          cartItems[i].dish_id === item.id &&
          _.isEqual(cartItems[i].addons, item.addons)
        ) {
          console.log('duplicate found in cart');
          axios
            .post(
              `https://food-menu-app-backend.herokuapp.com/dish/increaseQuantityInCart/${cartItems[i].order_id}`,
            )
            .then(() => {
              dispatch({
                type: 'UPDATE_ITEM_IN_CART',
                payload: {
                  orderId: cartItems[i].order_id,
                },
              });
            })
            .catch(err => {
              console.log(err);
            });
          return;
        }
      }

      axios
        .post(
          'https://food-menu-app-backend.herokuapp.com/dish/addDishToCart/',
          {
            quantity: number,
            userId,
            dishId: item.id,
            addons: item.addons.map(addon => addon.id),
          },
        )
        .then(res => {
          axios
            .get(
              `https://food-menu-app-backend.herokuapp.com/cart/getOrderItemDetail/${userId}/${res.data.insertId}`,
            )
            .then(res => {
              res.data.data[0].addons = item.addons;
              onDispatch(res.data.data[0], res.data.data[0].order_id);
            })
            .catch(err => {
              console.log(err);
            });
          console.log('Added to cart');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .delete(
          `https://food-menu-app-backend.herokuapp.com/cart/deleteFromCart/${userId}/${item.order_id}`,
        )
        .then(() => {
          onDispatch(item, item.order_id);
          console.log('Removed from cart');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

export const checkOutCartThunk = () => (dispatch, getState) => {
  const userId = getState().userReducer.userId;
  axios
    .delete(
      `https://food-menu-app-backend.herokuapp.com/cart/checkOutCartItems/${userId}`,
    )
    .catch(err => {
      console.log(err);
    })
    .then(() => {
      dispatch({
        type: 'CHECK_OUT_CART',
        payload: {},
      });
      console.log('Removed All from cart');
    });
};

export const getOrdersThunk = () => (dispatch, getState) => {
  const userId = getState().userReducer.userId;
  console.log('In getordersThunk', userId);
  axios
    .get(`https://food-menu-app-backend.herokuapp.com/cart/${userId}`)
    .then(res => {
      if (res.data.data.length) {
        dispatch({
          type: 'LOAD_CART',
          payload: {
            selectedItems: {
              items: res.data.data,
              restaurantId: res.data.data[0].restaurant_id,
            },
          },
        });
      }
    })
    .catch(err => {
      console.log('order thunk', err);
    });
};

export const increaseQuantityInCartThunk = orderId => (dispatch, getState) => {
  const userId = getState().userReducer.userId;
  axios
    .post(
      `https://food-menu-app-backend.herokuapp.com/dish/increaseQuantityInCart/${orderId}`,
    )
    .then(() => {
      dispatch({
        type: 'UPDATE_ITEM_IN_CART',
        payload: {
          orderId,
        },
      });
    })
    .catch(err => {
      console.log(err);
    });
  return;
};

export const decreaseQuantityInCartThunk = orderId => (dispatch, getState) => {
  const userId = getState().userReducer.userId;
  axios
    .post(
      `https://food-menu-app-backend.herokuapp.com/cart/decreaseQuantityInCart/${orderId}`,
    )
    .then(() => {
      dispatch({
        type: 'DECREASE_QUANTITY',
        payload: {
          orderId,
        },
      });
    })
    .catch(err => {
      console.log(err);
    });
  return;
};
