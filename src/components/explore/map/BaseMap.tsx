/**
 * BaseMap.tsx
 *
 * Purpose:
 * Initializes the Mapbox map instance and provides it (along with its loading state)
 * via a React Context. The map style is switched based on the `mode` prop ("story" or "data").
 *
 * Dependencies:
 * - React (useRef, useEffect, useState, createContext, useContext)
 * - Mapbox GL JS
 * - MAPBOX_CONFIG from ../../../lib/mapbox/config
 *
 * IMPORTANT:
 * - The container div must have defined dimensions (e.g. Tailwind’s h-screen).
 * - Ensure NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file is valid.
 */

"use client";

import React, { useRef, useEffect, useState, ReactNode, createContext, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_CONFIG } from "../../../lib/mapbox/config";
import "mapbox-gl/dist/mapbox-gl.css";

// Define the props interface for BaseMap.
interface BaseMapProps {
  mode: "story" | "data";  // Determines which style to use.
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
export function BaseMap({ mode, children }: BaseMapProps) {
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

    // Create the map instance using configuration settings.
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mode === "story" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle,
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
    if (!map.current || !mapLoaded) return;
    console.log(`🔄 BaseMap: Switching map to "${mode}" mode...`);

    // Determine the new style based on the mode.
    const newStyle = mode === "story" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle;

    // Force a style update:
    setMapLoaded(false);               // Reset the loaded state.
    map.current.setStyle(newStyle);    // Update the style.
    
    // Once the new style has loaded, update the state.
    map.current.once("style.load", () => {
      console.log("✅ BaseMap: Map style reloaded successfully.");
      setMapLoaded(true);
    });
  }, [mode]); // Run whenever the mode prop changes.

  // Render the map container and conditionally render child components only after the style has loaded.
  return (
    <MapContext.Provider value={{ map: map.current, mapLoaded }}>
      <div ref={mapContainer} className="w-full h-full relative">
        {/* Render child layers only after the map style has fully loaded */}
        {mapLoaded && children}
      </div>
    </MapContext.Provider>
  );
}
