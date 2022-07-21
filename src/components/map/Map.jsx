import {useMemo, useState, useEffect} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';
// import Events from 'components/events/Events';
// import './Map.css';
import venues from '../../data/breweries.json';

function Map() {
  const initialMapPosition = {position: {lat: -27.4705, lng: 153.026}, initialZoom: 12.1};
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true
    }),
    []
  );
  const [markers, setMarkers] = useState([]);
  const [zoom, setZoom] = useState(initialMapPosition.initialZoom); // initial zoom: ;
  const [center, setCenter] = useState(initialMapPosition.position);

  useEffect(() => {
    setMarkers(venues);
  }, []);

  const onClick = (e) => {
    setCenter(e.latLng);
    setZoom(15);
  };

  const [mapInstance, setMapInstance] = useState({});
  const onLoad = (map) => {
    setMapInstance(map);
    console.log(map);
  };

  const onZoomChanged = () => {
    setZoom(mapInstance.zoom);
  };
  // const mapRef = useRef(GoogleMap);
  // const onLoad = useCallback((map) => (mapRef.current = map), []);

  // const onZoomChanged = () => {
  //   setZoom(mapRef.zoom);
  // };

  return (
    // <div className="container">
    // <div className="controls"><Events /></div>
    // <div className="map">
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      // onLoad={onLoad}
      onLoad={() => onLoad(this)}
      onZoomChanged={onZoomChanged}
    >
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} onClick={onClick} />
      ))}
    </GoogleMap>
    // </div>
    // </div>
  );
}

export default Map;
