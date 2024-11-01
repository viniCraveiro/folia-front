import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9A9A",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
