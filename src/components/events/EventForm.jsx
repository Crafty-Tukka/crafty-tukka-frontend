import React, {useState, useEffect} from 'react';
import {useGlobalState} from 'utils/stateContext';
import {useNavigate} from 'react-router-dom';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Typography, Button} from '@mui/material';
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
import {createEvent} from 'services/eventsServices';

const theme = createTheme();

function EventForm() {
  //eslint-ignore-next-line: true
  const navigate = useNavigate();
  const {store, dispatch} = useGlobalState();
  const {foodTrucks} = store;
  const initialFormData = {
    start: new Date(),
    finish: new Date(),
    name: 'Event',
    confirmed: false
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // const handleFormData = (event) => {
  //   setFormData({
  //     ...formData, // previous state
  //     [event.target.name]: event.target.value // new state
  //   });
  // };

  const addVenueEvent = (data) => {
    createEvent(data).then((pendingEvent) => {
      dispatch({
        type: 'addVenueEvent',
        data: pendingEvent
      });
      navigate('/events');
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.start === '' || formData.end === '' || formData.truck === '') {
      return console.log("Please don't leave an empty field");
    } else {
      console.log(formData);
      addVenueEvent(formData);
      // addEvent(formData.start, formData.end, formData.truck);
      // navigate('/events');
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
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
              Select Your Food Truck
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Food Truck</InputLabel>
                    <>
                      <Select
                        required
                        label="Food Truck"
                        name="truck"
                        value={formData.truck_id}
                        onChange={(x) => setFormData({...formData, truck_id: x.target.value})}
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
              <DatePicker
                selected={formData.start}
                onChange={(x) => setFormData({...formData, start: x})}
                name="start"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <DatePicker
                selected={formData.finish}
                onChange={(x) => setFormData({...formData, finish: x})}
                name="end"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
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
              <Button type="submit" value="Login" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Add Event
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default EventForm;
