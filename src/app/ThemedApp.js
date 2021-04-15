import { connect, useSelector } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import App from "./App.js";

//need to wrap app in theme provider so that page styles can be used
function AppWrapper() {
  const themeProps = useSelector((state) => state.themeReducer);
  const theme = createMuiTheme(themeProps);

  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

export default connect()(AppWrapper);
