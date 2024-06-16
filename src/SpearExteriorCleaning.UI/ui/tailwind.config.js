/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-blue': '#3EBFE5',
        'custom-primary': '#205ba6',
        'custom-light-grey': 'rgba(252,251,252,255)',
        'custom-dark-grey': 'rgba(57,67,64,255)'
      },
      translate: {
        '-full': '-100%',
        '0': '0',
      },
    },
  },
  plugins: [],
}
