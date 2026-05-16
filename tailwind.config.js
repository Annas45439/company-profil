/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF5EE",
        espresso: "#1A1208",
        telang: "#3B6FA0",
        magic: "#7B3FA0",
        crimson: "#C0392B",
        gold: "#C8962A",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        // Enhanced typography scale for modern aesthetic
        "ultra-lg": ["10rem", { lineHeight: "1" }],
        "display-xl": ["8rem", { lineHeight: "0.9" }],
        "display-lg": ["7rem", { lineHeight: "0.85" }],
        "display-md": ["6rem", { lineHeight: "0.9" }],
      },
      letterSpacing: {
        "ultra-tight": "-0.04em",
        "mega-tight": "-0.02em",
        "widest-plus": "0.4em",
      },
    },
  },
  plugins: [],
}