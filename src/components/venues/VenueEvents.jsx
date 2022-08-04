import {Typography} from '@mui/material';
import PageContainer from 'components/Containers/PageContainer';
import LinkedCard from 'components/LinkedCard';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {getVenueEvents} from 'services/venuesServices';
import {useGlobalState} from 'utils/stateContext';

function VenueEvents() {
  const params = useParams();
  const [venueEvents, setVenueEvents] = useState([]);

  useEffect(() => {
    getVenueEvents(params.venueid).then((events) => {
      setVenueEvents(events);
    });
  }, []);

  console.log(venueEvents);

  return (
    <PageContainer title="My Events">
      {venueEvents.map((event) => {
        return (
          <LinkedCard
            key={event.id}
            imgPath={event.picture_url}
            item={event}
            routePath={'/events/venues/'}
          >
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
            {/* <Typography variant="body2" color="text.secondary">
              {event.facebook}
            </Typography> */}
          </LinkedCard>
        );
      })}
    </PageContainer>
  );
}

export default VenueEvents;
