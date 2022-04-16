const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
  ],
  theme: {
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
    },
    extend: {
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
      maxWidth: {
        "8xl": "1920px",
      },
      width: {
        120: "30rem",
        140: "35rem",
        160: "40rem",
        180: "45rem",
      },
    },
    variants: {
      extend: {
        opacity: ["disabled"],
        cursor: ["disabled"],
      },
    },
  },
  plugins: [],
};
