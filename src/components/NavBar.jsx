import React, {useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tab,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar({loggedInUser, activateUser}) {
  const navigate = useNavigate();
  const logOut = (event) => {
    event.preventDefault();
    activateUser('');
    navigate('/events');
  };
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>

            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'}
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Tab label="Home" value="/events" component={Link} to="/events" />
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Tab
                      label="Food Trucks"
                      value="/foodtrucks"
                      component={Link}
                      to="/foodtrucks"
                    />
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Tab label="Breweries" value="/venues" component={Link} to="/venues" />
                  </Typography>
                </MenuItem>
                {!loggedInUser && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Tab
                        label="Sign In"
                        value="/auth/signin"
                        component={Link}
                        to="/auth/signin"
                      />
                    </Typography>
                  </MenuItem>
                )}
                {!loggedInUser && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Tab
                        label="Sign Up"
                        value="/auth/signup"
                        component={Link}
                        to="/auth/signup"
                      />
                    </Typography>
                  </MenuItem>
                )}
                {loggedInUser && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Tab label="My Events" />{' '}
                    </Typography>
                  </MenuItem>
                )}
                {loggedInUser && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Tab
                        label="Book an Event"
                        value="/events/new"
                        component={Link}
                        to="/events/new"
                      />
                    </Typography>
                  </MenuItem>
                )}
                {loggedInUser && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Tab
                        label="Edit Profile"
                        value="auth/editprofile"
                        component={Link}
                        to="auth/editprofile"
                      />
                    </Typography>
                  </MenuItem>
                )}
                {loggedInUser}
                {loggedInUser && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Tab label="Log Out" component={Link} to="/events" onClick={logOut} />
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                <Tab label="Home" value="/events" component={Link} to="/events" />
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                <Tab label="Food Trucks" value="/foodtrucks" component={Link} to="/foodtrucks" />
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                <Tab label="Breweries" value="/venues" component={Link} to="/venues" />
              </Button>
              {!loggedInUser && (
                <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Tab label="Sign In" value="/auth/signin" component={Link} to="/auth/signin" />
                </Button>
              )}
              {!loggedInUser && (
                <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Tab label="Sign Up" value="/auth/signup" component={Link} to="/auth/signup" />
                </Button>
              )}
              {loggedInUser && (
                <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Tab label="My Events" />
                </Button>
              )}
              {loggedInUser && (
                <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Tab
                    label="Book an Event"
                    value="/events/new"
                    component={Link}
                    to="/events/new"
                  />
                </Button>
              )}
              {loggedInUser && (
                <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Tab
                    label="Edit Profile"
                    value="auth/editprofile"
                    component={Link}
                    to="auth/editprofile"
                  />
                </Button>
              )}
              {loggedInUser}
              {loggedInUser && (
                <Button onClick={handleCloseNavMenu} sx={{my: 2, color: 'white', display: 'block'}}>
                  <Tab label="Log Out" component={Link} to="/events" onClick={logOut} />
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <AppBar position="sticky">
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
      </AppBar> */}
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
