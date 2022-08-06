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
// import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {Alert, AlertTitle, IconButton, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#050404'
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#4BE4FF'
    }
  }
});

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
    lng: null,
    picture: null
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  console.log(formData);

  // const searchOptions = {
  //   location: new (-27.4705, 153.026),
  //   radius: 2000,
  //   types: ['address']
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).map((key) => {
      return data.set(key, formData[key]);
    });

    signUpVenue(data)
      .then((user) => {
        console.log(user);
        let errorMessage = '';
        if (user.error) {
          // convert the object into a string
          Object.keys(user.error).forEach((key) => {
            errorMessage = errorMessage.concat(' | ', `${key} ${user.error[key]}`);
          });
          setError(errorMessage);
        } else {
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('token', user.jwt);
          sessionStorage.setItem('id', user.id);
          dispatch({
            type: 'setLoggedInUser',
            data: user.email
          });
          dispatch({
            type: 'setToken',
            data: user.jwt
          });
          dispatch({
            type: 'setId',
            data: user.id
          });
          setFormData(initialFormData);
          navigate('/events');
        }
      })
      .catch((e) => {
        console.log(e.response.data);
        setError(e.response.data.error);
      });
  };

  const [venueAddress, setVenueAddress] = useState();
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleAddressSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(results);
    setVenueAddress(value);
    setCoordinates(latLng);
    setFormData({
      ...formData,
      address: value,
      lat: latLng.lat,
      lng: latLng.lng
    });
  };

  // const venueCoordinates = {lat: coordinates.lat, lng: coordinates.lng};

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
  };

  const pictureSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    setFormData({
      ...formData,
      picture: e.target.files[0]
    });
  };

  return (
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
                  required
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
              {/* This is the address form */}
              {/* <Grid item xs={12}>
                <AutoComplete name="address" required id="address" />
              </Grid> */}
              <Grid item xs={12}>
                <PlacesAutocomplete
                  required
                  value={venueAddress}
                  onChange={setVenueAddress}
                  onSelect={handleAddressSelect}
                  // venueCoordinates={venueCoordinates}
                  venueAddress={venueAddress}
                  name="address"
                  // searchOptions={searchOptions}
                >
                  {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                      {/* <input {...getInputProps({placeholder: 'Type address'})} /> */}
                      <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                      >
                        <InputBase
                          sx={{ml: 1, flex: 1}}
                          placeholder="Search Google Maps"
                          autofocus
                          // inputProps={{'aria-label': 'search google maps'}}
                          {...getInputProps({placeholder: 'Enter your address'})}
                        />
                        <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                      <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                          };

                          return (
                            <div
                              key={coordinates.lat}
                              {...getSuggestionItemProps(suggestion, {style})}
                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
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
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="picture"
                  label="Choose File"
                  name="picture"
                  autoComplete="facebook"
                  onChange={handleFormData}
                  value={formData.facebook}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <input
                  required
                  id="picture"
                  name="picture"
                  type="file"
                  onChange={pictureSelectedHandler}
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
