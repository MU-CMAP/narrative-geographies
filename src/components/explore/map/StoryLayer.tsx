/**
 * StoryLayer.tsx
 *
 * Loads story marker data from a GeoJSON file and adds it as a Mapbox source and circle layer.
 * In "story" mode, it displays the markers; in "data" mode, it removes them.
 *
 * Debug styling is applied for visibility (bright red circles).
 * 
 * Future CMS Integration Note:
 * - Replace the static geojsonUrl with a dynamic query to the CMS.
 * - Ensure each story feature includes a unique identifier (e.g. story_id) to match CMS records.
 *
 * The addSource logic includes a try–catch block with a retry mechanism to handle cases where
 * the map style isn't fully loaded. Detailed console logs assist in debugging.
 */

"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useMap } from "./BaseMap";

interface StoryLayerProps {
  geojsonUrl?: string;         // URL to fetch the story GeoJSON; to be replaced with CMS-driven data in future
  mode: "story" | "data";       // Determines whether the layer should be visible
  onStoryClick?: (feature: GeoJSON.Feature) => void; // Optional callback for marker clicks
}

const StoryLayer: React.FC<StoryLayerProps> = ({
  geojsonUrl = "/geojson/stories/stories.json",
  mode,
  onStoryClick,
}) => {
  // Retrieve the map instance and the mapLoaded flag from context.
  const { map, mapLoaded } = useMap();

  useEffect(() => {
    // Exit early if the map or style is not yet ready.
    if (!map || !mapLoaded) {
      console.log("StoryLayer: Map not ready or style not loaded yet.");
      return;
    }
    
    // In modes other than "story", remove existing story layers and sources.
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

    // Define a function to fetch GeoJSON data and add/update the story layer.
    const addStoryLayer = () => {
      // Fetch the story GeoJSON data.
      fetch(geojsonUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch story GeoJSON: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("StoryLayer: Fetched GeoJSON data:", data);
          // Check if the source already exists.
          if (!map.getSource("stories-data")) {
            console.log("StoryLayer: Attempting to add new source 'stories-data'.");
            try {
              // Add the source with the fetched data.
              map.addSource("stories-data", { type: "geojson", data });
              console.log("StoryLayer: Successfully added source 'stories-data'.");
            } catch (err) {
              // If style isn't loaded, wait for the "style.load" event and retry.
              if (err instanceof Error && err.message.includes("Style is not done loading")) {
                console.log("StoryLayer: Caught 'Style is not done loading' error. Waiting for style.load event and retrying.");
                map.once("style.load", () => {
                  // On retry, if the source still doesn't exist, add it; otherwise update its data.
                  if (!map.getSource("stories-data")) {
                    try {
                      map.addSource("stories-data", { type: "geojson", data });
                      console.log("StoryLayer: Successfully added source 'stories-data' after retry.");
                    } catch (retryErr) {
                      console.error("StoryLayer: Retry failed while adding source:", retryErr);
                      return;
                    }
                  } else {
                    (map.getSource("stories-data") as mapboxgl.GeoJSONSource).setData(data);
                    console.log("StoryLayer: Source 'stories-data' already exists on retry; updated data.");
                  }
                  // Proceed to add the layer if not already present.
                  if (!map.getLayer("story-markers")) {
                    try {
                      map.addLayer({
                        id: "story-markers",
                        type: "circle",
                        source: "stories-data",
                        layout: { visibility: "visible" },
                        paint: {
                          "circle-radius": 10,
                          "circle-color": "#FF0000",      // Bright red for debug
                          "circle-stroke-color": "#FFFFFF",
                          "circle-stroke-width": 2,
                        },
                      });
                      console.log("StoryLayer: Added layer 'story-markers' after retry.");
                      // Attach click handler if provided.
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
                return; // Exit the current attempt; the retry will handle further actions.
              } else {
                // If error is of a different type, propagate it.
                throw err;
              }
            }
            // If the source is added successfully, add the story layer.
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

    // Call the function to add/update the story layer.
    addStoryLayer();

    // Cleanup: remove the story layer and source when the component unmounts.
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
