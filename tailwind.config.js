/** @type {import('tailwindcss').Config} */

import { colors, fontSize } from './src/theme'

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontSize
    },
  },
  plugins: [],
}