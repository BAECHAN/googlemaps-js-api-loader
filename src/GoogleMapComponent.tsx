import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 37.5704,
  lng: 126.9921
};

const markerPositions = [
  { lat: 37.5366059, lng: 126.9771397, title: '전쟁기념관' },
  { lat: 37.571094, lng: 126.991214, title: 'CGV 피카디리1958' },
  { lat: 37.5435494, lng: 127.0189517, title: '옥수현대아파트' }
];

const GoogleMapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);


  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_IS_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 15,
        });

        markerPositions.forEach((position) => {
          const marker = new window.google.maps.Marker({
            position,
            map,
          });

          marker.addListener('click', () => {
            setSelectedMarker(position);
          });
        });

        new window.google.maps.Polyline({
          path: markerPositions,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map,
        });
      }
    });
  }, []);

  return <div>
    <div ref={mapRef} style={containerStyle} />
    {selectedMarker && (
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px', backgroundColor: 'white' }}>
          <h3>{selectedMarker?.title}</h3>
          <p>Latitude: {selectedMarker.lat}</p>
          <p>Longitude: {selectedMarker.lng}</p>
        </div>
      )}
    </div>;
}

export default GoogleMapComponent