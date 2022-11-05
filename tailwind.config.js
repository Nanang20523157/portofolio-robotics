/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "biru-uii": "#093697",
      },
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
      },
      keyframes: {
        zoom: {
          '0%': {transform: 'scale(1)'},
          '100%': {transform: 'scale(0)'},
        },
        feed: {
          '0%': 'opacity-0',
          '100%': 'opacity-100',
        },
        slideUp: {
          '0%': 'top-full',
          '100%': 'top-1/4',
        },
        slideDown: {
          '0%': 'top-[22%]',
          '100%': 'top-1/4',
        },
      },
      animation: {
        'menghilang': 'zoom 0.3s ease-out normal forwards',
        // tambahkan hidden (settimeout(300)) hilangkan hidden
        'muncul': 'zoom 0.3s ease-out reverse forwards',
        'muncul2': 'feed 0.3s ease-out normal forwards',

        // hilangkan hidden (settimeout(300))
        'redup': 'feed 0.3s ease-out normal forward',
        'naik': 'slideUp 0.3s ease-out normal forward',
        'turun': 'slideDown 0.3s ease-out 0.1s normal forward',
        'toMain': 'slideUp 0.3s ease-out reverse forward',
        'terang': 'feed 0.3s ease-out 0.1s reverse forward',
        // tambahkan hidden (settimeout(300))
      },
    },
  },
  plugins: [],
}
