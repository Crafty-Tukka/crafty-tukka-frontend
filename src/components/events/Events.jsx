import {useGlobalState} from 'utils/stateContext';
import {Typography} from '@mui/material';
import SideBarContainer from 'components/Containers/SideBarContainer';
import MapContainer from 'components/Containers/MapContainer';
import LinkedCard from 'components/LinkedCard';
// import Map from 'components/map/Map';
// import {useEffect} from 'react';

function Events() {
  const {store} = useGlobalState();
  const {confirmedEvents} = store;
  console.log(confirmedEvents);

  return (
    <MapContainer>
      <SideBarContainer title="Events">
        {confirmedEvents.map((event) => {
          return event.confirmed === true ? (
            <LinkedCard
              key={event.id}
              imgPath={event.picture_url}
              item={event}
              routePath={'events'}
            >
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
          ) : null;
        })}
      </SideBarContainer>
    </MapContainer>
  );
}

export default Events;
