import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers';

function EventDateForm() {
  const [value, setValue] = React.useState(new Date(''));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack spacing={3}>
          <DateTimePicker
            label="Choose Your Event Date and Time"
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
