import React, {useReducer} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from 'components/NavBar';
import reducer from 'utils/reducer';
import {StateContext} from 'utils/stateContext';
import venuesList from './data/breweries.json';
import eventsList from './data/events.json';
import foodTrucksList from './data/food-trucks.json';

function App() {
  const initialState = {
    loggedInUser: '',
    confirmedEvents: eventsList,
    pendingEvents: {},
    venues: venuesList,
    foodTrucks: foodTrucksList,
    category: ''
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const {venues} = store;

  console.log(venues);

  return (
    <StateContext.Provider value={{store, dispatch}}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="events" replace />} />
        </Routes>
      </Router>
    </StateContext.Provider>
  );
}

export default App;
