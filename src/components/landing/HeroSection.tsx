"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
}

/**
 * HeroSection.tsx
 * 
 * This component renders the main landing page hero section with:
 * - Rotating background images that change every 5 seconds
 * - "Play Intro" button for launching an intro video
 * - Navigation buttons for exploring the map or learning more
 * 
 * The component handles:
 * - Image rotation through useState and useEffect
 * - Video modal interactions with fullscreen capability
 * - Smooth scrolling to other sections
 */
const HeroSection = () => {
  // State to track the currently displayed image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to control video modal visibility
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  // Reference to the video element for controlling playback
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Array of hero background images to rotate through
  const heroImages: HeroImage[] = [
    {
      src: "/images/hero/NG-cmapping-homepage-5-04.jpg",
      alt: "Port Harcourt waterfront community",
    },
    {
      src: "/images/hero/waterfront-community-1.jpg",
      alt: "Waterfront housing structures",
    },
    {
      src: "/images/hero/waterfront-community-2.jpg",
      alt: "Community mapping session",
    },
    {
      src: "/images/hero/waterfront-community-3.jpg",
      alt: "Aerial view of Port Harcourt",
    },
    {
      src: "/images/hero/waterfront-community-4.jpg",
      alt: "Community members storytelling",
    }
  ];

  // Effect for image rotation - runs when component mounts
  useEffect(() => {
    // Set up interval to change images every 5 seconds (5000ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Calculate next index, wrapping back to 0 when reaching the end
        return (prevIndex + 1) % heroImages.length;
      });
    }, 5000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [heroImages.length]); // Dependency array includes heroImages.length to prevent unnecessary re-renders

  // Function to open video in full screen and auto-play
  const playVideo = () => {
    setIsVideoOpen(true);

    setTimeout(() => {
      if (videoRef.current) {
        const video = videoRef.current;

        // Request fullscreen with better error handling
        const requestFullScreen = (
          video.requestFullscreen ||
          video.webkitRequestFullscreen ||
          video.msRequestFullscreen ||
          (() => Promise.reject("Fullscreen not supported"))
        ).bind(video);

        requestFullScreen()
          .then(() => video.play())
          .catch(err => console.warn("Fullscreen or autoplay failed:", err));
      }
    }, 200);
  };

  // Function to close the video and scroll to Explore section
  const closeVideoAndScroll = () => {
    setIsVideoOpen(false);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image - dynamically changes based on currentImageIndex */}
      <div className="absolute inset-0">
        <Image
          src={heroImages[currentImageIndex].src}
          alt={heroImages[currentImageIndex].alt}
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        {/* Semi-transparent overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-48 px-8 text-white">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          {/* Small Welcome Text */}
          <h3 className="text-lg font-bold uppercase mt-20">WELCOME TO PORT HARCOURT</h3>

          {/* Hero Text */}
          <h1 className="text-3xl md:text-4xl font-bold max-w-3xl">
            THIS IS OUR CITY. WE ARE TELLING OUR STORIES TO CHANGE LIVES AND SHAPE OUR COMMUNITIES.
          </h1>

          {/* Play Button & 'Play Intro' Label */}
          <button
            onClick={playVideo}
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#A8D34F] flex items-center justify-center hover:bg-[#B7E05A] transition-colors"
            aria-label="Play introduction video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
            </svg>
          </button>
          <p className="text-sm font-bold">Play Intro</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-3 mt-32 md:mt-48">
          <button 
            onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })} 
            className="text-sm md:text-md bg-gray-500 px-4 py-2 rounded-md text-white hover:bg-gray-400 transition"
          >
            START EXPLORING
          </button>
          <button 
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} 
            className="text-xs hover:underline flex items-center gap-1"
          >
            Find out more <span className="text-lg">&gt;</span>
          </button>
        </div>
      </div>

      {/* Video Modal - Only renders when isVideoOpen is true */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          {/* Video Player */}
          <video ref={videoRef} controls className="w-full h-full object-cover">
            <source src="/videos/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* SKIP Button */}
          <button
            onClick={closeVideoAndScroll}
            className="absolute top-5 right-5 bg-gray-600 text-white px-4 py-2 rounded-md shadow-md text-lg font-bold hover:bg-gray-500 transition"
          >
            SKIP
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;