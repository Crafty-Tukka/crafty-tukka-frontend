import {useMemo, useCallback, useRef, useState, useEffect} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';
// import Events from 'components/events/Events';
// import './Map.css';
import venues from '../../data/breweries.json';

function Map() {
  const center = useMemo(() => ({lat: -27.4705, lng: 153.026}), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true
    }),
    []
  );
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers(venues);
  }, []);

  //   const markers = [];
  //   venues.map((venue) => markers.push(venue.position));

  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    // <div className="container">
    // <div className="controls"><Events /></div>
    // <div className="map">
    <GoogleMap
      zoom={12}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={onLoad}
    >
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} />
      ))}
    </GoogleMap>
    // </div>
    // </div>
  );
}

export default Map;
