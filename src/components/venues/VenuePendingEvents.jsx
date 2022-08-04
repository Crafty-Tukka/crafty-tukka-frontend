import {Typography} from '@mui/material';
import PageContainer from 'components/Containers/PageContainer';
import LinkedCard from 'components/LinkedCard';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {getPendingVenueEvents} from 'services/venuesServices';

function VenuePendingEvents() {
  const params = useParams();
  const [venueEvents, setVenueEvents] = useState([]);

  useEffect(() => {
    getPendingVenueEvents(params.venueid).then((events) => {
      setVenueEvents(events);
    });
  }, []);

  const eventImg =
    'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';

  return (
    <PageContainer title="My Pending Events">
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

export default VenuePendingEvents;
