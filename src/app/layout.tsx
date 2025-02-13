import "./globals.css";
import "../styles/fonts.css";

export const metadata = {
  title: "Narrative Geographies",
  description: "Mapping Port Harcourt's waterfront communities",
};

/**
 * ✅ Root Layout Component
 * - Defines the overall structure of the application.
 * - Uses Next.js's App Router conventions.
 * - Ensures no unintended whitespace to avoid hydration errors.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">{/* ✅ Defines the document language */}
      <body className="antialiased">{/* ✅ Applies smooth font rendering */}
        {children} {/* ✅ Renders the page content dynamically */}
      </body>
    </html>
  );
}