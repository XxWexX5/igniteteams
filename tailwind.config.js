/** @type {import('tailwindcss').Config} */

import { colors } from './src/theme'

import { platformSelect } from "nativewind/theme";

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontSize : {
        sm: "4vw",
        md: "4.5vw",
        lg: "5vw",
        xl: "6.5vw",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        system: platformSelect({
          ios: "Roboto",
          android: "Roboto",
          default: "Roboto",
        }),
      }
    },
  },
  plugins: [],
}