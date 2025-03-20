/**
 * Mapbox configuration
 * 
 * This file defines the core map settings including styles, center coordinates,
 * zoom levels, and boundary constraints.
 * 
 * Different styles are defined for story mode and data mode, allowing the map
 * appearance to change based on the current view context.
 */

export const MAPBOX_CONFIG = {
  style: 'mapbox://styles/mapbox/light-v11', // Default style
  storyStyle: 'mapbox://styles/mapbox/light-v11', // Used in Story mode 
  dataStyle: 'mapbox://styles/mapbox/streets-v11', // Used in Data mode - make sure this is different
  center: [7.0498, 4.7676] as [number, number], // Port Harcourt coordinates
  zoom: 12,
  bounds: [
    [6.9998, 4.7176] as [number, number], // SW corner
    [7.0998, 4.8176] as [number, number]  // NE corner
  ] as [[number, number], [number, number]]
};