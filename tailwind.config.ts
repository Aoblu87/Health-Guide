module.exports = {
  darkMode: ["class"], // Abilita sia la classe che la preferenza media per la modalità dark
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
        'pink': {
          '50': '#fdf2f8',
          '100': '#fce7f3',
          '200': '#fbcfe8',
          '300': '#f9a8d4',
          '400': '#f472b6',
          '500': '#ec4899',
          '600': '#db2777',
          '700': '#be185d',
          '800': '#9d174d',
          '900': '#831843',
          '950': '#500724',
      },
      
        'puce': {
          '50': '#fbf4f6',
          '100': '#f8ebef',
          '200': '#f2d8e1',
          '300': '#e8b9c8',
          '400': '#d5849c',
          '500': '#c96b84',
          '600': '#b54d63',
          '700': '#9b3b4d',
          '800': '#803442',
          '900': '#6c2f39',
          '950': '#40171e',
      },
      

        'deep-teal': {
          '50': '#f1fcfa',
          '100': '#cef9ee',
          '200': '#9df2df',
          '300': '#64e4cb',
          '400': '#34cdb4',
          '500': '#1bb19a',
          '600': '#138e7e',
          '700': '#137266',
          '800': '#145b53',
          '900': '#164b46',
          '950': '#073633',
      },
      
        'primary': {
          100: '#34cdb4',
          200: '#58d3bc',
          300: '#73d9c4',
          400: '#8adfcc',
          500: '#9fe4d5',
          600: '#b3eadd',
        },
        'surface': {
          100: '#073633',
          200: '#254a47',
          300: '#3e5e5b',
          400: '#587471',
          500: '#728987',
          600: '#8da09e',
        },
        'surface-mixed': {
          100: '#0b433f',
          200: '#2a5652',
          300: '#446965',
          400: '#5d7d7a',
          500: '#77928f',
          600: '#91a7a4',
        },
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
