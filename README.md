# Narrative Geographies
**A community-driven mapping and storytelling platform**

## Project Overview
Narrative Geographies is an interactive platform that brings mapping, multimedia storytelling, and data visualization together to highlight the lives, challenges, and resilience of waterfront communities in Port Harcourt.

This platform integrates:
- **Interactive Maps** – Explore communities with geospatial data overlays
- **Storytelling Module** – Multimedia stories linked to real locations
- **Dynamic Data Views** – Infrastructure, demographics, and key statistics
- **Responsive Design** – Optimized for web and mobile use

## Technology Stack
- **Frontend**: React.js with Next.js
- **Styling**: Tailwind CSS
- **Mapping**: Mapbox / Leaflet.js with QGIS data
- **Backend**: Strapi or a custom Node.js API
- **Hosting**: Hostinger (MVP), with potential migration to Vercel/Netlify

## Project Structure
```
/narrative-geographies
│── src/
│   ├── app/           # Next.js App Router Components
│   ├── components/    # Reusable UI Components
│   ├── pages/         # Static Pages
│   ├── styles/        # Tailwind CSS Styles
│── public/            # Static Assets (Images, Icons)
│── .gitignore         # Ignored Files
│── next.config.js     # Next.js Configuration
│── tailwind.config.js # Tailwind Setup
│── README.md         # Project Documentation
```

## Setup & Development
### Clone the Repository
```bash
git clone https://github.com/MU-CMAP/narrative-geographies.git
cd narrative-geographies
```

### Run the Development Server
```bash
npm install
npm run dev
```
Visit http://localhost:3000 to view the project.

## Project Status
- **MVP Development Phase**: Setting up homepage and interactive mapping module
- **Next Steps**: Implementing storytelling navigation and dynamic data views