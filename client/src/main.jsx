import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./utils/ScrollToTop";
import LandingPage from "./pages/LandingPage/LandingPage";
import About from "./pages/About/About";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Chats from "./pages/Chats/Chats";
import Library from "./pages/Library/Library";

// TODO: Need to protect the routes that require authentication
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} path="/" element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="chats" element={<Chats />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
