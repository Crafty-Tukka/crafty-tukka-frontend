import Map from 'components/map/Map';
import './MapContainer.css';

function MapContainer({children}) {
  return (
    <div>
      <>
        <Map />
      </>
      {children}
    </div>
  );
}

export default MapContainer;
