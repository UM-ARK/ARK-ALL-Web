import { COLOR_DIY } from "./utils/uiMap";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        themeColor: COLOR_DIY.themeColor,
        themeColorLight: COLOR_DIY.themeColorLight,
        themeColorUltraLight: COLOR_DIY.themeColorUltraLight,
        alert: COLOR_DIY.alert,
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require('@tailwindcss/typography')
  ],
};
