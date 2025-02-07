const colors = require("./src/components/ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "montserrat-thin": ["Montserrat-Thin", "sans-serif"],
        "montserrat-light": ["Montserrat-Light", "sans-serif"],
        "montserrat-regular": ["Montserrat-Regular", "sans-serif"],
        "montserrat-medium": ["Montserrat-Medium", "sans-serif"],
        "montserrat-semibold": ["Montserrat-SemiBold", "sans-serif"],
        "montserrat-bold": ["Montserrat-Bold", "sans-serif"],
        "montserrat-extrabold": ["Montserrat-ExtraBold", "sans-serif"],
        "montserrat-black": ["Montserrat-Black", "sans-serif"],
      },
      colors,
    },
  },
  plugins: [],
};
