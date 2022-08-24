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
      animation: {
        'slideUp': 'slideUp .2s ease 0s 1 normal forwards',
      },
      keyframes: {
        slideUp: {
            '0%': {
              opacity: '0',
              transform: 'translateY(250px)'
            },
            '100%': {
              opacity: '1',
              transform: 'translateY(0)'
            }
        }
      }
    },
  },
  plugins: [],
}
