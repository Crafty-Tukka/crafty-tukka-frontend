// This component may not be needed anymore as we are using a pop-up modal to display details

import {Typography} from '@mui/material';
import Details from 'components/Details';
import React from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {useGlobalState} from 'utils/stateContext';

function Event() {
  const {store} = useGlobalState();
  const {confirmedEvents} = store;
  const params = useParams();

  const getEvent = (id) => {
    return confirmedEvents.find((event) => event.id === parseInt(id));
  };

  // this may be obsolete is we can associate the venue image with the event in the model
  // need to destructure "venues" from store if using this function
  const getImg = (event) => {
    // let venue;
    // venue = venues.find((venue) => venue.id === event.venue_id);
    // return venue.src.path
    // comment this out once venues have profile pics
    // return 'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';
  };

  const event = getEvent(params.eventid);
  const img = getImg(event);

  return (
    <>
      {event ? (
        // this needs to be refactored into a details component
        <Details item={event} imgPath={event.picture_url}>
          <Typography variant="h3">{event.name}</Typography>
          <Typography variant="p">{event.description}</Typography>
          <Typography variant="h6">Start time: {event.start_time}</Typography>
          <Typography variant="h6">Finish time: {event.finish_time}</Typography>
        </Details>
      ) : (
        <>
          <p>Event not found</p>
          <Link to="/events">Go back to the home page</Link>
        </>
      )}
    </>
  );
}

export default Event;
