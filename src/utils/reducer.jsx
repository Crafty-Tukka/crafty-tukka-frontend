export const reducer = (state, action) => {
  // recieves current state and implements action we want to implement
  // action is object with 2 keys, type and value
  // console.log(action);
  // console.log(state);
  // // the type key determines the action we are taking
  // // the data key contains the data necessary to update the state
  switch (action.type) {
    // the function will return the updated state
    case 'setEvents': {
      //populate the messageList Array with the inital values
      return {
        ...state,
        confirmedEvents: action.data
      };
    }
    case 'setVenues': {
      //populate the messageList Array with the inital values
      return {
        ...state,
        venues: action.data
      };
    }
    case 'setFoodTrucks': {
      //populate the messageList Array with the inital values
      return {
        ...state,
        foodTrucks: action.data
      };
    }
    case 'setLoggedInUser': {
      //updates the loggedInUser value
      return {
        ...state,
        loggedInUser: action.data
      };
    }
    case 'setToken': {
      //updates the token value
      return {
        ...state,
        token: action.data
      };
    }
    case 'setPicture': {
      return {
        ...state,
        picture: action.data
      };
    }
    default:
      return state;
  }
};
