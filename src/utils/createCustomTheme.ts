import { createTheme } from "@mui/material";

export const createCustomTheme = () => {
  return createTheme({
    typography: {
      fontFamily: `"Roboto"`,
      fontWeightRegular: "regular",
      fontWeightBold: "bold",
      allVariants: {
        color: "var(--text-primary)",
      },
    },
    palette: {
      primary: {
        main: "#e5989b",
      },
    },
  });
};
