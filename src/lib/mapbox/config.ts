// src/lib/mapbox/config.ts
// This configuration defines our Mapbox settings.
// We explicitly type the center as a tuple [number, number] and
// bounds as a tuple of two such tuples to satisfy Mapbox GL's type requirements.
export const MAPBOX_CONFIG = {
  style: 'mapbox://styles/mapbox/light-v11', // Default style
  storyStyle: 'mapbox://styles/mapbox/light-v11', // Used in Story mode
  dataStyle: 'mapbox://styles/mapbox/streets-v11', // Used in Data mode
  center: [7.0498, 4.7676] as [number, number], // Port Harcourt coordinates
  zoom: 12,
  bounds: [
    [6.9998, 4.7176] as [number, number], // SW corner
    [7.0998, 4.8176] as [number, number]  // NE corner
  ] as [[number, number], [number, number]]
};
