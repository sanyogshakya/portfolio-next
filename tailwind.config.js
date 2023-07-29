/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        100: "#1d1c1d",
        200: "#2a292a",
        300: "#3B3A3B",
        400: "#424142",
        500: "#545354",
        600: "#6c6b6c",
        700: "#7a797a",
      },
      white: {
        100: "#eae9ff",
        200: "#dcdbef",
        300: "#bcbbcf",
        400: "#abaabf",
        500: "#9a99af",
      },
      accent: {
        100: "#00bdf9",
        200: "#00acff",
      },
    },
  },
  plugins: [],
};
