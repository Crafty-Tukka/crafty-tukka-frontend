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
  Button,
  Tooltip,
  Avatar
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {useGlobalState} from 'utils/stateContext';

function NavBar() {
  const {store, dispatch} = useGlobalState();
  const {loggedInUser, loggedInUserId, venues} = store;
  console.log(loggedInUserId);
  console.log(venues);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    dispatch({
      type: 'setLoggedInUser',
      data: null
    });
    dispatch({
      type: 'setToken',
      data: null
    });
    navigate('/events');
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
                  <>
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
                  </>
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
            </Box>
            {loggedInUser && (
              <Box sx={{flexGrow: 0}}>
                <Tooltip title="Open My User Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar
                      alt="User Avatar"
                      src="https://images.unsplash.com/photo-1600956306204-d6a5c6aab472?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {loggedInUser && (
                        <>
                          <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'text.primary', display: 'block'}}
                          >
                            <Tab
                              label="My Events"
                              value={`/events/venues/${loggedInUserId}`}
                              component={Link}
                              to={`/events/venues/${loggedInUserId}`}
                            />
                          </Button>
                          {/* <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'text.primary', display: 'block'}}
                          >
                            <Tab
                              label="My Pending Events"
                              value={`/events/venues/${loggedInUserId}/pending`}
                              component={Link}
                              to={`/events/venues/${loggedInUserId}/pending`}
                            />
                          </Button> */}
                          <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'text.primary', display: 'block'}}
                          >
                            <Tab
                              label="Book an Event"
                              value="/events/new"
                              component={Link}
                              to="/events/new"
                            />
                          </Button>
                          {/* <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'text.primary', display: 'block'}}
                          >
                            <Tab
                              label="Edit Profile"
                              value="auth/editprofile"
                              component={Link}
                              to="auth/editprofile"
                            />
                          </Button> */}
                          <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'text.primary', display: 'block'}}
                          >
                            <Tab label="Log Out" component={Link} to="/events" onClick={signOut} />
                          </Button>
                        </>
                      )}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
