/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
backgroundImage: {
        'noise': "url('/textures/noise.png')",
      },
    },
  },
  plugins: [],
}