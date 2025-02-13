"use client"; // Enables React Server Components with client-side interactivity.

interface RightPanelProps {
  isOpen: boolean; // Boolean prop to control whether the right panel is visible or hidden.
}

export default function RightPanel({ isOpen }: RightPanelProps) {
  return (
    <div
      className={`absolute top-0 right-0 h-full bg-white shadow-lg transition-all duration-500 z-40 ${
        isOpen ? "w-[400px]" : "w-0 overflow-hidden"
      }`}
      aria-hidden={!isOpen} // Accessibility: Marks the panel as hidden when closed, useful for screen readers.
    >
      {/* Conditional rendering: Only render the content when the panel is open */}
      {isOpen && (
        <div className="w-[400px] h-full px-6 py-8">
          {/* Panel Header */}
          <h2 className="text-xl font-bold">Explore Stories & Data</h2>

          {/* Tab Navigation - Switch Between Stories and Data */}
          <div className="flex mt-4 border-b">
            {/* Stories Tab */}
            <button className="w-1/2 py-2 font-semibold text-gray-700 border-b-2 border-green-500">
              Stories
            </button>
            {/* Data Tab */}
            <button className="w-1/2 py-2 font-semibold text-gray-700 hover:border-green-500">
              Data
            </button>
          </div>

          {/* Filters Section */}
          <div className="mt-6">
            {/* Theme Filter Dropdown */}
            <label className="text-gray-700 text-sm font-semibold block">Themes</label>
            <select className="w-full mt-2 p-2 border rounded-md text-gray-700">
              <option>All Themes</option>
              <option>Environment</option>
              <option>Infrastructure</option>
              <option>Community</option>
            </select>

            {/* Media Type Filter Dropdown */}
            <label className="text-gray-700 text-sm font-semibold block mt-4">Media Type</label>
            <select className="w-full mt-2 p-2 border rounded-md text-gray-700">
              <option>All Media</option>
              <option>Text</option>
              <option>Audio</option>
              <option>Video</option>
            </select>
          </div>

          {/* Placeholder Content - Informational Text */}
          <div className="mt-6">
            <p className="text-gray-600">
              This panel will display stories, data, and interactive content related to the map.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
