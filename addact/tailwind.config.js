/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // include your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
