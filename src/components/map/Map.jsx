import {useMemo, useCallback, useRef} from 'react';
import {GoogleMap} from '@react-google-maps/api';
import Events from 'components/events/Events';
import './MapStyle.css';

function Map() {
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
        <h1>Events</h1>
        <Events />
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

export default Map;
