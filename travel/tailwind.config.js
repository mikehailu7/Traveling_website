/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#FCFCFC",
        "secondaryColor": "#1f1f38",
        "likeColor": "#6c562c",
        "textColor": "#ab8c5e",
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
