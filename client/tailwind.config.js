module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins",
      accent: "Noto Sans",
    },
    extend: {
      colors: {
        dark: "#000",
        white: "#FFF",
        light: "#F7F8FD",
        green: {
          dark: "#219653",
          light: "#6FCF97",
        },
        yellow: "#F2C94C",
        orange: "#F2994A",
        red: "#EB5757",
        blue: { dark: "#2F80ED", light: "#56CCF2" },
        gray: {
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#828282",
          600: "#4F4F4F",
          700: "#333333",
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("@tailwindcss/forms")({ strategy: "base" })],
};
