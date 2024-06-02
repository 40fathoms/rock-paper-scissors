/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
