import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: "#__next",
  theme: {
    extend: {
      backgroundColor: {
        gwColor: {
          primary01: "var(--garda-primary01-color)",
          primary02: "var(--garda-primary02-color)",
          neutral01: "var(--garda-neutral01-color)",
          neutral02: "var(--garda-neutral02-color)",
          neutral03: "var(--garda-neutral03-color)",
          neutral04: "var(--garda-neutral04-color)",
          charcoal: "var(--garda-charcoal-color)",
          darkred: "var(--garda-dark-red-color)",
          grey: "var(--garda-grey-color)",
          rust: "var(--garda-rust-color)",
          lightgrey: "var(--garda-light-grey-color)",
          critical: "var(--garda-critical-color)",
          highsevere: "var(--garda-high-servere-color)",
          highsubstantial: "var(--garda-high-substantial-color)",
          medium: "var(--garda-medium-color)",
          low: "var(--garda-low-color)",
          minimal: "var(--garda-minimal-color)",
          severe: "var(--garda-severe-color)",
          substantial: "var(--garda-substantial-color)",
        },
      },
      textColor: {
        gwColor: {
          primary01: "var(--garda-primary01-color)",
          primary02: "var(--garda-primary02-color)",
          neutral01: "var(--garda-neutral01-color)",
          neutral02: "var(--garda-neutral02-color)",
          neutral03: "var(--garda-neutral03-color)",
          neutral04: "var(--garda-neutral04-color)",
          charcoal: "var(--garda-charcoal-color)",
          darkred: "var(--garda-dark-red-color)",
          grey: "var(--garda-grey-color)",
          rust: "var(--garda-rust-color)",
          lightgrey: "var(--garda-light-grey-color)",
          critical: "var(--garda-critical-color)",
          highsevere: "var(--garda-high-servere-color)",
          highsubstantial: "var(--garda-high-substantial-color)",
          medium: "var(--garda-medium-color)",
          low: "var(--garda-low-color)",
          minimal: "var(--garda-minimal-color)",
          severe: "var(--garda-severe-color)",
          substantial: "var(--garda-substantial-color)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
