import React from 'react';
import {AppBar, Toolbar, Typography, Tabs, Tab, Container} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

function NavBar({loggedInUser, activateUser}) {
  const navigate = useNavigate();
  const logOut = (event) => {
    event.preventDefault();
    activateUser('');
    navigate('/events');
  };
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Typography variant="h2">
            <Toolbar disableGutters>
              <Tabs value={false}>
                <Tab label="Home" value="/events" component={Link} to="/events" />
                <Tab label="Food Trucks" value="/foodtrucks" component={Link} to="/foodtrucks" />
                <Tab label="Breweries" value="/venues" component={Link} to="/venues" />
                {!loggedInUser && (
                  <Tab label="Sign In" value="/auth/signin" component={Link} to="/auth/signin" />
                )}
                {!loggedInUser && (
                  <Tab label="Sign Up" value="/auth/signup" component={Link} to="/auth/signup" />
                )}
                {loggedInUser && <Tab label="My Events" />}
                {loggedInUser && (
                  <Tab
                    label="Book an Event"
                    value="/events/new"
                    component={Link}
                    to="/events/new"
                  />
                )}
                {loggedInUser && (
                  <Tab
                    label="Edit Profile"
                    value="auth/editprofile"
                    component={Link}
                    to="auth/editprofile"
                  />
                )}
                {loggedInUser}
                {loggedInUser && (
                  <Tab label="Log Out" component={Link} to="/events" onClick={logOut} />
                )}
              </Tabs>
            </Toolbar>
          </Typography>
        </Container>
      </AppBar>
    </>

    // <nav>
    //   <Link to="/events">Home</Link>
    //   <Link to="/foodtrucks">Food Trucks</Link>
    //   <Link to="/breweries">Breweries</Link>
    //   <Link to="/auth/signin">Sign In</Link>
    //   <Link to="/auth/signup">Sign Up</Link>
    //   <Link to="/events">Logout</Link>
    // </nav>
  );
}

export default NavBar;
