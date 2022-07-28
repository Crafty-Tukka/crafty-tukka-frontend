import React, {useEffect, useState} from 'react';
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
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import AutoComplete from 'components/map/AutoComplete';

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

function SignupVenue() {
  const {dispatch} = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    name: '',
    email: '',
    description: '',
    facebook: '',
    website: '',
    google_maps: '',
    mobile: '',
    password: '',
    password_confirmation: '',
    address: '',
    lat: null,
    lng: null
  };
  // used by get coordinates from google maps
  // const [address, setAddress] = useState();
  // const [coordinates, setCoordinates] = useState({
  //   lat: null,
  //   lng: null
  // });

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  // const handleSelect = async (value) => {
  //   const results = await geocodeByAddress(value);
  //   const latLng = await getLatLng(results[0]);
  //   setAddress(value);
  //   setCoordinates(latLng);
  // };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    signUpVenue(formData)
      .then((user) => {
        console.log(user);
        let errorMessage = '';
        if (user.error) {
          // console.log(user.error)
          // convert the object into a string
          Object.keys(user.error).forEach((key) => {
            //console.log(key, user.error[key])
            errorMessage = errorMessage.concat('', `${key} ${user.error[key]}`);
          });
          setError(errorMessage);
        } else {
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('token', user.jwt);
          dispatch({
            type: 'setLoggedInUser',
            data: user.email
          });
          dispatch({
            type: 'setToken',
            data: user.jwt
          });
          setFormData(initialFormData);
          navigate('/events');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
  };

  // const handleAddressFormData = (e) => {
  //   setFormData({
  //     ...formData.google_maps,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const stateList = [
  //   {id: 1, type: 'Queensland'},
  //   {id: 2, type: 'New South Wales'},
  //   {id: 3, type: 'Victoria'},
  //   {id: 4, type: 'South Australia'},
  //   {id: 5, type: 'Western Australia'}
  // ];
  // const [stateType, setStateType] = useState('');

  // const handleChange = (event) => {
  //   setStateType(event.target.value);
  // };

  return (
    <ThemeProvider theme={theme}>
      {error && <p>{error}</p>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Brewery Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Venue Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleFormData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Bio"
                  onChange={handleFormData}
                  value={formData.description}
                  multiline
                  rows={2}
                  fullWidth
                />
              </Grid>
              This is the address form
              <Grid item xs={12}>
                <AutoComplete name="address" required id="address" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="mobile"
                  name="mobile"
                  required
                  fullWidth
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleFormData}
                  label="Mobile Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="website"
                  label="Website"
                  name="website"
                  onChange={handleFormData}
                  value={formData.website}
                  autoComplete="website"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="google-maps"
                  name="google_maps"
                  fullWidth
                  id="google_maps"
                  onChange={handleFormData}
                  value={formData.google_maps}
                  label="Google Places"
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="facebook"
                  label="Facebook"
                  name="facebook"
                  autoComplete="facebook"
                  onChange={handleFormData}
                  value={formData.facebook}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleFormData}
                  value={formData.email}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label">
                  Upload
                  <input hidden accept="image/*" multiple="false" type="file" />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" name="picture" id="picture" />
                  <PhotoCamera />
                </IconButton>
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleFormData}
                  value={formData.password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                  onChange={handleFormData}
                  value={formData.password_confirmation}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 3}} />
      </Container>
    </ThemeProvider>
  );
}

export default SignupVenue;
