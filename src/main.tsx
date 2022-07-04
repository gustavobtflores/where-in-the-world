import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { CountryDetails } from "./pages/CountryDetails";
import { Home } from "./pages/Home";
import "./static/css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path={`countries/:countryName`} element={<CountryDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
