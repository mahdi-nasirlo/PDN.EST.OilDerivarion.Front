/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

delete colors[`blueGray`];

delete colors["coolGray"];

const theme = require("./theme/themeConfig");

module.exports = {
  warning: "",
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          500: theme.token.colorPrimary,
        },
        secondary: {
          500: "#FFA133",
        },
        red: {
          ...colors.red,
          500: "#F43F5E",
        },
        CustomizeBlue: {
          500: "#175AEB",
        },
      },
      backgroundColor: {
        ...colors,
        gray: {
          ...colors.gray,
          200: "#E2E8F0",
          100: "#F3F4F6",
          50: "#F9FAFB",
        },
        orange: {
          ...colors.orange,
          500: "#FA8C16",
        },
        primary: {
          500: "#18948A",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
