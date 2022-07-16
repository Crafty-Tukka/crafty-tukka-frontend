import {useMemo, useCallback, useRef} from 'react';
import {GoogleMap} from '@react-google-maps/api';
import './EventStyle.css';
import {useGlobalState} from 'utils/stateContext';
import List from 'components/List';
import {Typography} from '@mui/material';
import PreviewCard from 'components/PreviewCard';

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
        <List title="Events">
          {confirmedEvents.map((event) => {
            return event.confirmed_status === 'confirmed' ? (
              <PreviewCard key={event.id} item={event} routePath={'events'}>
                <Typography component="div" variant="h6">
                  {event.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.start}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.finish}
                </Typography>
              </PreviewCard>
            ) : null;
          })}
        </List>
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
