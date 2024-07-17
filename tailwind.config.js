
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beerOrange: "#F3B232",
        beerLightOrange: "#face78"
      }
    },
  },
  plugins: [],
}