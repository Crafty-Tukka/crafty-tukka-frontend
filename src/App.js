import React, {useReducer, useEffect} from 'react';
import {useLoadScript} from '@react-google-maps/api';
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
// import Map from 'components/map/Map';
import Venue from 'components/venues/Venue';
import Venues from 'components/venues/Venues';
import {reducer} from 'utils/reducer';
import {StateContext} from 'utils/stateContext';
// import venuesList from './data/breweries.json';
// import eventsList from './data/events.json';
// import foodTrucksList from './data/food-trucks.json';
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
  // const [events, setEvents] = useState(initialState.confirmedEvents);
  const {loggedInUser, confirmedEvents, venues, foodTrucks} = store;
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // const [loggedInUser, setLoggedInUser] = useState('');

  // we need to figure out how to keep updating this everytime a new venue/foodtruck/event is added without creating an infinite loop
  useEffect(() => {
    getEvents().then((events) => {
      dispatch({
        type: 'setEvents',
        data: events
      });
    });
  }, []);

  useEffect(() => {
    getVenues().then((venues) => {
      dispatch({
        type: 'setVenues',
        data: venues
      });
    });
  }, []);

  useEffect(() => {
    getFoodTrucks().then((foodTrucks) => {
      dispatch({
        type: 'setFoodTrucks',
        data: foodTrucks
      });
    });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <StateContext.Provider value={{store, dispatch}}>
      <Router>
        <NavBar loggedInUser={loggedInUser} />
        <Routes>
          <Route path="/" element={<Navigate to="events" replace />} />
          {/* <Route path="/" element={<Navigate to="map" replace />} /> */}
          {/* <Route path="map" element={<Map />} /> */}
          <Route path="events">
            <Route index element={<Events events={confirmedEvents} />} />
            <Route
              path="new"
              element={loggedInUser ? <EventForm /> : <Signin />} //addEvent={addEvent}
            />
            {/* Event page will host search logic to locate event based on id. then it will render detail component using props.children as discussed with glen. */}
            <Route path=":eventid" element={<Event />} />
            {/* <Route path="venues/:venueid" element={<Events />} /> */}
            <Route path="venues/:venueid" element={<VenueEvents />} />
            <Route path="venues/:venueid/pending" element={<VenuePendingEvents />} />
            <Route path="foodtrucks/:foodtruckid" element={<Events />} />
            <Route path="foodtrucks/:foodtruckid/pending" element={<Events />} />
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
          <Route path="auth/signin" element={<Signin />} />
          <Route path="auth/signup">
            <Route index element={<Signup />} />
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
