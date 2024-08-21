
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        hind: "Hind, sans-serif",
        Moul: "Moul, sans-serif",
        Matemasie: "Matemasie, sans-serif",
        Lobster: "Lobster, sans-serif",
        SourceSerif: ["'Source Serif 4'", "serif"],
        Acumin: ["Acumin"]
      },
      colors: {
        beerOrange: "#F3B232",
        beerLightOrange: "#face78",
        microsoftGray: "#F2F2F2",
        appleBlue: "#0077ED",
        appleLightBlue: "#238efa",
        appleGray: "#1D1D1F",
        appleLightGray: "#454545"
      }
    },
  },
  plugins: [],
}