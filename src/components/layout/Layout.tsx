"use client"; // Enables React Server Components with client-side interactivity.

import { useState, useEffect } from "react"; // Importing React hooks for state management and effects.
import Link from "next/link"; // Next.js component for client-side navigation.
import Image from "next/image"; // Next.js component for optimized image rendering.
import Menu from "../ui/Menu"; // Importing the Menu component.

interface LayoutProps {
  children: React.ReactNode; // The main content passed to the layout.
  isLandingPage?: boolean; // Boolean prop to determine if the page is the landing page (default: false).
  showDataStoriesTabs?: boolean; // Boolean prop to control visibility of Data/Stories tabs (default: true).
}

const Layout = ({ children, isLandingPage = false, showDataStoriesTabs = true }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the menu is open.
  const [scrollY, setScrollY] = useState(0); // State to track vertical scroll position.
  const [showBlackBar, setShowBlackBar] = useState(false); // State to control visibility of the left black bar.

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY); // Updates the scroll position state.
      setShowBlackBar(window.scrollY > window.innerHeight * 0.6); // Shows black bar when scrolling past 60% of viewport height.
    };

    window.addEventListener("scroll", handleScroll); // Attaches scroll event listener.
    return () => window.removeEventListener("scroll", handleScroll); // Cleans up event listener on component unmount.
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Menu Button - Toggles the menu open/close */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggles menu state when clicked.
        className="fixed z-50 transition-all duration-700"
        style={{
          left: "2.5%", // Positioning from the left side.
          top: "32px", // Positioned near the top.
          width: showBlackBar ? "16px" : "24px", // Shrinks when black bar is visible.
          height: showBlackBar ? "16px" : "24px", // Shrinks when black bar is visible.
          transform: "translateX(-50%)" // Keeps button properly aligned.
        }}
      >
        {/* Three horizontal lines representing the menu icon */}
        <span className="block w-full h-0.5 bg-white mb-1"></span>
        <span className="block w-full h-0.5 bg-white mb-1"></span>
        <span className="block w-full h-0.5 bg-white"></span>
      </button>

      {/* 4-Line Logo - Fades out when the black bar appears */}
      <div
        className={`fixed top-[32px] left-[6vw] z-50 transition-opacity duration-700 ${
          showBlackBar ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/logos/chicocomaps-4_line-logo-w_on_w.svg" // 4-line logo for larger screens.
          alt="Chicoco Maps"
          width={168}  /* Increased by 40% (originally 120) */
          height={168}  /* Increased by 40% (originally 120) */
          priority
        />
      </div>

      {/* Black Bar - Expands to 5% screen width when visible */}
      <div
        className={`fixed left-0 bottom-0 top-0 bg-black transition-all duration-700 z-40 ${
          showBlackBar ? "w-[5%] opacity-100" : "w-0"
        }`}
        style={{ opacity: 1 }} // Ensures full visibility when active.
      >
        {/* One-Line Logo - Expands and rotates when the black bar appears */}
        <div 
          className="absolute left-[25%] bottom-40 transform -translate-x-1/2 flex justify-center transition-all duration-700"
          style={{
            transform: showBlackBar ? "scale(5) rotate(-90deg)" : "scale(0.6) rotate(-90deg)",
            transition: "transform 0.7s ease-in-out"
          }}
        >
          <Image
            src="/logos/chicocomaps-1_line-logo-w_on_w.svg" // Single-line logo for compact spaces.
            alt="Chicoco Maps"
            width={166}
            height={276}
            priority
          />
        </div>
      </div>

      {/* Data/Stories Tabs - Visible when not on the landing page */}
      {showDataStoriesTabs && !isLandingPage && (
        <div className="fixed top-8 right-8 z-50 flex gap-4">
          <Link href="/stories" className="text-white hover:text-gray-300 transition-colors">STORIES</Link>
          <Link href="/data" className="text-white hover:text-gray-300 transition-colors">DATA</Link>
        </div>
      )}

      {/* Main Content Section */}
      <main className={`relative ${isLandingPage ? "h-screen" : "min-h-screen"}`}>
        {children} {/* Renders the page-specific content */}
      </main>

      {/* Menu Component - Opens and closes with the menu button */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Layout;
