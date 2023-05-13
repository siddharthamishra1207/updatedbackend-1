/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        '80': '80px',
        '32': '32px',
      },
      lineHeight: {
        '105': '105.66px',
        '37': '37px',
      },
      colors: {
        'mycolor': 'rgba(164, 205, 186, 1)',
        'ymcolor': 'rgba(32, 187, 125, 1)',
       
      },
    },
  },
  plugins: [],
}

