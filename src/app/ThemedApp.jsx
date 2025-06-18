import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "app/App.jsx";

//need to wrap app in theme provider so that page styles can be used
function AppWrapper() {
  const themeProps = useSelector((state) => state.themeReducer);
  const theme = createTheme(themeProps);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default AppWrapper;
