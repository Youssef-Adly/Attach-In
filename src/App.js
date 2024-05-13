import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import FQAPage from "./pages/FQAPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import OurPartnersPage from "./pages/OurPartnersPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQ" element={<FQAPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        <Route path="/partners" element={<OurPartnersPage />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
