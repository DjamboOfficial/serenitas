import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/authContext.js";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./redux/store"; // Import your Redux store

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      {" "}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);
