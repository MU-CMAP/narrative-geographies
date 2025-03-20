"use client";
/**
 * AppContext.tsx
 * 
 * This file implements a global state management system using React Context API.
 * It provides centralized state that can be accessed by components throughout the application,
 * preventing the need for prop drilling and ensuring consistency across the UI.
 * 
 * The context includes state for:
 *  - Current app mode (STORIES or DATA)
 *  - Panel visibility states
 *  - Selected items (communities, themes, etc.)
 *  - Map view configuration
 *  - Filter settings for stories
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define all the types used in our context
export type AppMode = 'STORIES' | 'DATA';
export type MediaType = 'video' | 'audio' | 'image' | 'article' | 'all';

// MapView type defines the map's center coordinates and zoom level
export type MapView = { 
  center: [number, number]; 
  zoom: number;
};

// FilterSettings type defines the criteria used to filter stories
export interface FilterSettings {
  theme: string | null;
  mediaType: MediaType;
  dateRange: [Date | null, Date | null]; // [startDate, endDate]
}

// Community type defines the structure of a community object
export interface Community {
  _id: string;
  name: string;
  description?: string;
  boundaries?: any; // GeoJSON boundary data
}

// Theme type defines the structure of a theme object
export interface Theme {
  _id: string;
  name: string;
  description?: string;
}

// Character type defines the structure of a character object
export interface Character {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

// Story type defines the structure of a story object
export interface Story {
  _id: string;
  title: string;
  description?: string;
  mediaType: MediaType;
  location?: [number, number]; // [longitude, latitude]
  community?: { _id: string; name: string };
  theme?: { _id: string; name: string };
  character?: { _id: string; name: string };
}

// Define the complete context type with all state variables and their setter functions
interface AppContextType {
  // App mode (STORIES or DATA)
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  
  // Panel visibility states
  leftPanelOpen: boolean;
  setLeftPanelOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  
  // Selected items
  selectedCommunity: Community | null;
  setSelectedCommunity: (community: Community | null) => void;
  selectedTheme: Theme | null;
  setSelectedTheme: (theme: Theme | null) => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
  selectedStory: Story | null;
  setSelectedStory: (story: Story | null) => void;
  
  // Map view configuration
  mapView: MapView;
  setMapView: (view: MapView) => void;
  
  // Filter settings for stories
  filters: FilterSettings;
  setFilters: (filters: FilterSettings) => void;
  updateFilter: <K extends keyof FilterSettings>(key: K, value: FilterSettings[K]) => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Default values for the map view (centered on Port Harcourt)
const defaultMapView = { center: [7.0498, 4.7676] as [number, number], zoom: 12 };

// Default filter settings
const defaultFilters: FilterSettings = {
  theme: null,
  mediaType: 'all',
  dateRange: [null, null],
};

// Create the context with undefined as default value (will be set by provider)
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * AppProvider component that wraps the application and provides the global state.
 * 
 * @param children - The child components that will have access to the context
 */
export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // App mode state
  const [mode, setMode] = useState<AppMode>('STORIES');
  
  // Panel visibility states
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  
  // Selected items states
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  // Map view configuration
  const [mapView, setMapView] = useState<MapView>(defaultMapView);
  
  // Filter settings
  const [filters, setFilters] = useState<FilterSettings>(defaultFilters);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Helper function to update a specific filter
  const updateFilter = <K extends keyof FilterSettings>(key: K, value: FilterSettings[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Provide the context value to all child components
  return (
    <AppContext.Provider value={{
      // App mode
      mode,
      setMode,
      
      // Panel visibility
      leftPanelOpen,
      setLeftPanelOpen,
      rightPanelOpen,
      setRightPanelOpen,
      
      // Selected items
      selectedCommunity,
      setSelectedCommunity,
      selectedTheme,
      setSelectedTheme,
      selectedCharacter,
      setSelectedCharacter,
      selectedStory,
      setSelectedStory,
      
      // Map configuration
      mapView,
      setMapView,
      
      // Filter settings
      filters,
      setFilters,
      updateFilter,
      
      // Loading state
      isLoading,
      setIsLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use the app context.
 * Throws an error if used outside of a provider.
 * 
 * @returns The AppContext value
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};