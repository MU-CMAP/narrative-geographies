import Layout from "../components/layout/Layout";
import HeroSection from "../components/landing/HeroSection";
import ExploreSection from "../components/explore/ExploreSection";
import AboutSection from "../components/about/AboutSection";

/**
 * ✅ Homepage Component
 * - Wraps all sections within the global Layout.
 * - Includes key sections: Hero, Explore, and About.
 * - Uses Tailwind CSS for spacing and layout adjustments.
 */
export default function Home() {
  return (
    <Layout isLandingPage={true}> {/* ✅ Passes a flag to indicate this is the landing page */}
      <main className="relative"> {/* ✅ Wrapper to allow for positioning of page sections */}
        
        {/* 🏠 Hero Section - Displays the main introduction */}
        <HeroSection />

        {/* 🔎 Explore Section - Scroll Target for interactive mapping */}
        <div id="explore" className="min-h-screen bg-gray-200 flex items-center justify-center">
          <ExploreSection />
        </div>

        {/* ℹ️ About Section - Provides project background information */}
        <div id="about" className="min-h-screen bg-white flex items-center justify-center">
          <AboutSection />
        </div>
      </main>
    </Layout>
  );
}