import "styles/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import ThemedApp from "app/ThemedApp.jsx";
import { Provider } from "react-redux";
import store from "store/store";

import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
