module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        1.75: "0.38rem",
      },
      borderWidth: {
        3: "3px",
      },
      width: {},
      boxShadow: {
        post: "0 2px 2px -1px rgba(0, 0, 0, 0.1), 0 2px 2px -1px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        0.75: "0.2rem",
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
