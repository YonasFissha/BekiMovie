import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "@fortawesome/fontawesome-free/css/all.css";

// import "jquery/dist/jquery.js";
// import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
