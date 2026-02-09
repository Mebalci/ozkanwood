/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C2C2C',
        accent: '#FF6B35',
        'accent-dark': '#E85A2A',
        success: '#25D366',
        'success-dark': '#128C7E',
      },
      fontFamily: {
        sans: ['Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
