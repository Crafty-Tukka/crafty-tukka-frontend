import {useMemo, useCallback, useRef} from 'react';
import {GoogleMap} from '@react-google-maps/api';
import './EventStyle.css';
import {useGlobalState} from 'utils/stateContext';

function Events() {
  const {store} = useGlobalState();
  const {confirmedEvents} = store;
  console.log(confirmedEvents);

  const center = useMemo(() => ({lat: -27.4705, lng: 153.026}), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true
    }),
    []
  );
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className="container">
      <div className="controls">
        <h1>Event List</h1>
        {confirmedEvents.map((event) => {
          return event.confirmed_status === 'confirmed' ? (
            <>
              <h3>Name: {event.name}</h3>
              <p>Description: {event.description}</p>
              <h5>Start Time: {event.start}</h5>
              <h5>Finish Time: {event.finish}</h5>
            </>
          ) : null;
        })}
      </div>
      <div className="map">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
}

export default Events;
