import * as React from 'react';
import {Box, Container} from '@mui/material';
import Map from 'components/map/Map';
import './MapContainer.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MapContainer({children}) {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'bottom',
    horizontal: 'right'
  });

  const {vertical, horizontal, open} = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({...state, open: false});
  };

  return (
    <Box color="secondary" sx={{paddingLeft: {xs: '0px', md: '400px'}}}>
      <Map className="map" />
      {children}
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{vertical, horizontal}}
      >
        <Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
          Click a marker on the map to visit the brewery at that location.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MapContainer;
