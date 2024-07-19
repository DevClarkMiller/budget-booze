
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        hind: "Hind, sans-serif"
      },
      colors: {
        beerOrange: "#F3B232",
        beerLightOrange: "#face78"
      }
    },
  },
  plugins: [],
}