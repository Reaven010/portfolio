/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#0e0e0e",
        "secondary-container": "#552c9e",
        "primary-container": "#52a3ff",
        "surface-variant": "#262626",
        "secondary-dim": "#b088fe",
        "primary-fixed-dim": "#2696fe",
        "surface": "#0e0e0e",
        "outline-variant": "#494847",
        "surface-container": "#1a1919",
        "primary-fixed": "#52a3ff",
        "background": "#0e0e0e",
        "secondary": "#b088fe",
        "primary": "#73b1ff",
        "surface-container-low": "#131313",
        "surface-container-highest": "#262626",
        "primary-dim": "#4ba1ff",
        "on-primary": "#002f59",
        "on-surface": "#ffffff",
        "on-surface-variant": "#adaaaa",
        "surface-bright": "#2c2c2c",
        "surface-container-high": "#201f1f",
        "on-background": "#ffffff"
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
