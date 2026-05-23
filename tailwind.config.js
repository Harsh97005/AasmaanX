/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Orbitron', 'monospace'],
      },
      colors: {
        sky: { 400: '#38bdf8', 500: '#0ea5e9', 300: '#7dd3fc' },
      },
    },
  },
  plugins: [],
}
