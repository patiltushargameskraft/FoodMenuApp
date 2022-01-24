import axios from 'axios';

let defaultState = {
    isResFav: {}
}

let favReducer = (state = defaultState, action) => {
    let newState = {
        ...state,
        isResFav: {...state.isResFav}
    }
    switch(action.type){
        case 'LOAD_FAV': {
            newState.isResFav = action.payload.isResFav
            return newState
        }
        case 'ADD_TO_FAV': {
            const resId = action.payload.resId;
            newState.isResFav[resId] = true
            return newState;
        }
        case 'REMOVE_FROM_FAV': {
            const resId = action.payload.resId;
            newState.isResFav[resId] = false;
            return newState;
        }
        default:
            return state;
    }
}

export default favReducer;

//action Creaters

export const removeResFromFavThunk = (userId, resId) => (dispatch) => {
    axios
      .delete(`https://food-menu-app-backend.herokuapp.com/restaurant/removeResFromFav/${userId}/${resId}`)
      .then(() => {
          dispatch({
              type: 'REMOVE_FROM_FAV',
              payload: {
                  resId
              }
          })
      }).catch(err => {
          console.log(err);
      });
}

export const addResToFavThunk = (userId, resId) => (dispatch) => {
    axios
      .post(`https://food-menu-app-backend.herokuapp.com/restaurant/addResToFav/${userId}/${resId}`)
      .then(() => {
          dispatch({
              type: 'ADD_TO_FAV',
              payload: {
                  resId
              }
          })
      }).catch(err => {
          console.log(err);
      });
}

export const loadFavResThunk = (userId) => (dispatch) => {
    axios
      .get(`https://food-menu-app-backend.herokuapp.com/getFavRes/${userId}`)
      .then((res) => {
          const favIds = res.data.data.map(res => res.id);
          let isResFav = {};
          for(let i = 0; i < favIds.length; i++){
              isResFav[favIds[i]] = true;
          }
          dispatch({
              type: 'LOAD_FAV',
              payload: {
                isResFav
              }
          })
      }).catch(err => {
          console.log(err);
      });
}