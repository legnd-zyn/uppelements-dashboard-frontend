/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h1 + *": {
              marginTop: "0",
            },
            "ul + *": {
              marginTop: "0",
            },
            "ol + *": {
              marginTop: "0",
            },
          },
        },
      }),
    },
  },

  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
