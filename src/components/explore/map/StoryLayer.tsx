/**
 * StoryLayer.tsx
 *
 * This component loads story marker data from a GeoJSON file and adds it as a Mapbox source and layer
 * when the mode prop is "story". In "data" mode, it removes the layer.
 *
 * Debug styling is applied for visibility (bright red circles with increased radius).
 *
 * To avoid the race condition where the style isn’t fully ready when calling addSource,
 * we wrap the addSource call in a try–catch block. If an error occurs indicating "Style is not done loading",
 * we wait for the "style.load" event and then check whether the source already exists before retrying.
 */

"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useMap } from "./BaseMap";

interface StoryLayerProps {
  geojsonUrl?: string;         // URL to fetch the story GeoJSON; defaults provided
  mode: "story" | "data";       // Determines whether the layer should be visible
  onStoryClick?: (feature: GeoJSON.Feature) => void; // Optional callback for marker clicks
}

const StoryLayer: React.FC<StoryLayerProps> = ({
  geojsonUrl = "/geojson/stories/stories.json",
  mode,
  onStoryClick,
}) => {
  const { map, mapLoaded } = useMap();

  useEffect(() => {
    // If the map or style isn’t ready, exit early.
    if (!map || !mapLoaded) {
      console.log("StoryLayer: Map not ready or style not loaded yet.");
      return;
    }
    
    // If mode is not "story", remove any existing story layer and source.
    if (mode !== "story") {
      if (map.getLayer("story-markers")) {
        map.removeLayer("story-markers");
        console.log("StoryLayer: Removed layer 'story-markers' due to mode change.");
      }
      if (map.getSource("stories-data")) {
        map.removeSource("stories-data");
        console.log("StoryLayer: Removed source 'stories-data' due to mode change.");
      }
      return;
    }
    
    console.log("StoryLayer: Map and style are loaded. Executing addStoryLayer().");

    // Define the function that adds (or updates) the source and layer.
    const addStoryLayer = () => {
      fetch(geojsonUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch story GeoJSON: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("StoryLayer: Fetched GeoJSON data:", data);
          // If the source doesn't exist, try to add it.
          if (!map.getSource("stories-data")) {
            console.log("StoryLayer: Attempting to add new source 'stories-data'.");
            try {
              map.addSource("stories-data", { type: "geojson", data });
              console.log("StoryLayer: Successfully added source 'stories-data'.");
            } catch (err) {
              // If we catch an error indicating the style isn’t loaded,
              // wait for "style.load" then check again.
              if (err instanceof Error && err.message.includes("Style is not done loading")) {
                console.log("StoryLayer: Caught 'Style is not done loading' error. Waiting for style.load event and retrying.");
                map.once("style.load", () => {
                  // Before retrying, check if the source now exists.
                  if (!map.getSource("stories-data")) {
                    try {
                      map.addSource("stories-data", { type: "geojson", data });
                      console.log("StoryLayer: Successfully added source 'stories-data' after retry.");
                    } catch (retryErr) {
                      console.error("StoryLayer: Retry failed while adding source:", retryErr);
                      return;
                    }
                  } else {
                    // If the source already exists, update it.
                    (map.getSource("stories-data") as mapboxgl.GeoJSONSource).setData(data);
                    console.log("StoryLayer: Source 'stories-data' already exists on retry; updated data.");
                  }
                  // Proceed to add the layer if it doesn’t exist.
                  if (!map.getLayer("story-markers")) {
                    try {
                      map.addLayer({
                        id: "story-markers",
                        type: "circle",
                        source: "stories-data",
                        layout: { visibility: "visible" },
                        paint: {
                          "circle-radius": 10,          // Debug radius
                          "circle-color": "#FF0000",      // Bright red
                          "circle-stroke-color": "#FFFFFF",
                          "circle-stroke-width": 2,
                        },
                      });
                      console.log("StoryLayer: Added layer 'story-markers' after retry.");
                      if (onStoryClick) {
                        const clickHandler = (e: mapboxgl.MapLayerMouseEvent) => {
                          const feature = e.features && e.features[0];
                          if (feature) onStoryClick(feature);
                        };
                        map.on("click", "story-markers", clickHandler);
                        console.log("StoryLayer: Click handler attached after retry.");
                      }
                    } catch (layerErr) {
                      console.error("StoryLayer: Retry failed while adding layer:", layerErr);
                    }
                  }
                });
                return; // Exit current attempt; retry will handle the addition.
              } else {
                throw err; // Propagate error if it’s not the "style not loaded" error.
              }
            }
            // If we successfully added the source, add the story layer.
            try {
              map.addLayer({
                id: "story-markers",
                type: "circle",
                source: "stories-data",
                layout: { visibility: "visible" },
                paint: {
                  "circle-radius": 10,
                  "circle-color": "#FF0000",
                  "circle-stroke-color": "#FFFFFF",
                  "circle-stroke-width": 2,
                },
              });
              console.log("StoryLayer: Added layer 'story-markers'.");
              if (onStoryClick) {
                const clickHandler = (e: mapboxgl.MapLayerMouseEvent) => {
                  const feature = e.features && e.features[0];
                  if (feature) onStoryClick(feature);
                };
                map.on("click", "story-markers", clickHandler);
                console.log("StoryLayer: Click handler attached.");
              }
            } catch (layerErr) {
              console.error("StoryLayer: Error adding layer 'story-markers':", layerErr);
            }
          } else {
            // If the source already exists, update its data.
            (map.getSource("stories-data") as mapboxgl.GeoJSONSource).setData(data);
            console.log("StoryLayer: Updated source 'stories-data'.");
          }
        })
        .catch((err) => console.error("StoryLayer: Error loading story GeoJSON:", err));
    };

    // Call the function to add the story layer.
    addStoryLayer();

    // Cleanup: remove the layer and source on component unmount.
    return () => {
      if (map.getLayer("story-markers")) {
        map.removeLayer("story-markers");
        console.log("StoryLayer: Removed layer 'story-markers' on cleanup.");
      }
      if (map.getSource("stories-data")) {
        map.removeSource("stories-data");
        console.log("StoryLayer: Removed source 'stories-data' on cleanup.");
      }
    };
  }, [map, mapLoaded, geojsonUrl, mode, onStoryClick]);

  return null;
};

export default StoryLayer;
