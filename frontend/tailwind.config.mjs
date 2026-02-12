/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          primary: "#1e3a8a",
          secondary: "#0f172a",
          accent: "#f59e0b"
        }
      }
    }
  },
  plugins: []
};