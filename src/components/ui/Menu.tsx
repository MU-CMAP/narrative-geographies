"use client";

import Link from 'next/link';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: 'Explore', href: '/explore' },
    { label: 'Communities', href: '/communities' },
    { label: 'Themes', href: '/themes' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 left-8 w-8 h-8 flex flex-col justify-center items-center"
      >
        <span className="w-8 h-0.5 bg-white rotate-45 absolute"></span>
        <span className="w-8 h-0.5 bg-white -rotate-45 absolute"></span>
      </button>

      {/* Menu Content */}
      <nav className="h-full flex flex-col justify-center items-center gap-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-3xl md:text-4xl text-white hover:text-gray-300 transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Menu;