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
  CardHeader
} from '@mui/material';
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
  const {confirmedEvents} = store; // this will need to be changed to item.events

  return (
    <>
      <Card sx={style}>
        <CardMedia component="img" height="340" image={imgPath} alt={item.name} />
        <CardHeader title={item.name} subheader={item.date ? item.date : item.website} />
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
            {item.location ? (
              <Typography variant="body2" color="text.secondary">
                {item.location.address1}, {item.location.city}
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
          <Typography variant="body" color="text.secondary">
            {item.description}
          </Typography>

          {/* Upcoming Events */}
          {!item.date ? (
            <>
              <Typography sx={{mt: 2}} variant="h6" component="div">
                Upcoming Events
              </Typography>
              {confirmedEvents.map((event) => {
                return event.confirmed_status === 'confirmed' ? (
                  <LinkedCard key={event.id} imgPath={event.img} item={event}>
                    {/* this can be refactored into preview card component */}
                    <Typography component="div" variant="h6">
                      {event.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {event.date}
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
          <Button size="small" onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Details;
