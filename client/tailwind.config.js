module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Poppins'", "sans-serif"],
      accent: "Noto Sans",
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("@tailwindcss/forms")({ strategy: "base" })],
};
