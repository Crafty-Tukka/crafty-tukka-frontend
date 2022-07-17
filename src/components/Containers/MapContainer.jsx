import Map from 'components/map/Map';
import React from 'react';
import './MapContainer.css';

function MapContainer({children}) {
  return (
    <div className="map-container">
      <Map />
      {children}
    </div>
  );
}

export default MapContainer;
