// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // if using App Router
  ],
  darkMode: 'class', // <-- add this line
  theme: {
    extend: {},
  },
  plugins: [],
}
