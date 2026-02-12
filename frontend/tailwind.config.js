/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#2563EB",
        accent: "#F43F5E",
        background: "#F3F4F6",
        backgroundDark: "#1F2937",
        text: "#111827",
        textDark: "#F9FAFB"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"]
      }
    }
  },
  plugins: []
};