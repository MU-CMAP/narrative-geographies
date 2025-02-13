"use client"; // Enables React Server Components with client-side interactivity.

import { useEffect, useRef } from "react"; // Import React hooks for side effects and DOM references.
import Link from "next/link"; // Next.js component for client-side navigation.

export default function ExplorePage() {
  // Creates a reference to the map container div to manipulate its properties in useEffect.
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Effect runs after component mounts.
    if (mapContainerRef.current) {
      // Sets a temporary background color as a placeholder for the interactive map.
      mapContainerRef.current.style.background = "#e0e0e0"; // Light gray placeholder
    }
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts.

  return (
    <div className="relative h-screen w-full">
      {/* Placeholder for Future Map */}
      <div
        ref={mapContainerRef} // Attaches the reference to this div for manipulation in useEffect.
        className="h-full w-full flex items-center justify-center text-gray-600"
      >
        <p>Map Placeholder - Interactive Map Will Be Here</p> {/* Placeholder text */}
      </div>

      {/* Navigation Button - Returns to Home */}
      <div className="absolute top-5 left-5">
        <Link href="/">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
