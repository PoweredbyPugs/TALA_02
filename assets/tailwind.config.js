/* Tailwind configuration for TALA theme */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'tala-green': '#616247',
        'tala-green-dark': '#4A4A36',
        'tala-tan': '#99866F',
        'tala-charcoal': '#2D2D2D',
        'tala-blue': '#3E4A5F',
        'tala-silver': '#C4C7C6',
      },
      fontFamily: {
        'heading': ['Bahnschrift', 'Arial', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      height: {
        'screen-minus-header': 'calc(100vh - 70px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
