import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import {FormControl, InputLabel, Select} from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
import {useGlobalState} from 'utils/stateContext';
import {useNavigate} from 'react-router';
import {signUpVenue} from 'services/authServices';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function EditProfile() {
  const {store, dispatch} = useGlobalState();
  const navigate = useNavigate();
  const {loggedInUser} = store;

  const initialFormData = {
    name: '',
    email: '',
    description: '',
    facebook: '',
    website: '',
    google_maps: '',
    mobile: '',
    password: '',
    password_confirmation: ''
  };
  console.log(initialFormData);

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  return <div>EditProfile</div>;
}

export default EditProfile;
