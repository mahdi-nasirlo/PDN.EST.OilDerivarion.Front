/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

delete colors[`blueGray`]

delete colors['coolGray']


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
            },
            backgroundColor: {
                ...colors,
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
