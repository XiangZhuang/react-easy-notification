import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NotificationProvider } from "./components/Notification/Notification";

ReactDOM.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
  document.getElementById("app")
);
