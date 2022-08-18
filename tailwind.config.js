/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      cabin: "Cabin, sans-serif",
      dynapuff: "Dynapuff, cursive",
    },
    extend: {
      colors: {
        'gunmetal': '#323741',
        'hoverblack': '#272A31',
        'eerie': '#1C1D21',
        'raisin': '#23242A',
      },
    },
  },
  plugins: [],
}
