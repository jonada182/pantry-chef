/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        "dark-primary": "#FFA000",
        "light-primary": "#FFECB3",
        "primary": "#FFC107",
        "icons": "#212121",
        "accent": "#FF4081",
        "primary-text": "#212121",
        "secondary-text": "#757575",
        "divider": "#BDBDBD"
      }
    },
  },
  plugins: [],
}

