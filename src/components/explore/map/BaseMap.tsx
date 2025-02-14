/**
 * BaseMap.tsx
 *
 * Purpose:
 * - Initialize the Mapbox GL JS map instance.
 * - Provide the map instance and its loading state to child components
 *   via React Context.
 * - Dynamically switch the map style based on the provided "mode" prop.
 *
 * Key Dependencies:
 * - Mapbox GL JS for map rendering.
 * - MAPBOX_CONFIG for configuration details (style URLs, center, zoom, bounds).
 * - React Context to share the map instance across the application.
 *
 * Important Notes:
 * - The container div must have defined dimensions (e.g., Tailwind’s h-screen).
 * - Ensure NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file is valid.
 */

"use client";

// Import React dependencies and types.
import React, { useRef, useEffect, useState, ReactNode, createContext, useContext } from "react";
// Import Mapbox GL library.
import mapboxgl from "mapbox-gl";
// Import the Mapbox configuration object (defines style URLs, map center, etc.).
import { MAPBOX_CONFIG } from "../../../lib/mapbox/config";
// Import Mapbox CSS to style map controls and elements.
import "mapbox-gl/dist/mapbox-gl.css";

// Define the component's props.
// "mode" controls which map style to load ("story" or "data").
// "children" will hold any additional layers or components to render on top of the map.
interface BaseMapProps {
  mode: "story" | "data";
  children?: ReactNode;
}

// Define the context value structure to share the map instance and its loaded state.
interface MapContextValue {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
}

// Create a React context for the map with default values.
const MapContext = createContext<MapContextValue>({ map: null, mapLoaded: false });

// Export a custom hook for easy access to the MapContext in child components.
export function useMap() {
  return useContext(MapContext);
}

/**
 * BaseMap Component
 *
 * This component initializes the Mapbox map, sets up navigation controls,
 * manages the map's style based on the current "mode", and provides the map
 * instance and its loading state via Context.
 */
export function BaseMap({ mode, children }: BaseMapProps) {
  // Ref to hold the map container DOM element.
  const mapContainer = useRef<HTMLDivElement>(null);
  // Ref to store the Mapbox map instance; persists across renders.
  const map = useRef<mapboxgl.Map | null>(null);
  // State to track whether the map's style has fully loaded.
  const [mapLoaded, setMapLoaded] = useState(false);

  // Set Mapbox access token from environment variables.
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  // useEffect to initialize the Mapbox map only once when the component mounts.
  useEffect(() => {
    // If the container is not available, exit early.
    if (!mapContainer.current) return;
    console.log("📌 BaseMap: Initializing Mapbox map...");

    // Create a new Mapbox map instance.
    map.current = new mapboxgl.Map({
      container: mapContainer.current,                          // The DOM element to attach the map.
      style: mode === "story" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle,  // Use style based on mode.
      center: MAPBOX_CONFIG.center,                              // Initial map center coordinates.
      zoom: MAPBOX_CONFIG.zoom,                                  // Initial zoom level.
      bounds: MAPBOX_CONFIG.bounds,                              // Map bounds to restrict panning.
    });

    // Add navigation controls (zoom, compass) to the map.
    map.current.addControl(new mapboxgl.NavigationControl());

    // Listen for the "load" event to mark the map as fully loaded.
    map.current.on("load", () => {
      console.log("✅ BaseMap: Map has fully loaded.");
      setMapLoaded(true); // Update state to indicate the style is loaded.
    });

    // Cleanup function: remove the map instance when the component unmounts.
    return () => {
      console.log("🧹 BaseMap: Cleaning up the map instance...");
      map.current?.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  // useEffect to update the map's style whenever the "mode" prop changes.
  useEffect(() => {
    // Only proceed if the map exists and its style is loaded.
    if (!map.current || !mapLoaded) return;
    console.log(`🔄 BaseMap: Switching map to "${mode}" mode...`);

    // Determine the new style URL based on the mode.
    const newStyle = mode === "story" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle;
    // Check if the current style already matches the new style to avoid unnecessary updates.
    if (map.current.getStyle().sprite === newStyle) return;

    // Set mapLoaded to false before starting the style switch.
    setMapLoaded(false);
    // Update the map style.
    map.current.setStyle(newStyle);
    // Wait for the new style to load before setting mapLoaded back to true.
    map.current.once("style.load", () => {
      console.log("✅ BaseMap: Map style reloaded successfully.");
      setMapLoaded(true);
    });
  }, [mode]); // Dependency on "mode" ensures style update when mode changes.

  // Render the MapContext provider and the map container.
  // Only render child components (e.g., layers) once the map style is fully loaded.
  return (
    <MapContext.Provider value={{ map: map.current, mapLoaded }}>
      <div ref={mapContainer} className="w-full h-full relative">
        {/* Render children only if mapLoaded is true to ensure dependent components do not render prematurely. */}
        {mapLoaded && children}
      </div>
    </MapContext.Provider>
  );
}
