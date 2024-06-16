/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily:{
        'custom':['Roboto', 'sans-serif'],
        'children':['Poppins', 'sans-serif',"monospace"],
       }
    },
  },
  plugins: [],
}