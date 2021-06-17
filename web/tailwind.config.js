module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'navmenu': 'opacity, transform',
        'featured': 'opacity, transform',
        'button': 'box-shadow, transform'
      },
      gridTemplateColumns: {
        'leftright': 'auto minmax(0, 1fr)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
