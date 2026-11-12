 
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import PatientProfile from "./pages/PatientProfile";
import Appointments from "./pages/Appointments";
import FollowUps from "./pages/FollowUps";

import "./App.css";

function App() {
  const [language, setLanguage] = useState("en");

  return (
    <BrowserRouter>
      <div className="gramcare-app">
        <header className="gramcare-header">
          <div>
            <h1>🌿 GramCare</h1>
            <p>Healthcare support for every village</p>
          </div>

          <button
            onClick={() =>
              setLanguage((previous) =>
                previous === "en" ? "te" : "en"
              )
            }
          >
            {language === "en" ? "తెలుగు" : "English"}
          </button>
        </header>

        <nav className="gramcare-nav">
          <Link to="/patient-profile">Patient Profile</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/follow-ups">Follow-ups</Link>
        </nav>

        <main className="gramcare-main">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/patient-profile" replace />}
            />
            <Route
              path="/patient-profile"
              element={<PatientProfile />}
            />
            <Route
              path="/appointments"
              element={<Appointments />}
            />
            <Route
              path="/follow-ups"
              element={<FollowUps />}
            />
          </Routes>
        </main>

        <footer className="gramcare-footer">
          <p>© 2026 GramCare | Village Healthcare Support</p>
          <p>Prototype — use fictional patient data only.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
