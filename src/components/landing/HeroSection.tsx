"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
}

// Hero images array
const heroImages: HeroImage[] = [
  {
    src: "/images/hero/NG-cmapping-homepage-5-04.jpg",
    alt: "Port Harcourt waterfront community",
  }
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImages[currentImageIndex].src}
          alt={heroImages[currentImageIndex].alt}
          fill
          className="object-cover"
          priority
        />
        {/* Reduced Dark Overlay */}
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
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
            </svg>
          </button>
          <p className="text-sm font-bold">Play Intro</p>
        </div>

        {/* Start Exploring Buttons (Pushed Further Down & Slightly Smaller Box) */}
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

      {/* Video Modal */}
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
