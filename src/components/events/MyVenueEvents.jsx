import React from 'react';
import {useGlobalState} from 'utils/stateContext';

function MyVenueEvents() {
  const {store} = useGlobalState();
  const {venueEvents} = store;
  console.log(venueEvents);
  return (
    <div>
      <p>My Events</p>
    </div>
  );
}

export default MyVenueEvents;
