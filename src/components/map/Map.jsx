import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {GoogleMap, InfoWindow, Marker} from '@react-google-maps/api';
import {useGlobalState} from 'utils/stateContext';
import './Map.css';
import mapStyles from './mapStyles';
import LinkedCard from 'components/LinkedCard';
import {Typography} from '@mui/material';

function Map() {
  const initialMapPosition = {position: {lat: -27.4705, lng: 153.026}};
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      styles: mapStyles
    }),
    []
  );
  const {store} = useGlobalState();
  const {confirmedEvents} = store;
  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState(initialMapPosition.position);

  useEffect(() => {
    setMarkers(confirmedEvents);
  }, [confirmedEvents]);

  const onClick = (e, item) => {
    setCenter(e.latLng);
    setSelectedMarker(e);
    setEvent(item);
  };

  // This is the alternative syntax for zoom change
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div>
      <GoogleMap
        zoom={12.1}
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
              <LinkedCard item={event}>
                {/* this can be refactored into preview card component */}
                <Typography component="div" variant="h6">
                  {event.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {event.venue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Featuring {event.truck}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.date} at {event.start_time}
                </Typography>
              </LinkedCard>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
