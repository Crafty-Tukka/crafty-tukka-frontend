import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {GoogleMap, InfoWindow, Marker} from '@react-google-maps/api';
import {useGlobalState} from 'utils/stateContext';
// import {getGeocode, getLatLng} from 'use-places-autocomplete';
// import Events from 'components/events/Events';
import './Map.css';
// import venues from '../../data/breweries.json';
import mapStyles from './mapStyles';
import {Box, Container} from '@mui/material';

function Map({children}) {
  const initialMapPosition = {position: {lat: -27.4705, lng: 153.026}};
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      styles: mapStyles
    }),
    []
  );
  const {store} = useGlobalState();
  const {venues} = store;
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  // const [zoom, setZoom] = useState(initialMapPosition.initialZoom); // initial zoom: ;
  const [center, setCenter] = useState(initialMapPosition.position);
  // const [venueList, setVenueList] = useState(initialMapPosition.venue

  // const mapRef = useRef(GoogleMap);
  // const onLoad = useCallback((map) => (mapRef.current = map), []);

  useEffect(() => {
    setMarkers(venues);
  }, [venues]);

  const onClick = (e) => {
    setCenter(e.latLng);
    setSelectedMarker(e);
    // setZoom(15);
  };

  console.log(markers);

  // This is the code that allows map to zoom in and out when the marker is clicked
  // const [mapInstance, setMapInstance] = useState({});
  // const onLoad = (map) => {
  //   setMapInstance(map);
  //   // console.log(map);
  // };

  // const onZoomChanged = () => {
  //   setZoom(mapInstance.zoom);
  //   console.log(zoom);
  // };

  // This is the alternative syntax for zoom change
  const mapRef = useRef(GoogleMap);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  // const onZoomChanged = () => {
  //   setZoom(mapRef.zoom);
  // };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300
      }}
    >
      <GoogleMap
        zoom={12.1}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} position={{lat: marker.lat, lng: marker.lng}} onClick={onClick} />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.latLng}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <h1>This is a message that should render</h1>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      {children}
    </Box>
  );
}

// export default Map;

// import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
// import {GoogleMap, Marker} from '@react-google-maps/api';
// // import {useGlobalState} from 'utils/stateContext';
// import {getGeocode, getLatLng} from 'use-places-autocomplete';
// // import Events from 'components/events/Events';
// // import './Map.css';
// import venues from '../../data/breweries.json';

// function Map() {
//   // const {store} = useGlobalState();
//   // const {venues} = store;
//   const initialMapPosition = {position: {lat: -27.4705, lng: 153.026}, initialZoom: 12.1};
//   const options = useMemo(
//     () => ({
//       disableDefaultUI: true,
//       clickableIcons: true
//     }),
//     []
//   );
//   const [markers, setMarkers] = useState([]);
//   const [zoom, setZoom] = useState(initialMapPosition.initialZoom); // initial zoom: ;
//   const [center, setCenter] = useState(initialMapPosition.position);

//   // getGeocode(
//   //   venues.map((venue) => {
//   //     return `${venue.address1} ${venue.suburb}`;
//   //   })
//   // ).then((results) => {
//   //   const {lat, lng} = getLatLng(results[0]);
//   //   console.log('Coordinates: ', {lat, lng});
//   // });

//   useEffect(() => {
//     setMarkers(venues);
//   }, []);

//   const onClick = (e) => {
//     setCenter(e.latLng);
//     setZoom(15);
//   };

//   // const [mapInstance, setMapInstance] = useState({});
//   // const onLoad = (map) => {
//   //   setMapInstance(map);
//   //   console.log(map);
//   // };

//   // const onZoomChanged = () => {
//   //   setZoom(mapInstance.zoom);
//   // };
//   // const mapRef = useRef(GoogleMap);
//   const onLoad = () => {
//     this.onLoad(this);
//   };

//   const onZoomChanged = () => {
//     setZoom(this);
//   };

//   return (
//     // <div className="container">
//     // <div className="controls"><Events /></div>
//     // <div className="map">
//     <GoogleMap
//       zoom={zoom}
//       center={center}
//       mapContainerClassName="map-container"
//       options={options}
//       // onLoad={onLoad}
//       onLoad={onLoad}
//       onZoomChanged={onZoomChanged}
//     >
//       {markers.map((marker) => (
//         <Marker
//           key={marker.id}
//           position={marker.position}
//           onClick={onClick}
//           getGeocode={getGeocode}
//         />
//       ))}
//     </GoogleMap>
//     // </div>
//     // </div>
//   );
// }

export default Map;
