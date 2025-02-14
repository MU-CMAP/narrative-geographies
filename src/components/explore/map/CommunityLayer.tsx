/**
 * CommunityLayer.tsx
 *
 * Purpose:
 * This component is responsible for fetching GeoJSON data representing community boundaries,
 * adding/updating it as a Mapbox source, and then adding a fill layer to visualize these boundaries.
 * It also attaches a click event handler (if provided) to handle feature selection.
 *
 * Dependencies:
 * - Uses the Mapbox GL JS library.
 * - Consumes the map instance and its loading state via the custom hook `useMap()` from BaseMap.
 *
 * Assumptions:
 * - The map style is fully loaded before this component runs.
 * - The GeoJSON file is available at the provided URL (default is "/geojson/communities/boundaries.geojson").
 *
 * Note:
 * - For debugging, the fill layer uses a bright green color with 50% opacity.
 */

"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useMap } from "./BaseMap";

// Define the props for CommunityLayer with an optional geojsonUrl and click handler.
interface CommunityLayerProps {
  // URL from which to fetch the community boundaries GeoJSON.
  geojsonUrl?: string; 
  // Optional function to handle click events on a community feature.
  onFeatureClick?: (feature: GeoJSON.Feature) => void;
}

// Define the CommunityLayer component as a React Functional Component.
export const CommunityLayer: React.FC<CommunityLayerProps> = ({
  geojsonUrl = "/geojson/communities/boundaries.geojson", // default URL if none provided
  onFeatureClick,
}) => {
  // Destructure the map instance and the flag indicating that the map's style has loaded.
  const { map, mapLoaded } = useMap();

  useEffect(() => {
    // This effect depends on the map instance, the mapLoaded flag, the URL, and the click handler.
    if (!map || !mapLoaded) {
      // If the map isn't available or its style isn't loaded yet, exit early.
      console.log("CommunityLayer: Map not ready or style not loaded yet.");
      return;
    }
    console.log("CommunityLayer: Map and style are loaded. Executing addGeoJSON().");

    // Fetch the GeoJSON data from the provided URL.
    fetch(geojsonUrl)
      .then((res) => {
        // Check if the response is OK (status code 200-299).
        if (!res.ok) {
          throw new Error(`Failed to fetch GeoJSON: ${res.status} ${res.statusText}`);
        }
        return res.json(); // Parse response as JSON.
      })
      .then((data) => {
        console.log("CommunityLayer: Fetched GeoJSON data:", data);
        // Check if the source "community-data" already exists on the map.
        if (!map.getSource("community-data")) {
          // If not, add a new GeoJSON source with the fetched data.
          map.addSource("community-data", {
            type: "geojson",
            data,
          });
          console.log("CommunityLayer: Added new source 'community-data'.");

          // Add a fill layer to display the community boundaries.
          map.addLayer({
            id: "community-boundaries",
            type: "fill",
            source: "community-data",
            paint: {
              "fill-color": "#00FF00", // Bright green for debugging
              "fill-opacity": 0.5,       // 50% opacity
              "fill-outline-color": "#000000", // Black outline for contrast
            },
          });
          console.log("CommunityLayer: Added layer 'community-boundaries'.");
        } else {
          // If the source already exists, simply update its data.
          (map.getSource("community-data") as mapboxgl.GeoJSONSource).setData(data);
          console.log("CommunityLayer: Updated source 'community-data'.");
        }
      })
      .catch((err) => {
        // Log any errors encountered during fetching or processing.
        console.error("CommunityLayer: Error loading GeoJSON:", err);
      });

    // If a click handler is provided, attach it to the "community-boundaries" layer.
    if (onFeatureClick) {
      // Define the click event handler that extracts the clicked feature.
      const clickHandler = (e: mapboxgl.MapLayerMouseEvent) => {
        const feature = e.features && e.features[0]; // Get the first feature from the event.
        if (feature) onFeatureClick(feature); // Call the provided handler with the feature.
      };
      // Attach the click event to the layer.
      map.on("click", "community-boundaries", clickHandler);
      console.log("CommunityLayer: Click handler attached.");

      // Cleanup: remove the click handler when the component unmounts or dependencies change.
      return () => {
        map.off("click", "community-boundaries", clickHandler);
        console.log("CommunityLayer: Click handler removed on cleanup.");
      };
    }
    // End of useEffect; dependencies include map instance, style loading, geojsonUrl, and click handler.
  }, [map, mapLoaded, geojsonUrl, onFeatureClick]);

  // This component does not render any visible elements by itself.
  return null;
};
