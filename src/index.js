import React from "react";
import ReactDOM from "react-dom";
import "styles/index.css";
import App from "./app/App";
import theme from "config/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "redux/store.js";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
