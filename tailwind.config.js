// tailwind.config.js
module.exports = {
  content: ["./src/{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
