/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-dm-sans)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
