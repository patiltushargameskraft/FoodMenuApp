let defaultState = {
  selectedItems: {items: [], restaurantName: ''},
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let newState = {...state};

      console.log(action.payload.id);

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
        restaurantName: action.payload.restaurantName,
      };

      console.log(newState.selectedItems, '👉');
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
