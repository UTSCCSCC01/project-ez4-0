module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        post: "0 2px 2px -1px rgba(0, 0, 0, 0.1), 0 2px 2px -1px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        "post-width": "40rem",
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
