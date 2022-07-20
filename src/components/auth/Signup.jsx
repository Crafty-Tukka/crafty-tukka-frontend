// import {Button, InputLabel, TextField, Typography} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import {useGlobalState} from '../utils/stateContext';

function Signup() {
  const initialFormData = {
    business_type: ''
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  // const [error, setError] = useState(null); //to be implemented with reducer

  const handleFormData = (event) => {
    setFormData({
      ...formData, // previous state for username or password
      [event.target.name]: event.target.value // new state for username or password
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    setFormData(initialFormData); // cleaning the form data displayed
    navigate(`/auth/signup/${business_type}`);
  };

  return (
    <div>
      <h1>Signup</h1>
    </div>
  );
}

export default Signup;
