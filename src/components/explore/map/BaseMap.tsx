/**
 * BaseMap.tsx
 *
 * Initializes the Mapbox map instance and provides it (and its loading state)
 * via a React Context. The “mapLoaded” state is set to true only once the map’s
 * style has completely loaded.
 *
 * IMPORTANT: 
 *  - The container div must have defined dimensions (e.g. Tailwind’s h-screen).
 *  - Ensure NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file is valid.
 */
"use client";

import React, { useRef, useEffect, useState, ReactNode, createContext, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_CONFIG } from "../../../lib/mapbox/config";
import "mapbox-gl/dist/mapbox-gl.css";

interface BaseMapProps {
  mode: "story" | "data";
  children?: ReactNode;
}

interface MapContextValue {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
}

const MapContext = createContext<MapContextValue>({ map: null, mapLoaded: false });

// Export a custom hook for child components to access the map context.
export function useMap() {
  return useContext(MapContext);
}

export function BaseMap({ mode, children }: BaseMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Set Mapbox access token (verify your token in .env.local)
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  useEffect(() => {
    if (!mapContainer.current) return;
    console.log("📌 BaseMap: Initializing Mapbox map...");

    // Initialize the map with style based on mode.
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mode === "story" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle,
      center: MAPBOX_CONFIG.center,
      zoom: MAPBOX_CONFIG.zoom,
      bounds: MAPBOX_CONFIG.bounds,
    });

    // Add basic navigation controls.
    map.current.addControl(new mapboxgl.NavigationControl());

    // Once the map is loaded, mark mapLoaded true.
    map.current.on("load", () => {
      console.log("✅ BaseMap: Map has fully loaded.");
      setMapLoaded(true);
    });

    return () => {
      console.log("🧹 BaseMap: Cleaning up the map instance...");
      map.current?.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, []); // Run only on mount

  // When mode changes, update the style.
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    console.log(`🔄 BaseMap: Switching map to "${mode}" mode...`);
    const newStyle = mode === "story" ? MAPBOX_CONFIG.storyStyle : MAPBOX_CONFIG.dataStyle;
    if (map.current.getStyle().sprite === newStyle) return;
    setMapLoaded(false);
    map.current.setStyle(newStyle);
    map.current.once("style.load", () => {
      console.log("✅ BaseMap: Map style reloaded successfully.");
      setMapLoaded(true);
    });
  }, [mode]);

  return (
    <MapContext.Provider value={{ map: map.current, mapLoaded }}>
      <div ref={mapContainer} className="w-full h-full relative">
        {/* Render child layers only after the style has fully loaded */}
        {mapLoaded && children}
      </div>
    </MapContext.Provider>
  );
}
