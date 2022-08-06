import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {GoogleMap, InfoWindow, Marker} from '@react-google-maps/api';
import {useGlobalState} from 'utils/stateContext';
import './Map.css';
import mapStyles from './mapStyles';
import LinkedCard from 'components/LinkedCard';
import {Typography} from '@mui/material';

function Map() {
  const initialMapPosition = {position: {lat: -27.470224565118833, lng: 153.08898586247327}};
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      styles: mapStyles
    }),
    []
  );
  const {store} = useGlobalState();
  const {venues} = store;
  const [markers, setMarkers] = useState([]);
  const [venue, setVenue] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState(initialMapPosition.position);

  useEffect(() => {
    // setMarkers(confirmedEvents);
    setMarkers(venues);
  }, [venues]);

  const onClick = (e, item) => {
    setCenter(e.latLng);
    setSelectedMarker(e);
    setVenue(item);
  };

  // This is the alternative syntax for zoom change
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{lat: marker.lat, lng: marker.lng}}
            onClick={(e) => onClick(e, marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.latLng}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <LinkedCard item={venue}>
                {/* this can be refactored into preview card component */}
                {/* <Typography component="div" variant="h6">
                  {venue.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {venue.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Featuring {venue.truck}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {venue.date} at {venue.start_time}
                </Typography> */}
              </LinkedCard>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
