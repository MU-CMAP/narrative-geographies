/**
 * sanityClient.ts
 *
 * This file configures and exports the Sanity client for our Next.js project.
 * It uses the named export `createClient` from '@sanity/client'.
 * 
 * IMPORTANT:
 * - Ensure that the environment variables for the Sanity project are set in your .env.local file:
 *     NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.
 * - Make sure that the allowed origins in your Sanity project include "http://localhost:3000".
 * - The API version is pinned to a tested date to prevent unexpected changes.
 */

import { createClient } from '@sanity/client';

// Create the Sanity client using the specified configuration.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qh3wukbx",  // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",      // Your dataset name
  useCdn: true,          // Use the CDN for faster responses; set to false for fresh data
  apiVersion: '2021-10-21', // Pinned API version; you may update this if you have tested another version
});
