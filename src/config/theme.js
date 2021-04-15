import { createMuiTheme } from "@material-ui/core";
import { lightBlue, blue, red, blueGrey } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      light: lightBlue[300],
      main: blue[800],
      dark: blue[900],
      contrastText: "white",
    },
    table: {
      primary: {
        main: lightBlue[500],
        dark: lightBlue[800],
        contrastText: "white",
      },
    },
    error: {
      main: red[700],
    },
    background: {
      default: blueGrey[500],
    },
  },
  container: {
    padding: "12px 24px",
  },
  overrides: {
    MuiPaper: {
      root: {
        marginBottom: "10px",
      },
    },
  },
});

export default theme;
