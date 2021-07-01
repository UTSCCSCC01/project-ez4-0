module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "post-width": "36rem",
        "post-height": "30rem",
      },
      fontFamily: {
        cg: ["CenturyGothic"],
        cgbold: ["CenturyGothic-Bold"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
