/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fcd19c",
        border: "#caa77d",
        greyBg: '#eaeaea'
      },
      fontFamily: {
        "openSans": "var(--font-pr)"
      }
    },
  },
  plugins: [],
}