import React, {useReducer, useEffect, useCallback} from 'react';
import {useLoadScript} from '@react-google-maps/api';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import NavBar from 'components/NavBar';
import NotFound from 'components/NotFound';
import EditProfile from 'components/auth/EditProfile';
import Signin from 'components/auth/Signin';
import EventForm from 'components/events/EventForm';
import Events from 'components/events/Events';
import FoodTrucks from 'components/food-trucks/FoodTrucks';
import Venues from 'components/venues/Venues';
import {reducer} from 'utils/reducer';
import {StateContext} from 'utils/stateContext';
import SignupFoodTruck from 'components/auth/SignupFoodTruck';
import SignupVenue from 'components/auth/SignupVenue';
import {getEvents} from 'services/eventsServices';
import {getVenues} from 'services/venuesServices';
import {getFoodTrucks} from 'services/foodTrucksServices';
import VenueEvents from 'components/venues/VenueEvents';
import VenuePendingEvents from 'components/venues/VenuePendingEvents';

function App() {
  const initialState = {
    loggedInUser: sessionStorage.getItem('email') || null,
    loggedInUserId: sessionStorage.getItem('id') || null,
    token: sessionStorage.getItem('token') || null,
    confirmedEvents: [],
    pendingEvents: [],
    venues: [],
    foodTrucks: [],
    category: ''
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const {loggedInUser, confirmedEvents, venues, foodTrucks} = store;
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  const loadEvents = useCallback(async () => {
    await getEvents().then((events) => {
      dispatch({
        type: 'setEvents',
        data: events
      });
    });
  }, []);

  const loadVenues = useCallback(async () => {
    await getVenues().then((venues) => {
      dispatch({
        type: 'setVenues',
        data: venues
      });
    });
  }, []);

  const loadTrucks = useCallback(async () => {
    await getFoodTrucks().then((foodTrucks) => {
      dispatch({
        type: 'setFoodTrucks',
        data: foodTrucks
      });
    });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    loadVenues();
  }, [loadVenues]);

  useEffect(() => {
    loadTrucks();
  }, [loadTrucks]);

  if (confirmedEvents === []) return <div>Loading...</div>;

  return (
    <StateContext.Provider value={{store, dispatch}}>
      <Router>
        <NavBar loggedInUser={loggedInUser} />
        <Routes>
          <Route path="/" element={<Navigate to="events" replace />} />
          <Route path="events">
            <Route index element={<Events events={confirmedEvents} />} />
            <Route path="new" element={loggedInUser ? <EventForm /> : <Signin />} />
            <Route path=":eventid" element={loggedInUser ? <EventForm /> : <Signin />} />
            <Route path="venues/:venueid" element={<VenueEvents />} />
            <Route path="venues/:venueid/pending" element={<VenuePendingEvents />} />
            <Route path="foodtrucks/:foodtruckid" element={<Events />} />
            <Route path="foodtrucks/:foodtruckid/pending" element={<Events />} />
          </Route>
          <Route path="venues">
            <Route index element={<Venues />} />
            {/* <Route path=":venueid" element={<Venue />} /> */}
          </Route>
          <Route path="foodtrucks">
            <Route index element={<FoodTrucks />} />
            {/* <Route path=":foodtruckid" element={<FoodTruck />} /> */}
          </Route>
          <Route path="auth/signin" element={<Signin />} />
          <Route path="auth/signup">
            {/* <Route index element={<Signup />} /> */}
            <Route path="foodtruck" element={<SignupFoodTruck />} />
            <Route path="venue" element={<SignupVenue />} />
          </Route>
          <Route path="auth/editprofile" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </StateContext.Provider>
  );
}

export default App;
