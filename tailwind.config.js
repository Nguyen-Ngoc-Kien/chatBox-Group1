/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {      
      maxWidth: {
      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
      'screen-2xl': '1536px',
    },
  },
},
  plugins: [],
  container: {
      center: true,
      screens: {
        'xl': '1024px',
      }
    },
}