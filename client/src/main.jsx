import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import ScrollToTop from "./utils/ScrollToTop";
import LandingPage from "./pages/LandingPage/LandingPage";
import About from "./pages/About/About";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Chats from "./pages/Chats/Chats";
import Library from "./pages/Library/Library";
import Profile from "./pages/Profile/Profile";
import AuthLayout from "./components/AuthLayout";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="about" element={<About />} />

          {/* Redirects the SignIn and Register pages to Home page when the user is authenticated */}
          <Route element={<AuthLayout requireAuth={false} />}>
            <Route index element={<LandingPage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<AuthLayout requireAuth={true} />}>
            <Route path="home" element={<Home />} />
            <Route path="chats" element={<Chats />} />
            <Route path="chats/:chatId" element={<Chats />} />
            <Route path="library" element={<Library />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
