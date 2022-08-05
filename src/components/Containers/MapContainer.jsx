import {Box, Container} from '@mui/material';
import Map from 'components/map/Map';
import './MapContainer.css';

function MapContainer({children}) {
  return (
    <Box sx={{paddingLeft: {xs: '0px', md: '400px'}}}>
      <Map className="map" />
      {children}
    </Box>
  );
}

export default MapContainer;
