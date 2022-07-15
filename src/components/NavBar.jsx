import React from 'react';
import {AppBar, Toolbar, Typography, Tabs, Tab} from '@mui/material';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
      <AppBar position="absolute">
        <Typography variant="h2">
          <Toolbar>
            <Tabs value={false}>
              <Tab label="Home" value="/events" component={Link} to="/events" />
              <Tab label="Food Trucks" value="/foodtrucks" component={Link} to="/foodtrucks" />
              <Tab label="Breweries" value="/venues" component={Link} to="/venues" />
              <Tab label="Sign In" value="/auth/signin" component={Link} to="/auth/signin" />
              <Tab label="Sign Up" value="/auth/signup" component={Link} to="/auth/signup" />
              <Tab label="Log Out" component={Link} to="/events" />
            </Tabs>
          </Toolbar>
        </Typography>
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
