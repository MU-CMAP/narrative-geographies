"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../ui/Menu';

interface LayoutProps {
  children: React.ReactNode;
  isLandingPage?: boolean;
  showDataStoriesTabs?: boolean;
}

const Layout = ({ children, isLandingPage = false, showDataStoriesTabs = true }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-8 left-8 z-50 w-8 h-8 flex flex-col justify-center gap-1.5"
      >
        <span className="w-full h-0.5 bg-white block"></span>
        <span className="w-full h-0.5 bg-white block"></span>
        <span className="w-full h-0.5 bg-white block"></span>
      </button>

      {/* Logo */}
      {isLandingPage ? (
        <div className="fixed top-8 left-20 z-50">
          {/* Four-line logo for landing page */}
          <Image 
            src="/logos/chicocoradio-4_line-logo-w_on_b.svg"
            alt="Chicoco Maps"
            width={120}
            height={120}
            className="w-auto h-20"
            priority
          />
        </div>
      ) : (
        <div className="fixed left-8 bottom-20 z-50 rotate-[-90deg] origin-left">
          {/* Single-line logo for other pages */}
          <Image 
            src="/logos/chicocoradio-1_line-logo-w_on_b.svg"
            alt="Chicoco Maps"
            width={200}
            height={200}
            className="w-auto h-8"
            priority
          />
        </div>
      )}

      {/* Data/Stories Tabs */}
      {showDataStoriesTabs && !isLandingPage && (
        <div className="fixed top-8 right-8 z-50 flex gap-4">
          <Link 
            href="/stories" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            STORIES
          </Link>
          <Link 
            href="/data" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            DATA
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className={`relative ${isLandingPage ? 'h-screen' : 'min-h-screen'}`}>
        {children}
      </main>

      {/* Menu Component */}
      <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </div>
  );
};

export default Layout;