// import {Button, InputLabel, TextField, Typography} from '@mui/material';
import {Box, Button} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import {useGlobalState} from '../utils/stateContext';

function Signup({activateBusinessType, businessType}) {
  const businessTypeArray = [
    {id: 1, type: 'Food Truck'},
    {id: 2, type: 'Venue'}
  ];

  const initialFormData = {
    business: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  // const [error, setError] = useState(null); //to be implemented with reducer

  const handleBusinessType = (event) => {
    setFormData({
      ...formData, // previous state for username or password
      [event.target.name]: event.target.value // new state for username or password
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    activateBusinessType(formData.business);
    navigate(`/auth/signup/${businessType}`);
  };

  return (
    <div>
      <h1>Are you a...</h1>
      {businessTypeArray.map((business) => {
        return (
          <>
            <Box component="form" noValidate onClick={handleSubmit}>
              <Button
                key={business.id}
                name={business.type}
                value={formData.business}
                onChange={handleBusinessType}
              >
                {business.type}
              </Button>
              <br />
            </Box>
          </>
        );
      })}
    </div>
  );
}

export default Signup;
