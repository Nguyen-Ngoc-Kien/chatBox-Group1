/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {     
      backgroundColor: {
        'custom-gradient': 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
      },
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