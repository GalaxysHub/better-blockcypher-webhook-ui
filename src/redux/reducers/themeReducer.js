import { lightBlue, blue, red, blueGrey } from "@material-ui/core/colors";

const primaryMain = "#000000";

const initialState = {
  mode: "light",
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#000000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: blue[300],
      dark: "#ba000d",
      contrastText: "#000",
    },
    text: {
      light: "black",
      dark: "white",
    },
    page: {
      text: {
        light: "black",
        dark: "white",
      },
      background: {
        light: "white",
        dark: "#585858",
      },
    },
    error: {
      main: red.A400,
    },
    background: {
      light: "white",
      dark: "black",
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

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DARK_THEME": {
      return { ...state, mode: "dark" };
    }
    case "SET_LIGHT_THEME": {
      return { ...state, mode: "light" };
    }
    default:
      return state;
  }
};

export default themeReducer;
