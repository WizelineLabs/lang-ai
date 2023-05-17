// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["13px", "17px"],
        sm: ["15px", "21px"],
        base: ["17px", "25px"],
      },
      colors: {
        primary: {
          DEFAULT: colors.slate[950],
          dark: colors.white,
        },
        secondary: {
          DEFAULT: colors.slate[600],
          dark: colors.slate[400],
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
