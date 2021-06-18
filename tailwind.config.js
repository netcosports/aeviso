/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        darkGray: '#3E3E3E',
        input: '#404040',
      },
      boxShadow: {
        mainShadow: '10px 10px 20px rgba(0, 0, 0, 0.50)',
        inputShadow: '5px 5px 20px rgba(0, 0, 0, 0.8)',
      },
      gridTemplateRows: {
        desktop: '10% 40% 50%',
        mobile: '130px 200px 250px 400px',
      },
      gridTemplateColumns: {
        desktop: '350px 3fr 3fr',
        phone: '1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
