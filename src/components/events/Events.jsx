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

  // const eventImg =
  //   'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';

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
                at {event.venue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                featuring {event.truck}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                on {event.start}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                at {event.start_time}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {event.venue.name}
              </Typography> */}
              {/* <Typography variant="body2" color="text.secondary">
                {event.finish}
              </Typography> */}
            </LinkedCard>
          ) : null;
        })}
      </SideBarContainer>
    </MapContainer>
  );
}

export default Events;
