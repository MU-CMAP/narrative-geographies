<<<<<<< HEAD
### **How to Edit `README.md`**  
1️⃣ **Open the file in VS Code:**  
   ```bash
   code README.md
   ```
2️⃣ **Copy and paste the following content into `README.md`:**  

---

## **Narrative Geographies** 🌍  
**A community-driven mapping and storytelling platform**  

### **Project Overview**  
Narrative Geographies is an interactive platform that brings **mapping, multimedia storytelling, and data visualization** together to highlight the lives, challenges, and resilience of waterfront communities in Port Harcourt.  

This platform integrates:  
✅ **Interactive Maps** – Explore communities with geospatial data overlays.  
✅ **Storytelling Module** – Multimedia stories linked to real locations.  
✅ **Dynamic Data Views** – Infrastructure, demographics, and key statistics.  
✅ **Responsive Design** – Optimized for web and mobile use.  

### **Technology Stack**  
- **Frontend**: React.js with Next.js  
- **Styling**: Tailwind CSS  
- **Mapping**: Mapbox / Leaflet.js with QGIS data  
- **Backend**: Strapi or a custom Node.js API  
- **Hosting**: Hostinger (MVP), with potential migration to Vercel/Netlify  

### **Project Structure**  
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
│── README.md          # Project Documentation  
```

### **Setup & Development**  
#### **Clone the Repository**  
```bash
git clone https://github.com/MU-CMAP/narrative-geographies.git
cd narrative-geographies
```
#### **Run the Development Server**  
```bash
npm install
npm run dev
```
Visit **[http://localhost:3000](http://localhost:3000)** to view the project.  

### **Project Status**  
🚀 **MVP Development Phase**: Setting up homepage and interactive mapping module.  
🔜 **Next Steps**: Implementing storytelling navigation and dynamic data views.  

---

3️⃣ **Save the file** (`Cmd + S`)  
4️⃣ **Commit and push the changes:**  
```bash
git add README.md
git commit -m "Added README with project description"
git push origin main
```

=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 8d391bc (Initial commit from Create Next App)
