// src/components/explore/ExploreSection.tsx
"use client";

import { useState } from "react";
import { BaseMap } from "./map/BaseMap";
import { CommunityLayer } from "./map/CommunityLayer";
import StructureLayer from "./map/StructureLayer";
import StoryLayer from "./map/StoryLayer";
import RightPanel from "./RightPanel";
import { useAppContext } from "../../context/AppContext";

/**
 * ExploreSection component
 * 
 * This is the main container for the interactive map exploration section.
 * It uses the global AppContext to manage state for:
 * - Current mode (STORIES/DATA)
 * - Panel visibility
 * - Welcome box visibility
 * 
 * It conditionally renders map layers based on the current mode.
 */
export default function ExploreSection() {
  // Access global app context
  const { 
    mode, 
    setMode,
    rightPanelOpen, 
    setRightPanelOpen
  } = useAppContext();
  
  // State for welcome box visibility (local state since it's UI-specific)
  const [showWelcomeBox, setShowWelcomeBox] = useState(true);
  
  // Story marker click handler
  const handleStoryClick = (feature: GeoJSON.Feature) => {
    console.log("Story clicked:", feature.properties);
    // In the future, this will set the selected story in global state
    // and trigger the right panel to show story details
    setRightPanelOpen(true);
  };

  return (
    <div className="relative h-screen w-full bg-gray-200">
      {/* Control Panel: Stories/Data Icons & Expand Button */}
      <div
        className={`absolute top-5 right-5 z-50 flex items-stretch transition-transform duration-500 ${
          rightPanelOpen ? "-translate-x-[400px]" : "translate-x-0"
        }`}
      >
        <div className="flex mr-6">
          {/* STORIES Icon Button */}
          <button
            onClick={() => {
              console.log("Setting mode to STORIES");
              setMode("STORIES");
            }}
            className={`flex items-center gap-2 px-4 py-1 text-sm font-bold transition-all ${
              mode === "STORIES"
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M10 14h10M4 14h3m-3 4h16"
              />
            </svg>
            STORIES
          </button>
          {/* DATA Icon Button */}
          <button
            onClick={() => {
              console.log("Setting mode to DATA");
              setMode("DATA");
            }}
            className={`flex items-center gap-2 px-4 py-1 text-sm font-bold transition-all ${
              mode === "DATA"
                ? "bg-gray-600 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 6.5a7.5 2.5 0 100 0 7.5 2.5 0 000 0z" />
              <path d="M4.5 6.5V17.5c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5V6.5" />
            </svg>
            DATA
          </button>
        </div>
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all"
        >
          {rightPanelOpen ? ">" : "<"}
        </button>
      </div>

      {/* Welcome Box that moves along with the control panel */}
      {showWelcomeBox && (
        <div
          className={`absolute top-20 right-5 z-50 bg-black text-white p-4 shadow-lg transition-transform duration-500 ${
            rightPanelOpen ? "-translate-x-[400px]" : "translate-x-0"
          }`}
          style={{ width: "287px" }}
        >
          <h3 className="text-lg font-bold uppercase">WELCOME TO OUR CITY</h3>
          <p className="text-sm mt-2">
            Zoom in to explore community stories or switch to data view to
            discover more about infrastructure and residents.
          </p>
          <button
            onClick={() => setShowWelcomeBox(false)}
            className="mt-3 text-xs bg-gray-700 px-3 py-1 hover:bg-gray-600 transition shadow-md"
          >
            HIDE
          </button>
        </div>
      )}

      {/* Integrated Map */}
      <div className="absolute inset-0">
        <BaseMap>
          <CommunityLayer />
          <StructureLayer />
          <StoryLayer onStoryClick={handleStoryClick} />
        </BaseMap>
      </div>

      {/* Right Panel for Additional Content */}
      <RightPanel isOpen={rightPanelOpen} />
    </div>
  );
}