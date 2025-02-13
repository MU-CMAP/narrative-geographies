"use client"; // Enables React Server Components with client-side interactivity.

import Link from "next/link"; // Next.js component for client-side navigation.
import { useEffect, useState } from "react"; // React hooks for state management and side effects.
import { usePathname } from "next/navigation"; // Next.js hook to get the current page pathname.

interface MenuProps {
  isOpen: boolean; // Controls whether the menu is open or closed.
  onClose: () => void; // Callback function to close the menu.
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const [isVisible, setIsVisible] = useState(false); // State to track visibility of the menu.
  const pathname = usePathname(); // Retrieves the current route path.

  // Effect to handle menu visibility when `isOpen` changes.
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Make menu visible when opening.
    } else {
      setTimeout(() => setIsVisible(false), 300); // Wait for animation to finish before hiding.
    }
  }, [isOpen]);

  // Prevents rendering when `isVisible` is false and `isOpen` is also false (improves performance).
  if (!isVisible && !isOpen) return null;

  // Handles About button click behavior.
  const handleAboutClick = () => {
    if (pathname === "/") {
      // If already on the homepage, scroll smoothly to the About section.
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
        onClose(); // Close the menu after scrolling.
      }
    } else {
      // If on another page, navigate to the homepage and scroll to About.
      window.location.href = "/#about";
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center transition-transform duration-300 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {/* Close Button (Top-Right) */}
      <button onClick={onClose} className="absolute top-8 right-8 w-8 h-8 text-white hover:text-gray-400 transition">
        ✕
      </button>

      {/* Menu Links (Navigation Options) */}
      <nav className="flex flex-col gap-8 text-2xl text-white font-bold">
        {/* Navigate to the Explore page and close the menu */}
        <Link href="/explore" className="hover:text-gray-300 transition" onClick={onClose}>
          Explore
        </Link>

        {/* Navigate to the Themes page and close the menu */}
        <Link href="/themes" className="hover:text-gray-300 transition" onClick={onClose}>
          Themes
        </Link>

        {/* Scroll to About section on homepage or navigate to it if on another page */}
        <button onClick={handleAboutClick} className="hover:text-gray-300 transition">
          About
        </button>

        {/* Navigate to the Contact page and close the menu */}
        <Link href="/contact" className="hover:text-gray-300 transition" onClick={onClose}>
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Menu;
