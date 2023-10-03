/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/app/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'fantasque-sans-mono': 'Fantasque Sans Mono'
      }
    },
  },
  plugins: [],
}
