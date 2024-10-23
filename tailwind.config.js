/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  container: {
      center: true,
      screens: {
        'xl': '1024px',
      }
    },
}