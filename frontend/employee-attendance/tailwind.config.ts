/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}"  // Important for Angular files
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'), // <-- Add typography plugin
    ],
  }
  