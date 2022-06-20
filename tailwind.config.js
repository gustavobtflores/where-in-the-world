/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          "dark-blue": "#111517",
          "dark-gray": "#858585",
          gray: "#fafafa",
          white: "#ffffff",
        },
        text: {
          light: "#111517",
          dark: "#ffffff",
        },
        elements: {
          light: "#ffffff",
          dark: "#2b3945",
        },
        background: {
          light: "#fafafa",
          dark: "#202c37",
        },
        input: {
          light: "",
        },
      },
      gridTemplateColumns: {
        countryItem: "repeat(auto-fill, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
