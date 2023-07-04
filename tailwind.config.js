
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist:['bg-blue-400','bg-red-400','bg-green-400'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      backgroundColor: {
        'rgb-249-218-208': 'rgb(249, 218, 208)',
        'rg-78-97-55':'rgb(78, 97, 55)',
        'custom-color': 'rgb(249, 218, 208)',
        'customGreen': 'rgb(78, 97, 55)'
      },
    },
  },
  plugins: [],
}

