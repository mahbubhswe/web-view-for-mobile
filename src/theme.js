import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    btnColor: {
      main: "#FFA001",
    },
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    textFielBorderColor: {
      main: "#ccc",
    },
    titleColor: {
      main: "#ffffff",
    },
  },
});

export default theme;
