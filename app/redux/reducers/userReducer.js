let defaultState = {
  userId: '',
};

let userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER': {
      let newState = {...state};

      newState.userId = action.payload.userId;
      console.log('user state', newState);

      return newState;
    }

    default:
      return state;
  }
};

export default userReducer;
