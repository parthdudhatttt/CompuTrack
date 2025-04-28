/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  theme: {
    extend: {
      backgroundColor: {
        common: "#ecf2fc",
        button: "#60A5FA",
        "button-hover": "#FFB71D",
        card: "#ffffff",
        "card-header": "#FEFDED",
        "card-header-hover": "#FFB74D ",
        "card-hover": "#b8cdf4",
        input: "#ecf2fc",
        "input-focus": "white",
        footer: "#6190E6",
        "common-dark": "#0F1035",
        sidebar: "#B7C9F2",
        "category-hover": "#A3D8FF",
        "category-selected": "#83B4FF",
      },
      textColor: {
        warning: "red",
        common: "#0F1035",
        nav: "white",
        "nav-active": "#FFF176",
        "nav-hover": "#FDE047",
        "card-hover": "",
      },
      borderColor: {
        "card-hover": "#FFB74D",
        card: "#6190E6",
      },

      fontFamily: {
        common: ["Roboto Condensed", "sans-serif"],
        sans: ["Nunito", "sans-serif"],
        serif: ["Merriweather", "serif"],
        title: ["sevillana"],
      },
      boxShadow: {
        "custom-card": "0 10px 15px -3px #B99470, 0 4px 6px -2px #B99470",
        "custom-card-hover": "0 10px 15px -3px #B99470, 0 4px 6px -2px #B99470",
      },
    },
  },
};
