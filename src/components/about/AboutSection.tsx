"use client"; // Enables React Server Components with client-side interactivity.

import Image from "next/image"; // Importing Next.js optimized image component.

export default function AboutSection() {
  return (
    <div id="about" className="relative flex flex-col md:flex-row min-h-screen">
      {/* Left Section: Full-Height Image (Responsive for Mobile) */}
      <div className="w-full md:w-1/2 h-64 md:h-screen sticky top-0 left-0">
        <Image
          src="/images/about/placeholder_chicoco_maps.jpg"
          alt="Community Mapping in Port Harcourt"
          fill
          style={{ objectFit: 'cover' }}
          className="shadow-none"
          priority
        />
      </div>

      {/* Right Section: Scrolling Content Area */}
      <div className="w-full md:w-1/2 ml-auto h-auto md:h-screen overflow-y-auto bg-white text-black">
        <div className="py-16 px-6 md:px-10">
          {/* Section Title */}
          <h1 className="text-3xl font-bold uppercase">ABOUT</h1>

          {/* Descriptive Paragraphs */}
          <p className="text-lg font-serif mt-4 leading-relaxed">
            CHICOCO MAPS allows residents of Port Harcourt’s informal waterfront settlements to give voice to their vision of the city, 
            to literally put themselves on the map.
          </p>
          <p className="text-lg font-serif mt-3 leading-relaxed">
            480,000 people live in settlements along the creeks that fringe the city. All live under the threat of forced eviction, 
            none feature on municipal maps, nor in the plans drawn up for the city’s development.
          </p>
          <p className="text-lg font-serif mt-3 leading-relaxed">
            Our programme shares with young people in these communities the skills and tools to participate in the mapping and 
            planning of their neighbourhoods.
          </p>
          <p className="text-lg font-serif mt-3 leading-relaxed">
            Residents gather and visualise a broad range of information including location, population, topography, land use, tenure, 
            employment, services, health, and governance.
          </p>

          {/* Highlighted Quote Section */}
          <h2 className="text-3xl font-bold uppercase mt-10 leading-snug pl-6 md:pl-10 border-l-4 border-green-600">
            “EVERYWHERE YOU SEE HERE IS GREEN SPACE ON GOVERNMENT MAPS, AS IF NO ONE LIVES HERE. 
            BUT PEOPLE LIVE HERE. WE LIVE HERE. AND WE ARE PUTTING OURSELVES ON THE MAP.”
          </h2>
          <p className="text-lg font-semibold mt-3 text-gray-700 pl-6 md:pl-10">— Marcus George, Amatari Polo</p>

          {/* Secondary Image with Caption */}
          <div className="mt-10">
            <Image
              src="/images/about/placeholder_community_mapping.jpg"
              alt="Community mapping workshop"
              width={800}
              height={400}
              className="w-full object-cover shadow-none"
              loading="lazy" // Lazy loading for better performance
            />
            <p className="text-xs text-gray-500 mt-2 text-center">Community mapping session with local residents.</p>
          </div>
        </div>

        {/* Light Grey Section for Call to Action */}
        <div className="w-full bg-gray-100 text-black py-16 px-6 md:px-10">
          <h3 className="text-3xl font-bold">We tell stories that matter.</h3>
          <p className="text-2xl mt-3">To help defend our communities and spark change, please support us.</p>
          {/* Donate Button with aria-label for Accessibility */}
          <button 
            className="mt-6 w-24 h-24 bg-orange-500 text-white text-lg font-semibold rounded-full hover:bg-orange-600 transition"
            aria-label="Donate to support our communities"
          >
            Donate
          </button>
        </div>

        {/* Black Footer Section with More Information */}
        <div className="w-full bg-black text-white py-16 px-6 md:px-10">
          <h4 className="text-lg font-bold">CHICOCO MAPS is part of the HUMAN CITY PROJECT’s Building and Planning programme.</h4>
          <p className="text-md font-serif mt-4 leading-relaxed">
            The Human City Project is working with people in Port Harcourt’s waterfront settlements so that they can build better, 
            plan together.
          </p>
          <p className="text-md font-serif mt-3 leading-relaxed">
            These programmes support community efforts not only to give voice to their vision of the city’s future, but also to describe 
            and detail that vision in maps and action plans, and to realise those plans through the creation of civic buildings and 
            public spaces - to transform the way that the city is planned and built.
          </p>
          <p className="text-md font-serif mt-3">
            To learn more about HUMAN CITY PROJECT’s Building and Planning, Communicating and Campaigning, and Human Rights Action and Research programmes visit: 
            <a href="http://www.cmapping.net" target="_blank" className="text-green-400 hover:text-green-500" aria-label="Visit the Human City Project website">
              www.cmapping.net
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
