/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Đặt Poppins làm font mặc định
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
