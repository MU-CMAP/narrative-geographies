/**
 * Menu.tsx
 *
 * This component renders the left panel menu. When a community link is clicked,
 * it attempts to smoothly scroll the page to the map section (an element with id="map").
 * If no such element is found, a warning is logged to the console.
 *
 * NOTE: Ensure that your map section contains an element with id="map" for smooth scrolling.
 *
 * Environment: src/components/ui/Menu.tsx
 * Usage: This component is invoked via the menu burger in the parent.
 */

"use client"; // Enables React Client-Side interactivity

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Define the prop types for the Menu component.
interface MenuProps {
  isOpen: boolean;     // True if the menu is open/visible.
  onClose: () => void; // Callback function to close the menu.
}

// Placeholder arrays for demonstration purposes.
// These will eventually be replaced with dynamic CMS-driven data.
const placeholderCommunities = [
  "Darick Polo",
  "Amatari Polo",
  "Ibiapu Polo",
  "Firisika Polo",
  "Belema Polo",
  "Afikpo Waterfront",
  "Akwuzu Waterfront",
];

const placeholderThemes = [
  "Electricity",
  "Daily Life",
  "Tenancy",
  "Development",
  "Sanitation",
];

const placeholderCharacters = [
  { name: "Favour's Story", color: "bg-pink-600" },
  { name: "Imanny's Story", color: "bg-purple-600" },
  { name: "Michael's Story", color: "bg-blue-600" },
  { name: "Tammy's Story", color: "bg-green-600" },
  { name: "Tari's Story", color: "bg-yellow-600" },
  { name: "Chidi's Story", color: "bg-red-600" },
  { name: "Joy's Story", color: "bg-orange-600" },
  { name: "Emeka's Story", color: "bg-teal-600" },
];

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false); // Local state to track visibility.
  const pathname = usePathname(); // Retrieves the current route path.

  // Effect to toggle component visibility based on the isOpen prop.
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Wait for the exit animation.
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Do not render the menu if it's not visible.
  if (!isVisible && !isOpen) return null;

  // Handles click on the "About" button.
  const handleAboutClick = () => {
    if (pathname === "/") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    } else {
      window.location.href = "/#about";
    }
  };

  return (
    <div
      className={`
        fixed top-0 left-[60px] h-screen w-[calc(100%-60px)] z-50
        transform transition-transform duration-300
        bg-black bg-opacity-90 border-l border-gray-700
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/**
       * Close button ("X") in the top-left corner.
       * Note: In the final implementation, the "X" will replace the menu burger when expanded.
       */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 w-8 h-8 text-white hover:text-gray-300 transition"
      >
        ✕
      </button>

      <div className="flex flex-row h-full w-full font-gotham text-white">
        {/** LEFT COLUMN: Navigation and footer */}
        <div className="w-1/3 flex flex-col justify-between px-8 py-10">
          <div>
            {/* "Explore" heading */}
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-wide">
              Explore
            </h2>

            {/* "All communities" subheading */}
            <p className="text-xl font-bold mb-3 uppercase tracking-wide">
              All communities
            </p>

            {/* Community list */}
            <ul className="ml-2 space-y-2">
              {placeholderCommunities.map((community) => (
                <li key={community} className="flex items-center gap-2">
                  {/* Placeholder for community boundary icon */}
                  <span className="text-base">🔲</span>
                  <button
                    onClick={() => {
                      // Attempt to scroll smoothly to the map section.
                      const mapSection = document.getElementById("map");
                      if (mapSection) {
                        mapSection.scrollIntoView({ behavior: "smooth" });
                      } else {
                        console.warn(
                          "Map section element with id 'map' not found."
                        );
                      }
                      console.log(`Selected community: ${community}`);
                      onClose(); // Close the menu after scrolling.
                    }}
                    className="text-base font-medium hover:text-gray-300 transition"
                  >
                    {community}
                  </button>
                </li>
              ))}
            </ul>

            {/* About link */}
            <div className="mt-8">
              <button
                onClick={handleAboutClick}
                className="text-lg font-normal hover:text-gray-300 transition"
              >
                About
              </button>
            </div>

            {/* Themes heading */}
            <h3 className="mt-8 text-sm font-bold text-gray-400 uppercase tracking-wide">
              Themes
            </h3>
            <ul className="ml-2 space-y-2 mt-2">
              {placeholderThemes.map((theme) => (
                <li key={theme}>
                  <button
                    onClick={() => {
                      console.log(`Selected theme: ${theme}`);
                      onClose();
                    }}
                    className="text-base font-normal hover:text-gray-300 transition"
                  >
                    {theme}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Separator line above the footer */}
          <hr className="my-4 border-gray-600" />

          {/* FOOTER */}
          <div className="text-xs text-gray-300 leading-5">
            <div className="flex items-center gap-1 mb-1">
              <span>📍</span>
              <span>4c Onueza Close, Port Harcourt, Rivers State, Nigeria</span>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <span>✉</span>
              <span>info@cmapping.net</span>
            </div>
            <div className="mt-2">
              <a href="/privacy" className="underline hover:text-white mr-3">
                Privacy
              </a>
              <a href="/terms" className="underline hover:text-white">
                Terms
              </a>
            </div>
            <p className="mt-2 text-[0.7rem]">
              © CMAP 2019. All rights reserved.
            </p>
          </div>
        </div>

        {/** RIGHT COLUMN: Character blocks */}
        <div className="w-2/3 overflow-y-auto">
          <div className="grid grid-cols-2 gap-0">
            {placeholderCharacters.map((char) => (
              <div
                key={char.name}
                className={`relative aspect-[4/3] ${char.color} overflow-hidden`}
              >
                {/* Character name in bottom-left */}
                <span className="absolute bottom-2 left-2 text-white font-bold text-lg uppercase">
                  {char.name}
                </span>
                {/* "Explore >" link in bottom-right */}
                <button
                  onClick={() => {
                    console.log(`Explore clicked for: ${char.name}`);
                    onClose();
                  }}
                  className="absolute bottom-2 right-2 text-white font-medium text-sm uppercase hover:underline"
                >
                  Explore &gt;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
