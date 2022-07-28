import Map from 'components/map/Map';
import './MapContainer.css';

function MapContainer({children}) {
  return (
    <div>
      <Map className="map" />
      {children}
    </div>
  );
}

export default MapContainer;
