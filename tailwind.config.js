/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Paths to your JS/JSX/TS/TSX files
    './public/index.html',         // Path to your HTML files
    './src/components/**/*.{js,jsx,ts,tsx}', // Include components directory
    './src/pages/**/*.{js,jsx,ts,tsx}',      // Include pages directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

