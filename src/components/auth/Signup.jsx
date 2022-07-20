// import {Button, InputLabel, TextField, Typography} from '@mui/material';
import {Button} from '@mui/material';

// import {useGlobalState} from '../utils/stateContext';

function Signup() {
  const businessTypeArray = [
    {id: 1, business: 'Food Truck'},
    {id: 2, business: 'Venue'}
  ];

  return (
    <div>
      <h1>Are you a...</h1>
      {businessTypeArray.map((business) => {
        return (
          <>
            <Button key={business.id} name={business.business}>
              {business.business}
            </Button>
            <br />
          </>
        );
      })}
    </div>
  );
}

export default Signup;
