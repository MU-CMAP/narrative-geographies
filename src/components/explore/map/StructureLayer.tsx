/**
 * StructureLayer.tsx
 *
 * This component fetches structure GeoJSON data from the specified URL and
 * adds it as a Mapbox source and circle layer (styled with a bright magenta circle).
 * The layer is re‑added when the map's style reloads (which happens, for example,
 * when switching modes). This ensures that our custom layer persists after a style change.
 *
 * IMPORTANT:
 * - The GeoJSON file should be accessible at /geojson/communities/structures.geojson.
 * - Verify that the file contains valid features.
 */

"use client";

import React, { useEffect } from "react";
import { useMap } from "./BaseMap";

const StructureLayer: React.FC = () => {
  const { map, mapLoaded } = useMap();

  // Function to fetch GeoJSON data and add/update the structure layer
  const addStructureLayer = async () => {
    if (!map) return;
    try {
      // Explicitly fetch the GeoJSON data from the given URL
      const response = await fetch("/geojson/communities/structures.geojson");
      if (!response.ok) {
        throw new Error(`Failed to fetch structure GeoJSON: ${response.statusText}`);
      }
      const data = await response.json();
      // Log the number of features fetched for debugging
      console.log(`StructureLayer: Fetched GeoJSON with ${data.features?.length || 0} features.`);

      // Add or update the source for structures
      if (!map.getSource("structure-data")) {
        map.addSource("structure-data", {
          type: "geojson",
          data,
        });
        console.log("StructureLayer: Added source 'structure-data'.");
      } else {
        // If the source already exists, update its data
        (map.getSource("structure-data") as mapboxgl.GeoJSONSource).setData(data);
        console.log("StructureLayer: Updated source 'structure-data'.");
      }

      // Add the layer if it doesn't exist
      if (!map.getLayer("structure-markers")) {
        map.addLayer({
          id: "structure-markers",
          type: "circle",
          source: "structure-data",
          paint: {
            "circle-radius": 10,         // Debug radius
            "circle-color": "#FF00FF",     // Bright magenta
            "circle-stroke-width": 1,
            "circle-stroke-color": "#000000",
          },
        });
        console.log("StructureLayer: Added layer 'structure-markers'.");
      }
    } catch (error) {
      console.error("StructureLayer: Error in addStructureLayer:", error);
    }
  };

  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log("StructureLayer: Map not ready or style not loaded yet.");
      return;
    }
    console.log("StructureLayer: Map and style are loaded. Executing addStructureLayer().");

    // Initially add the structure layer
    addStructureLayer();

    // Re-add the structure layer whenever the map style loads (after style reloads)
    map.on("style.load", addStructureLayer);
    console.log("StructureLayer: Listening for style.load events to re-add the layer.");

    // Cleanup: remove listener and remove layer/source on unmount
    return () => {
      map.off("style.load", addStructureLayer);
      if (map.getLayer("structure-markers")) {
        map.removeLayer("structure-markers");
        console.log("StructureLayer: Removed layer 'structure-markers' on cleanup.");
      }
      if (map.getSource("structure-data")) {
        map.removeSource("structure-data");
        console.log("StructureLayer: Removed source 'structure-data' on cleanup.");
      }
    };
  }, [map, mapLoaded]);

  return null;
};

export default StructureLayer;
