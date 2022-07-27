import React from 'react';
import {useGlobalState} from 'utils/stateContext';

function MyFoodTruckEvents() {
  const {store} = useGlobalState();
  const {foodTruckEvents} = store;
  console.log(foodTruckEvents);

  return (
    <div>
      {foodTruckEvents.map((foodTruckEvent) => {
        return (
          <>
            <h1 component="div" variant="h6">
              {foodTruckEvent.name}
            </h1>
            <h1 variant="subtitle1" color="text.secondary" component="div">
              {foodTruckEvent.description}
            </h1>
            <h1 variant="body2" color="text.secondary">
              {foodTruckEvent.start}
            </h1>
            <h1 variant="body2" color="text.secondary">
              {foodTruckEvent.finish}
            </h1>
          </>
        );
      })}
    </div>
  );
}

export default MyFoodTruckEvents;
