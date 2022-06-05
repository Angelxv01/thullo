module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Poppins'", "sans-serif"],
      accent: ["Noto Sans", "sans-serif"],
    },
    extends: {
      fontSize: {
        "2xs": "0.675rem",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("@tailwindcss/forms")({ strategy: "base" })],
};
