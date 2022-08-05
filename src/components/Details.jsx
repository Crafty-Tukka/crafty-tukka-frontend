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
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedCard from './LinkedCard';
import {useGlobalState} from 'utils/stateContext';
import {useNavigate} from 'react-router';
import {deleteEvent} from 'services/eventsServices';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 640,
  maxHeight: '75%',
  overflow: 'auto',
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // maxWidth: 345,
  boxShadow: 24
  // p: 4
};

function Details({item, imgPath, handleClose}) {
  const {store, dispatch} = useGlobalState();
  const navigate = useNavigate();
  const {confirmedEvents, loggedInUserId} = store;

  // State for delete alert
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAlertClose = () => {
    setOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/events/${item.id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteEvent(item.id).then((data) => {
      alert(data.message);
      dispatch({
        type: 'deleteEvent',
        data: item
      });
    });
    navigate(`/events`);
  };

  console.log(item);
  console.log(confirmedEvents);
  const upcomingEvents = confirmedEvents.filter(
    (event) => event.confirmed === true && item.name === (event.truck || event.venue)
  );
  console.log(upcomingEvents);

  return (
    <>
      <Container fixed>
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
            {item.date ? (
              <>
                <Typography variant="subtitle1" color="text.secondary">
                  Date: {item.date}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Time: {item.start_time} - {item.finish_time}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Host: {item.venue}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Address: {item.address}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Featuring {item.truck}
                </Typography>
              </>
            ) : null}

            {/* Upcoming Events */}
            {!item.date ? (
              <>
                <Typography sx={{mt: 2}} variant="h6" component="div">
                  Upcoming Events
                </Typography>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => {
                    return (
                      <LinkedCard key={event.id} imgPath={event.picture_url} item={event}>
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
                    );
                  })
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No upcoming events, please check back later.
                  </Typography>
                )}
              </>
            ) : null}
          </CardContent>
          <CardActions sx={{mb: 2, ml: 1}}>
            {item.date && item.venue_id === Number(loggedInUserId) ? (
              <>
                {console.log(item.date)}
                <Button
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  onClick={handleEdit}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  size="medium"
                  color="error"
                  onClick={handleClickOpen}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleAlertClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Are you sure you want to delete this event?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This action can not be undone.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button size="medium" variant="outlined" onClick={handleAlertClose}>
                      Cancel
                    </Button>
                    <Button
                      size="medium"
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                      autoFocus
                    >
                      Confirm Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null}
            <Button
              size="medium"
              variant="outlined"
              onClick={handleClose}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default Details;
