import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';
import {useGlobalState} from 'utils/stateContext';
import {getGeocode, getLatLng} from 'use-places-autocomplete';
// import Events from 'components/events/Events';
// import './Map.css';
import venues from '../../data/breweries.json';

function Map() {
  // const {store} = useGlobalState();
  // const {venues} = store;
  const initialMapPosition = {position: {lat: -27.4705, lng: 153.026}, initialZoom: 12.1};
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true
    }),
    []
  );
  const [markers, setMarkers] = useState([]);
  const [zoom, setZoom] = useState(initialMapPosition.initialZoom); // initial zoom: ;
  const [center, setCenter] = useState(initialMapPosition.position);

  // getGeocode(
  //   venues.map((venue) => {
  //     return `${venue.address1} ${venue.suburb}`;
  //   })
  // ).then((results) => {
  //   const {lat, lng} = getLatLng(results[0]);
  //   console.log('Coordinates: ', {lat, lng});
  // });

  useEffect(() => {
    setMarkers(venues);
  }, []);

  const onClick = (e) => {
    setCenter(e.latLng);
    setZoom(15);
  };

  // const [mapInstance, setMapInstance] = useState({});
  // const onLoad = (map) => {
  //   setMapInstance(map);
  //   console.log(map);
  // };

  // const onZoomChanged = () => {
  //   setZoom(mapInstance.zoom);
  // };
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const onZoomChanged = () => {
    setZoom(mapRef.zoom);
  };

  return (
    // <div className="container">
    // <div className="controls"><Events /></div>
    // <div className="map">
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      // onLoad={onLoad}
      onLoad={onLoad}
      onZoomChanged={onZoomChanged}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={onClick}
          getGeocode={getGeocode}
        />
      ))}
    </GoogleMap>
    // </div>
    // </div>
  );
}

export default Map;
