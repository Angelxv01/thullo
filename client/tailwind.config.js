module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins",
      accent: "Noto Sans",
    },
    extend: {
      fontSize: {
        xs: ".625rem",
        sm: ".75rem",
        tiny: ".875rem",
      },
      colors: {
        dark: "#000",
        white: "#FFF",
        green: {
          dark: "#219653",
          light: "#6FCF97",
        },
        yellow: "#F2C94C",
        orange: "#F2994A",
        red: "#EB5757",
        blue: { dark: "#2F80ED", light: "#56CCF2" },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("@tailwindcss/forms")({ strategy: "base" })],
};
