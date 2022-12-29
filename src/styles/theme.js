import colors from "./colors";

export const theme = {
  colors,
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: "Raleway",
      fontSize: 36,
      fontWeight: "bold",
    },
    body: {
      fontFamily: "Merriweather",
      fontSize: 16,
    },
    breakpoints: {
      smallPhone: 0,
      phone: 321,
      tablet: 768,
    },
  },
};

export const darkTheme = {
  ...theme,
};
