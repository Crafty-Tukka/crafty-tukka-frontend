import React, {useReducer} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from 'components/NavBar';
import NotFound from 'components/NotFound';
import EditProfile from 'components/auth/EditProfile';
import Signin from 'components/auth/Signin';
import Signup from 'components/auth/Signup';
import Event from 'components/events/Event';
import EventForm from 'components/events/EventForm';
import Events from 'components/events/Events';
import FoodTruck from 'components/food-trucks/FoodTruck';
import FoodTrucks from 'components/food-trucks/FoodTrucks';
import Venue from 'components/venues/Venue';
import Venues from 'components/venues/Venues';
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
  const {venues, loggedInUser} = store;

  console.log(venues);

  return (
    <StateContext.Provider value={{store, dispatch}}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="events" replace />} />
          <Route path="events">
            <Route index element={<Events />} />
            <Route path="new" element={loggedInUser ? <EventForm /> : <Signin />} />
            {/* Event page will host search logic to locate event based on id. then it will render detail component using props.children as discussed with glen. */}
            <Route path=":eventid" element={Event} />
            <Route path="venue/:venueid" element={<Events />} />
            <Route path="venue/:venueid/pending" element={<Events />} />
            <Route path="foodtruck/:foodtruckid" element={<Events />} />
            <Route path="foodtruck/:foodtruckid/pending" element={<Events />} />
          </Route>
          <Route path="venues">
            <Route index element={<Venues />} />
            {/* Venue page will host search logic to locate venue based on id. then it will render detail component using props.children as discussed with glen. */}
            <Route path=":venueid" element={<Venue />} />
          </Route>
          <Route path="foodtrucks">
            <Route index element={<FoodTrucks />} />
            {/* FoodTruck page will host search logic to locate food truck based on id. then it will render detail component using props.children as discussed with glen. */}
            <Route path=":foodtruckid" element={<FoodTruck />} />
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </StateContext.Provider>
  );
}

export default App;
