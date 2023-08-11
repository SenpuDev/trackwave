/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['"Outfit"', 'sans-serif']
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ]
}
