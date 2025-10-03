import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  onLocationSelect?: (lat: number, lon: number) => void;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhydWJvLXJveSIsImEiOiJjbWdhaG5scXMwMmlhMmtvcWNoa2QyZXlxIn0.A6Sb6RwIiIUfTI1FdrKPRA';

export const MapView = ({ onLocationSelect }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4,
      pitch: 30,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add example markers for ground stations
    const exampleStations = [
      { name: "Los Angeles", coords: [-118.2437, 34.0522] },
      { name: "New York", coords: [-74.0060, 40.7128] },
      { name: "Chicago", coords: [-87.6298, 41.8781] },
    ];

    exampleStations.forEach(station => {
      const marker = new mapboxgl.Marker({ color: '#00d4ff' })
        .setLngLat(station.coords as [number, number])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${station.name}</strong><br/>Ground Station`))
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        onLocationSelect?.(station.coords[1], station.coords[0]);
      });
    });

    map.current.on('click', (e) => {
      onLocationSelect?.(e.lngLat.lat, e.lngLat.lng);
    });

    return () => {
      map.current?.remove();
    };
  }, [onLocationSelect]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-glow">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border/50">
        <p className="text-xs font-medium text-muted-foreground">
          Click stations or map to view forecasts
        </p>
      </div>
    </div>
  );
};
