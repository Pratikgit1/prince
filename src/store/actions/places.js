import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE,USER_DATA } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";


export const addUser = () => {
    return {
        type: USER_DATA,
  
    };
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(uiStartLoading());
      dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
        .then(token => {
          return fetch(
            "https://awesome-places-1511248766522.firebaseio.com/places.json?auth=" +
              token
          );
        })
        .catch(() => {
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
          const places = [];
          for (let key in parsedRes) {
            places.push({
              ...parsedRes[key],
              image: {
                uri: parsedRes[key].image
              },
              key: key
            });
          }
          dispatch(uiStopLoading());
          dispatch(setPlaces(places));
        })
        .catch(err => {
          alert("Something went wrong, sorry :/");
          console.log(err);
          dispatch(uiStopLoading());
        });
    };
  };

  export const setPlaces = places => {
    return {
      type: SET_PLACES,
      places: places
    };
  };

export const deletePlace = () => {
    return {
        type: DELETE_PLACE
    };
};

export const selectPlace = (key) => {
    return {
        type: SELECT_PLACE,
        placeKey: key
    };
};

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    };
};