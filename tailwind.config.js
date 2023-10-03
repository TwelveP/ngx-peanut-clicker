// const plugin = require('tailwindcss/plugin');

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
  plugins: [
    // plugin(function ({ addBase, addComponents, addUtilities, addVariant, matchVariant, matchUtilities, theme, config, corePlugins, e }) {
    // })
  ],
}
