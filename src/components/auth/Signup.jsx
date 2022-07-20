// import {Button, InputLabel, TextField, Typography} from '@mui/material';
import {Button} from '@mui/material';

// import {useGlobalState} from '../utils/stateContext';

function Signup() {
  return (
    <div>
      <h1>Are you a...</h1>

      <Button href="/auth/signup/foodtruck">Food Truck</Button>
      <br />
      <Button href="/auth/signup/venue">Venue</Button>
    </div>
  );
}

export default Signup;
