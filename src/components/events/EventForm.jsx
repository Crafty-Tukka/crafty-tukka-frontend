import React, {useState, useEffect} from 'react';
import {useGlobalState} from 'utils/stateContext';
import {useNavigate, useParams} from 'react-router-dom';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Typography, Button, TextField, Alert, AlertTitle} from '@mui/material';
// import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormControl, InputLabel, Select} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {createVenueEvent, editEvent, getEvent} from 'services/eventsServices';

const theme = createTheme();

function EventForm() {
  //eslint-ignore-next-line: true
  const navigate = useNavigate();
  const {store, dispatch} = useGlobalState();
  const {foodTrucks, venues, loggedInUser, confirmedEvents} = store;
  const params = useParams();
  const {eventid} = params;

  const initialVenueFormData = {
    date: null,
    start_time: null,
    finish_time: null,
    name: '',
    description: '',
    confirmed: true
  };

  const [formVenueData, setFormVenueData] = useState(initialVenueFormData);
  const [error, setError] = useState(null);
  console.log(formVenueData);

  useEffect(() => {
    console.log(eventid);
    if (eventid) {
      getEvent(eventid).then((event) => {
        console.log(event);
        setFormVenueData({
          name: event.name,
          description: event.description,
          confirmed: event.confirmed,
          date: null,
          start_time: null,
          finish_time: null,
          truck_id: null
        });
      });
    }
  }, [eventid]);

  const handleFormData = (event) => {
    setFormVenueData({
      ...formVenueData, // previous state
      [event.target.name]: event.target.value // new state
    });
  };

  const getDate = (date) => {
    let confirmedDate = confirmedEvents.find((event) => event.date === date);
    if (confirmedDate) {
      return confirmedDate;
    } else {
      return console.log('Date Valid');
    }
    // return confirmedEvents.find((event) => event.date === date);
  };

  const getTruck = (truckid) => {
    let confirmedTruck = getDate.find((event) => event.truck_id === truckid);
    if (confirmedTruck) {
      return confirmedTruck;
    } else {
      return console.log('Truck Valid');
    }
  };

  // const checkDates = (confirmedEvents, pendingEvent, isUnion = false) =>
  //   confirmedEvents.filter((a) => isUnion === pendingEvent.some((b) => a.date === b.date));

  // const checkTrucks = (confirmedEvents, pendingEvent, isUnion = false) =>
  //   confirmedEvents.filter((a) => isUnion === pendingEvent.some((b) => a.truck_id === b.truck_id));

  // const inBothDates = (confirmedEvents, pendingEvent) =>
  //   checkDates(confirmedEvents, pendingEvent, true);

  // const inBothTrucks = (confirmedEvents, pendingEvent) =>
  //   checkTrucks(confirmedEvents, pendingEvent, true);

  // console.log(inBothTrucks(confirmedEvents.truck_id, foodTrucks.id));

  const addVenueEvent = (data) => {
    createVenueEvent(data).then((pendingEvent) => {
      let errorMessage = '';
      if (getDate(pendingEvent.date) && getTruck(pendingEvent.truck_id)) {
        errorMessage = 'Sorry. Truck unavailable';
        setError(errorMessage);
      } else if (pendingEvent.error) {
        Object.keys(pendingEvent.error).forEach((key) => {
          errorMessage = errorMessage.concat(' | ', `${key} ${pendingEvent.error[key]}`);
        });
        setError(errorMessage);
      } else {
        dispatch({
          type: 'addVenueEvent',
          data: pendingEvent
        });
        navigate('/events');
      }
    });
  };

  const updateEvent = (data, id) => {
    editEvent(data, id).then((pendingEvent) => {
      let errorMessage = '';
      if (pendingEvent.error) {
        Object.keys(pendingEvent.error).forEach((key) => {
          errorMessage = errorMessage.concat(' | ', `${key} ${pendingEvent.error[key]}`);
        });
        setError(errorMessage);
      } else {
        dispatch({
          type: '',
          // type: 'updateVenueEvent',
          action: pendingEvent
        });
        navigate('/events');
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (eventid) {
      updateEvent({...formVenueData}, eventid);
    } else {
      console.log(formVenueData);
      addVenueEvent(formVenueData);
    }
  };

  let title = '';
  let buttonText = '';
  if (eventid) {
    title = 'Edit Your Event';
    buttonText = 'Save Changes';
  } else {
    title = 'Create Your Event';
    buttonText = 'Add Event';
  }

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component="h1" variant="h5">
                {title}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Event Name"
                      name="name"
                      autoComplete="name"
                      value={formVenueData.name}
                      onChange={handleFormData}
                      inputProps={{maxLength: 25}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      name="description"
                      label="Describe you event"
                      onChange={handleFormData}
                      value={formVenueData.description}
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Food Truck</InputLabel>
                      <>
                        <Select
                          required
                          label="Food Truck"
                          name="truck"
                          value={formVenueData.truck_id}
                          onChange={(x) =>
                            setFormVenueData({...formVenueData, truck_id: x.target.value})
                          }
                          // onChange={handleFormData}
                        >
                          {foodTrucks.map((truck) => {
                            return (
                              <MenuItem key={truck.id} value={truck.id} name={truck.name}>
                                {truck.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </>
                    </FormControl>
                  </Grid>
                </Grid>
                <Typography component="h3" variant="h5">
                  Select Your Event Date
                </Typography>
                <DatePicker
                  selected={formVenueData.date}
                  onChange={(x) => setFormVenueData({...formVenueData, date: x})}
                  name="date"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
                <Typography component="h3" variant="h5">
                  Select Your Start Time
                </Typography>
                <DatePicker
                  selected={formVenueData.start_time}
                  onChange={(x) => setFormVenueData({...formVenueData, start_time: x})}
                  name="start_time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  minDate={new Date()}
                />
                <Typography component="h3" variant="h5">
                  Select Your Finish Time
                </Typography>
                <DatePicker
                  selected={formVenueData.finish_time}
                  onChange={(x) => setFormVenueData({...formVenueData, finish_time: x})}
                  name="finish_time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  minDate={new Date()}
                />
                {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3}>
                  <Typography variant="h5">Choose your Event Start Date and Time</Typography>
                  <MobileDateTimePicker
                    label="Start Date and Time"
                    inputFormat="DD/MM/yyyy hh:mm a"
                    name="start"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Typography variant="h5">Choose your Event End Date and Time</Typography>
                  <MobileDateTimePicker
                    label="End Date and Time"
                    inputFormat="DD/MM/yyyy hh:mm a"
                    name="end"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider> */}
                <Button
                  type="submit"
                  value="Login"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                >
                  {buttonText}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}

export default EventForm;
