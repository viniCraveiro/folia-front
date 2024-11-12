import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9A9A",
      dark: "#FFB5B5",
    },
    secondary: {
      main: "#f50057",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#ff9800",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#2196f3",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*::-webkit-scrollbar": {
          backgroundColor: "transparent",
          width: "20px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#e0e0e0",
          borderRadius: "20px",
          border: "7px solid transparent",
          backgroundClip: "content-box",
          transition: "background-color 0.3s ease", 
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#FF9A9A",
        },
        "*::-webkit-scrollbar-thumb:active": {
          backgroundColor: "#FF7B7B", 
        },
      },
    },
  },
});

export default theme;
