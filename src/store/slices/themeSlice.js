import { createSlice } from "@reduxjs/toolkit";
import {
  red,
  grey,
  blueGrey,
  purple,
  deepPurple,
  green,
} from "@mui/material/colors";

const primaryMain = "#000000";

export const initialState = {
  mode: "light",
  palette: {
    primary: {
      light:
        "radial-gradient(circle, rgba(43,38,125,1) 0%, rgba(106,64,195,1) 48%, rgba(162,96,240,1) 99%)",
      main: deepPurple[500],
      dark: "#000000",
      contrastText: grey[50],
    },
    secondary: {
      light: deepPurple[700],
      main: deepPurple[500],
      dark: deepPurple[300],
      contrastText: "#000",
    },
    text: {
      dark: "white",
      light: "white",
    },
    page: {
      text: {
        light: "black",
        dark: purple[100],
      },
      background: {
        light: grey[200],
        dark: grey[800],
      },
    },
    paper: {
      light: "white",
      dark: blueGrey[800],
    },
    card: {
      text: {
        light: "black",
        dark: "white",
      },
      background: {
        light: "white",
        dark: grey[900],
      },
    },
    error: {
      main: red.A400,
    },
    green: {
      light: green[600],
      main: green[800],
      dark: green[900],
    },
    background: {
      light: "white",
      dark: "black",
    },
    grey: {
      ghost: {
        light: "white",
        dark: grey[50],
      },
      light: {
        light: grey[100],
        dark: grey[300],
      },
      dark: {
        light: grey[600],
        dark: grey[800],
      },
      contrastText: {
        light: deepPurple[400],
        dark: deepPurple[50],
      },
    },
  },
  header: {
    textAlign: "center",
    borderRadius: "5px 5px 0px 0px",
    marginBottom: "12px",
    padding: "12px 24px",
    color: "white",
    backgroundColor: primaryMain,
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.mode = "dark";
    },
    setLightTheme: (state) => {
      state.mode = "light";
    },
  },
});

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;