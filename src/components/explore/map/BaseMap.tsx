/**
 * BaseMap.tsx
 *
 * Purpose:
 * Initializes the Mapbox map instance and provides it (along with its loading state)
 * via a React Context. The map style is switched based on the application mode
 * ("STORIES" or "DATA") from the global context.
 *
 * Dependencies:
 * - React (useRef, useEffect, useState, createContext, useContext)
 * - Mapbox GL JS
 * - AppContext for global application state
 * - MAPBOX_CONFIG from ../../../lib/mapbox/config
 *
 * IMPORTANT:
 * - The container div must have defined dimensions (e.g. Tailwind's h-screen).
 * - Ensure NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file is valid.
 */

"use client";

import React, { useRef, useEffect, useState, ReactNode, createContext, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_CONFIG } from "../../../lib/mapbox/config";
import { useAppContext, AppMode } from "../../../context/AppContext";
import "mapbox-gl/dist/mapbox-gl.css";

// Define the props interface for BaseMap.
interface BaseMapProps {
  children?: ReactNode;    // Child components (e.g., layers) that depend on the map.
}

// Define the context value type.
interface MapContextValue {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
}

// Create a React Context for sharing the map instance and its loading state.
const MapContext = createContext<MapContextValue>({ map: null, mapLoaded: false });

// Export a custom hook for easy access to the MapContext.
export function useMap() {
  return useContext(MapContext);
}

// BaseMap component definition.
export function BaseMap({ children }: BaseMapProps) {
  // Access global app context
  const { mode } = useAppContext();
  
  // Create a ref for the map container.
  const mapContainer = useRef<HTMLDivElement>(null);
  // Create a ref for the Mapbox map instance.
  const map = useRef<mapboxgl.Map | null>(null);
  // Local state to track whether the map style has fully loaded.
  const [mapLoaded, setMapLoaded] = useState(false);

  // Set the Mapbox access token from the environment variable.
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  // Initialize the map once when the component mounts.
  useEffect(() => {
    if (!mapContainer.current) return;
    console.log("📌 BaseMap: Initializing Mapbox map...");

    // Determine the initial style based on the mode from context
    const initialStyle = mode === "STORIES" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle;

    // Create the map instance using configuration settings.
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: initialStyle,
      center: MAPBOX_CONFIG.center,
      zoom: MAPBOX_CONFIG.zoom,
      bounds: MAPBOX_CONFIG.bounds,
    });

    // Add navigation controls (zoom and reset).
    map.current.addControl(new mapboxgl.NavigationControl());

    // Once the map has loaded its style, mark mapLoaded as true.
    map.current.on("load", () => {
      console.log("✅ BaseMap: Map has fully loaded.");
      setMapLoaded(true);
    });

    // Cleanup function: remove the map instance on component unmount.
    return () => {
      console.log("🧹 BaseMap: Cleaning up the map instance...");
      map.current?.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, []); // Empty dependency array: run once on mount.

 // Update the map style when the mode changes.
useEffect(() => {
  // Only proceed if the map is initialized and the style is loaded.
  if (!map.current) {
    console.log("BaseMap: Map not initialized yet");
    return;
  }
  
  console.log(`🔄 BaseMap: Attempting to switch map to "${mode}" mode...`);
  
  try {
    // Determine the new style based on the mode from context
    const newStyle = mode === "STORIES" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle;
    console.log("New style to be applied:", newStyle);
    
    // First set mapLoaded to false to prevent layer updates during style change
    setMapLoaded(false);
    
    // Set the style and handle the style.load event
    map.current.once('style.load', () => {
      console.log("✅ BaseMap: Map style reloaded successfully.");
      setMapLoaded(true);
    });
    
    // Now set the style
    map.current.setStyle(newStyle);
  } catch (error) {
    console.error("Error setting map style:", error);
    // Reset mapLoaded state in case of error
    setMapLoaded(true);
  }
}, [mode]); // Only depend on mode changes, not mapLoaded

  // Render the map container and conditionally render child components only after the style has loaded.
  return (
    <MapContext.Provider value={{ map: map.current, mapLoaded }}>
      {/* The container div now includes id="map" to allow smooth scrolling */}
      <div ref={mapContainer} id="map" className="w-full h-full relative">
        {mapLoaded && children}
      </div>
    </MapContext.Provider>
  );  
}