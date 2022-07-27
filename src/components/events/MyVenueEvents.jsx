import React from 'react';
import {useGlobalState} from 'utils/stateContext';

function MyVenueEvents() {
  const {store} = useGlobalState();
  const {venueEvents} = store;
  console.log(venueEvents);

  return (
    <div>
      {venueEvents.map((venueEvent) => {
        return (
          <>
            <h1 component="div" variant="h6">
              {venueEvent.name}
            </h1>
            <h1 variant="subtitle1" color="text.secondary" component="div">
              {venueEvent.description}
            </h1>
            <h1 variant="body2" color="text.secondary">
              {venueEvent.start}
            </h1>
            <h1 variant="body2" color="text.secondary">
              {venueEvent.finish}
            </h1>
          </>
        );
      })}
    </div>
  );
}

export default MyVenueEvents;
