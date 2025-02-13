/**
 * StructureLayer.tsx
 *
 * Fetches structure GeoJSON data and adds it as a Mapbox source and circle layer.
 * For debugging, the layer is styled with a bright magenta circle (radius 10).
 *
 * This effect runs only when both the map instance and mapLoaded are true.
 */

"use client";

import React, { useEffect } from "react";
import { useMap } from "./BaseMap";

const StructureLayer: React.FC = () => {
  const { map, mapLoaded } = useMap();

  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log("StructureLayer: Map not ready or style not loaded yet.");
      return;
    }
    console.log("StructureLayer: Map and style are loaded. Executing addStructureLayer().");

    try {
      if (!map.getSource("structure-data")) {
        map.addSource("structure-data", {
          type: "geojson",
          data: "/geojson/communities/structures.geojson", // Ensure this path is correct
        });
        console.log("StructureLayer: Added source 'structure-data'.");
      }
    } catch (err) {
      console.error("StructureLayer: Error adding structure source:", err);
    }

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
    return () => {
      if (map.getLayer("structure-markers")) {
        map.removeLayer("structure-markers");
        console.log("StructureLayer: Removed layer 'structure-markers'.");
      }
      if (map.getSource("structure-data")) {
        map.removeSource("structure-data");
        console.log("StructureLayer: Removed source 'structure-data'.");
      }
    };
  }, [map, mapLoaded]);

  return null;
};

export default StructureLayer;
