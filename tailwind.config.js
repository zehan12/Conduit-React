module.exports = {
  
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screen: {
      'sm': '576px',
      'md': '768px',
      'lg': '1024px',
    },
    container: {
      center: true,

      padding: {
        DEFAULT: '1rem',
        sm: '7rem',
        md: '1rem',
        lg: '10rem',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],

}

// @media screen and (min-width: 992px) {}
// @media screen and (min-width: 768px) {}
// @media screen and (min-width: 576px) {}