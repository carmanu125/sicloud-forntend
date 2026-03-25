/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  safelist: [
    "bg-primary",
    "text-on-primary",
    "bg-primary-container",
    "text-on-primary-container",
    "bg-secondary",
    "bg-secondary-container",
    "bg-surface",
    "bg-surface-container",
    "bg-surface-container-low",
    "bg-surface-container-lowest",
    "text-on-surface",
    "text-on-surface-variant",
    "bg-error",
    "bg-error-container",
    "bg-tertiary"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#00236f",
        "on-primary": "#ffffff",
        "primary-container": "#1e3a8a",
        "on-primary-container": "#90a8ff",

        secondary: "#555d7e",
        "secondary-container": "#d0d8ff",

        background: "#f7f9fb",
        surface: "#f7f9fb",

        "surface-container": "#eceef0",
        "surface-container-low": "#f2f4f6",
        "surface-container-lowest": "#ffffff",

        "on-surface": "#191c1e",
        "on-surface-variant": "#444651",

        outline: "#757682",
        "outline-variant": "#c5c5d3",

        error: "#ba1a1a",
        "error-container": "#ffdad6",

        tertiary: "#4b1c00",
        "tertiary-fixed": "#ffdbcb",
        "on-tertiary-fixed-variant": "#773205"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}