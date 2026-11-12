
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((previous) => previous === "en" ? "te" : "en");
  };

  return (
    <BrowserRouter>
      <Header
        language={language}
        toggleLanguage={toggleLanguage}
      />

      <Routes>
        <Route path="/" element={<Home language={language} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
