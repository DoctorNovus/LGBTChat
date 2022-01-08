module.exports = {
  content: ["./pages/*.{html,js}", "./components/**/*.{html,js}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "magic": {
          0: "var(--magic-zero)",
          1: "var(--magic-one)",
          2: "var(--magic-two)"
        },
        "text": {
          0: "var(--text-zero)"
        },
        "bl": "var(--border-line)",
        "bubble": {
          0: "var(--bubble-zero)"
        }
      },
      invert: {
        "icon": "var(--icon)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};