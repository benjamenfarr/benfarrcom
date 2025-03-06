/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'disney-blue': '#0063e5',
        'disney-dark': '#0e0b14',
        'disney-card': '#1a1d29',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};