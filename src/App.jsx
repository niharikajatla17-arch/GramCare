
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Medicine from "./Medicine";
import HealthRecords from "./HealthRecords";
import PatientProfile from "./PatientProfile";
import Appointments from "./pages/Appointments";
import FollowUps from "./pages/FollowUps";
import DoctorAssistance from "./pages/DoctorAssistance";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((previous) => (previous === "en" ? "te" : "en"));
  };

  return (
    <BrowserRouter>
      <Header
        language={language}
        toggleLanguage={toggleLanguage}
      />

      <Routes>
        <Route path="/" element={<Home language={language} />} />

        <Route
          path="/medicines"
          element={<Medicine language={language} />}
        />

        <Route
          path="/health-records"
          element={<HealthRecords language={language} />}
        />

        <Route
          path="/patient-profile"
          element={<PatientProfile language={language} />}
        />

        <Route
          path="/appointments"
          element={<Appointments language={language} />}
        />

        <Route
          path="/follow-ups"
          element={<FollowUps language={language} />}
        />

        <Route
          path="/doctor-assistance"
          element={<DoctorAssistance language={language} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
