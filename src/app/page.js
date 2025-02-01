import Layout from '../components/layout/Layout';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout isLandingPage={true}>
      <div className="relative h-screen w-full flex flex-col items-center justify-between">
{/* Hero Background - temporary solid color */}
<div className="absolute inset-0 z-0 bg-gray-900">
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay for text legibility */}
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-32 px-8">
          {/* Center Content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
              THIS IS OUR CITY. WE ARE TELLING OUR STORIES TO CHANGE LIVES AND SHAPE OUR COMMUNITIES.
            </h1>
            
            {/* Play Button */}
            <button className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
              </svg>
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4">
            <button className="text-xl hover:underline">
              START EXPLORING
            </button>
            <span className="text-sm">or</span>
            <button className="text-lg hover:underline">
              Find out more
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}