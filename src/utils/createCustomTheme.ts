import { createTheme } from "@mui/material";

export const createCustomTheme = () => {
  return createTheme({
    typography: {
      fontFamily: `"Ubuntu"`,
      fontWeightRegular: "regular",
      fontWeightBold: "bold",
      allVariants: {
        color: "var(--text-primary)",
      },
    },
    palette: {
      primary: {
        main: "#6c5b7b",
      },
    },
  });
};
