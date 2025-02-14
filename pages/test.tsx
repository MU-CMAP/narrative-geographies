// pages/test.tsx
/**
 * TestPage.tsx
 *
 * This page component tests the Sanity client configuration by
 * fetching content from the Sanity CMS and displaying it.
 *
 * Environment variables (set in .env.local) used by the Sanity client:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID: "qh3wukbx"
 * - NEXT_PUBLIC_SANITY_DATASET: "production"
 * - NEXT_PUBLIC_SANITY_API_VERSION: "2021-10-21"
 * - NEXT_PUBLIC_SANITY_TOKEN: (optional, if needed)
 *
 * This page performs a simple GROQ query to fetch all community records.
 * The results are logged to the console and displayed in a <pre> block.
 */

import React, { useEffect, useState } from "react";
import { client } from "../src/lib/sanityClient"; // Correct path

// Define a TypeScript interface for the community data we expect.
interface Community {
  _id: string;
  name: string;
  description?: string;
}

const TestPage: React.FC = () => {
  // State to store fetched data and any error that occurs.
  const [data, setData] = useState<Community[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Define a GROQ query to fetch all documents of type "community".
    const query = '*[_type == "community"]{_id, name, description}';

    // Fetch data from Sanity.
    client
      .fetch(query)
      .then((result: Community[]) => {
        console.log("TestPage: Successfully fetched community data:", result);
        setData(result);
      })
      .catch((err) => {
        console.error("TestPage: Error fetching community data:", err);
        setError(err);
      });
  }, []); // Empty dependency array ensures this runs once on component mount.

  // Render error message if an error occurred.
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  // Render a loading state until data is fetched.
  if (!data) {
    return (
      <div>
        <h1>Loading test content...</h1>
      </div>
    );
  }

  // Render the fetched community data.
  return (
    <div>
      <h1>Sanity CMS Test Content</h1>
      {/* Displaying the data in a formatted JSON block */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestPage;
