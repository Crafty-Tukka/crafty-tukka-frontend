import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Typography} from '@mui/material';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

function EventDateForm() {
  const [value, setValue] = React.useState(new Date(''));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack spacing={3}>
          <Typography variant="h5">Choose your Event Start Date</Typography>
          <MobileDatePicker
            label="Event Date Start"
            inputFormat="DD/MM/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h5">Choose your Start Time</Typography>
          <TimePicker
            label="Start Time"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h5">Choose your Event Finish Date</Typography>
          <MobileDatePicker
            label="Event Date Start"
            inputFormat="DD/MM/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography variant="h5">Choose your Finish Time</Typography>
          <TimePicker
            label="Finish Time"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </React.Fragment>
  );
}

export default EventDateForm;
