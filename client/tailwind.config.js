/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          brand: '#FF385C',
          brandDark: '#E00B41',
          charcoal: '#222222',
          muted: '#717171',
          lightMuted: '#B0B0B0',
          border: '#DDDDDD',
          lightBorder: '#EBEBEB',
          surface: '#F7F7F7',
          surfaceHover: '#F0F0F0',
        }
      },
      fontFamily: {
        sans: [
          'Circular',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'sans-serif'
        ]
      },
      boxShadow: {
        'airbnb': '0 6px 16px rgba(0,0,0,0.12)',
        'airbnb-card': '0 6px 20px rgba(0,0,0,0.2)',
        'airbnb-subtle': '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'airbnb-pill': '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}
