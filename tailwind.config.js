/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#000000', // Pure black
          alt: '#0A0A0A',
        },
        card: {
          DEFAULT: '#141414', // Dark gray card
          alt: '#1A1A1A',
        },
        primary: '#FF5A00', // Bright Orange
        secondary: '#FF7A00', // Lighter Orange
        live: '#FF3B00', // Red-Orange
      },
      backgroundImage: {
        'stadium-gradient': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 1))',
        'live-gradient': 'linear-gradient(to right, #FF3B00, #FF7A00)',
      }
    },
  },
  plugins: [],
}
