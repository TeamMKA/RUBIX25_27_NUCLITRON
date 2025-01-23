/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from 'react';


import 'ol/ol.css'; // Import OpenLayers CSS
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
declare global {
  interface Window {
    RR: {
      initialize: (options: { map: any; date: string; location: [number, number]; zoom: number }) => void;
    };
  }
}

const HistoricalMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      const mapp = new Map({
        target: mapRef.current!, // Map container
        layers: [
          new TileLayer({
            source: new OSM(), // Base map (OpenStreetMap)
          }),
        ],
        view: new View({
          center: fromLonLat([76.87766, 19.07598]), // Initial center (longitude, latitude)
          zoom: 5, // Initial zoom level
        }),
      });

      // Load Running Reality script
      const script = document.createElement('script');
      script.src = 'https://www.runningreality.org/lib/rr.js'; // Confirm correct path
      script.onload = () => {
        if (window.RR) {
          window.RR.initialize({
            map: mapp, // Pass the OpenLayers map instance
            date: '1005BC',
            location: [36.609, 24.9706],
            zoom: 4,
          });
        } else {
          console.error('Running Reality library not loaded.');
        }
      };
      script.onerror = () => {
        console.error('Failed to load the Running Reality script.');
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-screen"
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

export default HistoricalMap;
