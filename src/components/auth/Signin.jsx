import React, {useState} from 'react';
import {useGlobalState} from 'utils/stateContext';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {signInFoodTruck, signInVenue} from 'services/authServices';
import {Alert, AlertTitle, Divider} from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Crafty Tukka
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

// import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#041F60'
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#4BE4FF'
    }
  }
});

function Signin() {
  const {store, dispatch} = useGlobalState(); //to be implemented with reducer
  const {venues, foodTrucks} = store;
  const initialFormData = {
    email: '',
    password: ''
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
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
    if (venues.find((venue) => venue.email === formData.email)) {
      // venue sign in
      signInVenue(formData)
        .then((user) => {
          console.log(user);
          let errorMessage = '';
          if (user.error) {
            // convert the object into a string
            // Object.keys(user.error).forEach((key) => {
            //   errorMessage = errorMessage.concat(' | ', `${key} ${user.error[key]}`);
            // });
            errorMessage = user.error;
            setError(errorMessage);
          } else {
            setError(null);
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
    } else if (foodTrucks.find((foodTruck) => foodTruck.email === formData.email)) {
      // food truck sign in
      signInFoodTruck(formData)
        .then((user) => {
          console.log(user);
          let errorMessage = '';
          if (user.error) {
            errorMessage = user.error;
            setError(errorMessage);
          } else {
            setError(null);
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
    } else {
      let errorMessage = 'Please enter a valid email or password';
      setError(errorMessage);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <p>{error}</p>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleFormData}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleFormData}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" value="Login" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Divider sx={{mt: 3}}>Or sign up for a vendor account</Divider>
              <Button
                href="/auth/signup/venue"
                value="Venue"
                fullWidth
                variant="outlined"
                sx={{mt: 3, mb: 2}}
              >
                Sign up as a Brewery
              </Button>
              <Button
                href="/auth/signup/foodtruck"
                value="FoodTruck"
                fullWidth
                disabled
                variant="outlined"
                sx={{mt: 3, mb: 2}}
              >
                Sign up as a Food Truck (coming soon)
              </Button>
              <Copyright sx={{mt: 4}} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signin;
