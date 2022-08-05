export const reducer = (state, action) => {
  // recieves current state and implements action we want to implement
  // action is object with 2 keys, type and value
  // console.log(action);
  // console.log(state);
  // the type key determines the action we are taking
  // the data key contains the data necessary to update the state
  switch (action.type) {
    case 'setEvents': {
      return {
        ...state,
        confirmedEvents: action.data
      };
    }
    case 'setPendingEvents': {
      return {
        ...state,
        pendingEvents: action.data
      };
    }
    case 'setVenues': {
      return {
        ...state,
        venues: action.data
      };
    }
    case 'setFoodTrucks': {
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
    case 'setId': {
      //updates with the current users Id
      return {
        ...state,
        loggedInUserId: action.data
      };
    }
    case 'setPicture': {
      return {
        ...state,
        picture: action.data
      };
    }
    case 'addVenueEvent': {
      return {
        ...state,
        confirmedEvents: [action.data, ...state.confirmedEvents]
      };
    }
    case 'updateVenueEvent': {
      const events = state.confirmedEvents.filter((event) => event.id !== action.data.id);
      return {
        ...state,
        confirmedEvents: [action.data, ...events]
      };
    }
    case 'deleteEvent': {
      const events = state.confirmedEvents.filter((event) => event.id !== action.data.id);
      return {
        ...state,
        confirmedEvents: [...events]
      };
    }
    case 'addTruckEvent': {
      return {
        ...state,
        pendingEvents: [action.data, ...state.confirmedEvents]
      };
    }
    default:
      return state;
  }
};
