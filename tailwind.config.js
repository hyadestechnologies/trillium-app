/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'neo': '15px 15px 0px 0px rgb(0 0 0 / 1)'
      }
    },
  },
  plugins: [],
}
