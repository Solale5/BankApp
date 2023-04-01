import React from "react";
import ReactDOM from "react-dom/client";

{/* this import is necessary for react-boostrap elements
    ie accordian menu, modal popups, etc... */}
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
