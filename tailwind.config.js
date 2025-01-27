/** @type {import('tailwindcss').Config} */

import { colors, fontSize } from './src/theme'

import { platformSelect } from "nativewind/theme";

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontSize,
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