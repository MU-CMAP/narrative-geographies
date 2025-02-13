/**
 * CommunityLayer.tsx
 *
 * Fetches community boundary GeoJSON data and adds it as a Mapbox source and fill layer.
 * For debugging, the layer is styled with a bright green fill (50% opacity).
 *
 * This effect runs only when both the map instance and mapLoaded (i.e. style load) are true.
 */

"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useMap } from "./BaseMap";

interface CommunityLayerProps {
  geojsonUrl?: string; // Defaults to the boundaries file
  onFeatureClick?: (feature: GeoJSON.Feature) => void;
}

export const CommunityLayer: React.FC<CommunityLayerProps> = ({
  geojsonUrl = "/geojson/communities/boundaries.geojson",
  onFeatureClick,
}) => {
  const { map, mapLoaded } = useMap();

  useEffect(() => {
    if (!map || !mapLoaded) {
      console.log("CommunityLayer: Map not ready or style not loaded yet.");
      return;
    }
    console.log("CommunityLayer: Map and style are loaded. Executing addGeoJSON().");

    // Fetch the GeoJSON data.
    fetch(geojsonUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch GeoJSON: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("CommunityLayer: Fetched GeoJSON data:", data);
        // Add or update the source.
        if (!map.getSource("community-data")) {
          map.addSource("community-data", {
            type: "geojson",
            data,
          });
          console.log("CommunityLayer: Added new source 'community-data'.");
          map.addLayer({
            id: "community-boundaries",
            type: "fill",
            source: "community-data",
            paint: {
              "fill-color": "#00FF00", // Bright green for debugging
              "fill-opacity": 0.5,
              "fill-outline-color": "#000000",
            },
          });
          console.log("CommunityLayer: Added layer 'community-boundaries'.");
        } else {
          (map.getSource("community-data") as mapboxgl.GeoJSONSource).setData(data);
          console.log("CommunityLayer: Updated source 'community-data'.");
        }
      })
      .catch((err) => console.error("CommunityLayer: Error loading GeoJSON:", err));

    // Attach a click handler if provided.
    if (onFeatureClick) {
      const clickHandler = (e: mapboxgl.MapLayerMouseEvent) => {
        const feature = e.features && e.features[0];
        if (feature) onFeatureClick(feature);
      };
      map.on("click", "community-boundaries", clickHandler);
      console.log("CommunityLayer: Click handler attached.");
      return () => {
        map.off("click", "community-boundaries", clickHandler);
        console.log("CommunityLayer: Click handler removed on cleanup.");
      };
    }
  }, [map, mapLoaded, geojsonUrl, onFeatureClick]);

  return null;
};
