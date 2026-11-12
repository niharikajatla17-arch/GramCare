
import React from "react";

function Header({ language, toggleLanguage }) {
  const isTelugu = language === "te";

  return (
    <header className="header">
      <div className="logo">🌿 GramCare</div>

      <nav>
        <a href="#home">
          {isTelugu ? "హోమ్" : "Home"}
        </a>

        <a href="#services">
          {isTelugu ? "సేవలు" : "Services"}
        </a>

        <a href="#about">
          {isTelugu ? "మా గురించి" : "About"}
        </a>
      </nav>

      <button
        className="language-btn"
        onClick={toggleLanguage}
      >
        {isTelugu ? "English" : "తెలుగు"}
      </button>
    </header>
  );
}

export default Header;
