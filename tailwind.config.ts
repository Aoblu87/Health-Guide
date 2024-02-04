import defaultTheme from "tailwindcss/defaultTheme";
const { blackA, mauve, violet } = require("@radix-ui/colors");

module.exports = {
  darkMode: ["class", "media"], // Abilita sia la classe che la preferenza media per la modalità dark
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#ebe7fc",
          dark: "#2a272a",
        },
        currentColor: "#1f2937",
        seabrook: {
          50: "#cfd3f6",
          100: "#b8c3ef",
          200: "#8fade1",
          300: "#6e9fd2",
          400: "#5690c1",
          500: "#497dae",
          600: "#446697",
          700: "#434f7e",
          800: "#414063",
          900: "#3c3747",
        },
        genteelBlue: {
          50: "#d5d9f6",
          100: "#c4cdf0",
          200: "#a4bbe4",
          300: "#89add6",
          400: "#759fc6",
          500: "#668cb3",
          600: "#5c759c",
          700: "#545d82",
          800: "#4c4a66",
          900: "#403c48",
        },
        veriBerri: {
          50: "#e4d9f2",
          100: "#dacbe7",
          200: "#c7b1d3",
          300: "#b79abe",
          400: "#a686a9",
          500: "#947494",
          600: "#7f657e",
          700: "#6a5668",
          800: "#554854",
          900: "#3f383f",
        },
        tanPlan: {
          50: "#f8d9f9",
          100: "#f5ccec",
          200: "#eeb2c4",
          300: "#e4a19b",
          400: "#d6a389",
          500: "#c49e7a",
          600: "#ac8c6e",
          700: "#907263",
          800: "#705755",
          900: "#4d4144",
        },
        matisse: {
          50: "#f4f7fb",
          100: "#e8edf6",

          200: "#ccdaeb",
          300: "#9fbcda",
          400: "#6c99c4",
          500: "#497dae",
          600: "#386494",
          700: "#2e5076",
          800: "#294463",
          900: "#263b54",
          950: "#1a2637",
        },
        ...blackA,
        ...mauve,
        ...violet,
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
