/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      DMSanns: "'DM Sans', 'sans-serif'",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      "4xl": [
        "42px",
        {
          lineHeight: "1.5",
        },
      ],
      "3.5xl": [
        "38px",
        {
          lineHeight: "1.3",
        },
      ],
      "3xl": [
        "30px",
        {
          lineHeight: "1.3",
        },
      ],
      "2.5xl": [
        "26px",
        {
          lineHeight: "1.5",
        },
      ],
      "2xl": [
        "22px",
        {
          lineHeight: "1.5",
        },
      ],
      xl: [
        "20px",
        {
          lineHeight: "1.5",
        },
      ],
    },
    extend: {
      fontFamily: {
        poppins: "'Poppins', 'sans-serif'",
      },
      boxShadow: {
        custom: "0px 0px 10px rgba(225, 231, 242, 0.8)",
      },
      colors: {
        blue: {
          DEFAULT: "#00296B",
          disabled: "#2698fb2f",
          hover: "#00417d",
          alt: "#00509D",
          "outline-hover": "#eeedfe",
          9: "#00296B",
          light: "#E3E9F2",
          deep: "#3090EA",
          sky: "#5599DD",
          backdrop: "#00296b34",
        },

        grey: {
          DEFAULT: "#ADB2B8",
          text: "#8B8E93",
          whitesmoke: "#F9FCFF",
          border: "#E0E3E8",
          light: "rgba(225, 225, 225, 0.8)",
          lighter: "#ffffff6e",
          backdrop: "#7c7c7c",
          ghostwhite: "#f8f9fb",
          textalt: "#686B6F",
          alt: "#F6F7F8",
          alte: "rgba(222, 225, 233, 0.973)",
          fade: "#EAEBEC",
          placeholder: "#A4A4A4",
          label: "#2A2B2C",
          black: "#1D2924",
          grey: "#98A4AF",
        },
        purple: {
          DEFAULT: "#5448C8",
          hover: "#483dab",
        },
        red: {
          DEFAULT: "#F3564D",
          light: "#F2E3E6",
          deep: "#EA3073",
          alt: "#CE1313",
        },
        green: {
          DEFAULT: "#4CAF50",
          deep: "#5FAD56",
          light: "#E5F2E3",
        },
        yellow: {
          DEFAULT: "#FFB413",
        },
        transparent: {
          DEFAULT: "transparent",
        },
      },
      height: {
        13: "52px",
        200: "800px",
      },
      maxWidth: {
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "90%": "90%",
        "9xl": "100rem",
      },
      width: {
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "90%": "90%",
      },
      screens: {
        "4xs": "300px",
        "3xs": "380px",
        "2xs": "475px",
        max: "100rem",
      },
      margin: {
        "-85px": "-85px",
        "-60px": "-60px",
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(264.12deg, #00509D -24%, #00296B 65.77%)",
        banner: "url('/src/assets/icons/banner-mobile.svg')",
      },
    },
    minHeight: {
      76: "300px",
      36: "160px",
    },
    borderWidth: {
      DEFAULT: "1px",
      "1/2": "0.5px",
    },
  },
  plugins: [],
}
