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

  const eventImg =
    'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';

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
            <Typography component="div" variant="h6" className="h6">
              {event.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {event.description}
            </Typography>
            {event.address && (
              <Typography variant="body2" color="text.secondary">
                {event.address}
              </Typography>
            )}
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
