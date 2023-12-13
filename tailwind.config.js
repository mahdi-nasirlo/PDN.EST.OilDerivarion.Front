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
                white: "#FFFFFF",
                black: "#000000",
                red: {
                    500: "#F43F5E",
                },
                gray: {
                    300: "#D1D5DB",
                    900: "#F9FAFB",
                    901: "#111827"
                },
            },
            backgroundColor: {
                ...colors,
                orange: {
                    500: "#FA8C16",
                },
                primary: {
                    500: "#18948A",
                },
                gray: {
                    200: "#E2E8F0",
                    100: "#F3F4F6",
                    50: "#F9FAFB",
                },
                red: {
                    500: "#F43F5E",
                },
                green: {
                    500: "#10B981",
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
