import "./globals.css";
import "../styles/fonts.css";

export const metadata = {
  title: "Narrative Geographies",
  description: "Mapping Port Harcourt's waterfront communities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}