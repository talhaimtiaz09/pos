/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          dark: "#222831",
          light: "#393E46",
        },
        primary: "#F05454",
      },
    },
  },
  plugins: [],
};
