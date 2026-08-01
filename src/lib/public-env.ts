/**
 * Public (browser-safe) environment variables.
 * Must be prefixed with NEXT_PUBLIC_ to be inlined into the client bundle.
 */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cvpro.example.com",
} as const;
