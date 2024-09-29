/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        orange: 'var(--orange)',
        paragraph: 'var(--paragraph)',
      },
      fontFamily: {
        default: ['Poppins', 'sans-serif'],
        'cursive': ['Leckerli One', 'cursive'],
      },
      borderWidth: {
        '1': '1px', 
      },
      boxShadow: {
        'custom-white': '0px 0px 3px rgb(255, 255, 255)',
      },
      animation: {
        'moveToRight': 'moveToRight 1s infinite alternate',
        bounce: 'Bounce 1.2s infinite alternate ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

