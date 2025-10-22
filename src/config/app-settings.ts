import { AppSettings } from "@/types/app-settings";

/**
 * App Settings
 * 
 * This file contains all the configuration for your mini app.
 * Update these values to customize your app's metadata, branding, and behavior.
 */
export const appSettings: AppSettings = {
  // Basic Information
  name: "Cast and Conquer",
  subtitle: "Daily Farcaster Trivia Challenge",
  description: "Answer 10 Farcaster-themed questions as fast as you can. Compete on the daily leaderboard that resets every 24 hours. Test your knowledge and climb the ranks!",
  ogDescription: "Test your Farcaster knowledge with 10 daily trivia questions. Compete on the leaderboard!",

  // Branding & Visuals
  iconUrl: null,
  splashImageUrl: null,
  splashBackgroundColor: "#7C3AED",
  heroImageUrl: null,
  themeColor: "#7C3AED",

  // URLs & Links
  domain: "https://server-251022111651159.studio.neynar.com",
  externalUrl: null,

  // App Behavior
  version: "1.0.0",
};
