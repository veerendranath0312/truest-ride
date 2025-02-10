import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./pages/LandingPage/LandingPage";
import About from "./pages/About/About";
import SIgnIn from "./pages/SIgnIn/SignIn";
import Register from "./pages/Register/Register";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} path="/" element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="signin" element={<SIgnIn />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
