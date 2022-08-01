import React from 'react';
import ComputerIcon from '@mui/icons-material/Computer';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Chip,
  CardHeader,
  Tab
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkedCard from './LinkedCard';
import {useGlobalState} from 'utils/stateContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  height: 720,
  overflow: 'auto',
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // maxWidth: 345,
  boxShadow: 24
  // p: 4
};

function Details({item, imgPath, handleClose}) {
  const {store} = useGlobalState();
  const {confirmedEvents, loggedInUserId} = store; // this will need to be changed to item.events
  console.log(confirmedEvents);
  console.log(item);

  const handleEdit = (event) => {};

  return (
    <>
      <Card sx={style}>
        <CardMedia component="img" height="340" image={item.picture_url} alt={item.name} />
        <CardHeader
          title={item.name}
          subheader={item.description ? item.description : item.website}
        />
        {!item.date ? (
          <CardContent sx={{width: '50%', pt: 0, pb: 1}}>
            {item.facebook ? (
              <Link sx={{mt: 1, pr: 4}} href={item.facebook} target="_blank" rel="noreferrer">
                <FacebookOutlinedIcon sx={{margin: 'auto'}} />
              </Link>
            ) : null}
            {item.website ? (
              <Link sx={{pr: 4}} href={item.website} target="_blank" rel="noreferrer">
                <ComputerIcon />
              </Link>
            ) : null}
            {item.google_maps ? (
              <Link sx={{pr: 4}} href={item.google_maps} target="_blank" rel="noreferrer">
                <MapOutlinedIcon />
              </Link>
            ) : null}
            {item.email ? (
              <Typography sx={{mt: 1}} variant="body2" color="text.secondary">
                Email: {item.email}
              </Typography>
            ) : null}
            {item.mobile ? (
              <Typography variant="body2" color="text.secondary">
                Mobile: {item.mobile}
              </Typography>
            ) : null}
            {item.address ? (
              <Typography variant="body2" color="text.secondary">
                {item.address}
              </Typography>
            ) : null}
          </CardContent>
        ) : null}
        {item.category ? (
          <CardActions>
            <Chip
              sx={{marginLeft: 1}}
              size="small"
              label={item.category}
              color="secondary"
              variant="outlined"
            />
          </CardActions>
        ) : null}
        <CardContent sx={{mt: 0, pt: 0}}>
          {/* <Typography variant="body" color="text.secondary">
            {item.description}
          </Typography> */}
          {item.date ? (
            <>
              <Typography variant="subtitle1" color="text.secondary">
                Date: {item.date}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                at {item.start_time}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                until {item.finish_time}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                hosted by {item.venue}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                at {item.address}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                with {item.truck}
              </Typography>
            </>
          ) : null}

          {/* Upcoming Events */}
          {!item.date ? (
            <>
              <Typography sx={{mt: 2}} variant="h6" component="div">
                Upcoming Events
              </Typography>
              {confirmedEvents.map((event) => {
                return event.confirmed === true && item.name === (event.truck || event.venue) ? (
                  <LinkedCard key={event.id} imgPath={event.picture_url} item={event}>
                    {/* this can be refactored into preview card component */}
                    <Typography component="div" variant="h6">
                      {event.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {event.date}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {event.venue}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {event.truck}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      {event.description}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                  {event.finish}
                </Typography> */}
                  </LinkedCard>
                ) : null;
              })}
            </>
          ) : null}
        </CardContent>
        <CardActions>
          {item.date && item.venue_id === loggedInUserId ? (
            <>
              <Button size="small" onClick={handleEdit}>
                <Tab label="Edit" value={`/events/${item.id}`} component={Link} to="/events/new" />
              </Button>
              <Link to={`/events/${item.id}`} value="Edit">
                Edit Event
              </Link>
              <a href={`/events/${item.id}`}>Editing event</a>
              <Button
                onClick={handleClose}
                sx={{my: 2, color: 'text.primary', display: 'block'}}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                <Tab
                  label="Delete"
                  value={`/events/${item.id}`}
                  component={Link}
                  to={`/events/${item.id}`}
                />
              </Button>
            </>
          ) : null}
          <Button size="small" onClick={handleClose}>
            Back
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Details;
