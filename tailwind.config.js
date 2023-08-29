/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '2560px',
    },
    colors: {
      'main': '#1fb6ff',
      'light-red': '#f76d6d',
      'yellow': '#fc9c4d',
      'light-blue': '#a8d1e7',
      'blue': '#374785',
      'dark-blue': '#24315e',
        'white': '#ffffff',
        'black': '#000000',
    },
    extend: {
      boxShadow: {
        'neo': '15px 15px 0px 0px rgb(0 0 0 / 1)',
      },
    },
  },
  plugins: [],
};
