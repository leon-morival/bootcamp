/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Permet à Tailwind de scanner tous les fichiers React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
