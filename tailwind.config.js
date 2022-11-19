/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '2560px'
    },
    extend: {
      boxShadow: {
        'neo': '15px 15px 0px 0px rgb(0 0 0 / 1)'
      }
    },
  },
  plugins: [],
}
