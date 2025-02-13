// src/lib/mapbox/config.ts
export const MAPBOX_CONFIG = {
  style: 'mapbox://styles/mapbox/light-v11', // Default style
  storyStyle: 'mapbox://styles/mapbox/light-v11', // Used in Story mode
  dataStyle: 'mapbox://styles/mapbox/streets-v11', // Used in Data mode
  center: [7.0498, 4.7676], // Port Harcourt coordinates
  zoom: 12,
  bounds: [
  [6.9998, 4.7176], // SW corner
  [7.0998, 4.8176]  // NE corner
  ]
  };