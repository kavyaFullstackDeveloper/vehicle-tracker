import React from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 17.385044,
  lng: 78.486671,
};

const App = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [vehiclePosition, setVehiclePosition] = React.useState(center);
  const [route, setRoute] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/vehicle-location');
      const data = await response.json();
      setRoute(data);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < route.length) {
        setVehiclePosition({
          lat: route[index].latitude,
          lng: route[index].longitude,
        });
        index++;
      }
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, [route]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={vehiclePosition}
      >
        <Marker position={vehiclePosition} />
        <Polyline path={route.map(r => ({ lat: r.latitude, lng: r.longitude }))} />
      </GoogleMap>
    </LoadScript>
  );
};

export default App;
