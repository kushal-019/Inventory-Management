/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#f9fbfa",
        dark: "#08273e",
        lightblue: "#a4b6c2",
        midblue: "#6891a6",
      },
    },
  },
  plugins: [],
}