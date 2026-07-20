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
        'custom-dark-grey': 'rgba(57,67,64,255)',
        'custom-navy': '#0B2545',
        'custom-navy-light': '#123566',
        'custom-accent': '#205ba6',
        'custom-accent-dark': '#123566',
        'custom-cream': '#F7F9FC',
        'custom-focus': '#2B7FC4',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      translate: {
        '-full': '-100%',
        '0': '0',
      },
    },
  },
  plugins: [],
}
