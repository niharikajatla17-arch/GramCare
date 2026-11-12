
import React from "react";

function Home({ language }) {
  const isTelugu = language === "te";

  const speakText = () => {
    if (!("speechSynthesis" in window)) {
      alert("Voice assistance is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const message = isTelugu
      ? "గ్రామ్ కేర్ కు స్వాగతం. మీ మందులు, ఆరోగ్య వివరాలు మరియు డాక్టర్ అపాయింట్మెంట్ల కోసం మా సేవలను ఉపయోగించండి."
      : "Welcome to GramCare. Use our services for your medicines, health records and doctor appointments.";

    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = isTelugu ? "te-IN" : "en-IN";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
  };

  const services = [
    {
      icon: "💊",
      title: isTelugu ? "నా మందులు" : "My Medicines",
      description: isTelugu
        ? "మీ మందులు మరియు రోజువారీ రిమైండర్లను చూడండి."
        : "View your medicines and daily reminders.",
      link: "#medicines",
    },
    {
      icon: "❤️",
      title: isTelugu ? "ఆరోగ్య వివరాలు" : "Health Records",
      description: isTelugu
        ? "మీ ఆరోగ్య సమాచారాన్ని భద్రపరచండి."
        : "Keep your health information organized.",
      link: "#health",
    },
    {
      icon: "📅",
      title: isTelugu ? "అపాయింట్‌మెంట్లు" : "Appointments",
      description: isTelugu
        ? "డాక్టర్ సందర్శనలు మరియు పరీక్షలను నిర్వహించండి."
        : "Manage doctor visits and checkups.",
      link: "#appointments",
    },
    {
      icon: "👩‍⚕️",
      title: isTelugu ? "డాక్టర్ సహాయం" : "Doctor Assistance",
      description: isTelugu
        ? "వైద్య నిపుణుల సహాయం పొందండి."
        : "Find help from healthcare professionals.",
      link: "#assistance",
    },
  ];

  return (
    <main id="home">
      <section className="hero">
        <div className="hero-content">
          <p className="welcome">
            {isTelugu ? "గ్రామ్ కేర్ కు స్వాగతం" : "WELCOME TO GRAMCARE"}
          </p>

          <h1>
            {isTelugu
              ? "మీ ఇంటి వద్దకే ఆరోగ్య సేవలు"
              : "Healthcare at Your Doorstep,"}
            <span>
              {isTelugu
                ? " మీ భాషలోనే సంరక్షణ."
                : " Care in Your Language."}
            </span>
          </h1>

          <p className="hero-description">
            {isTelugu
              ? "మీకు మరియు మీ కుటుంబానికి సులభమైన ఆరోగ్య సహాయం."
              : "Simple and accessible healthcare support for you and your family."}
          </p>

          <a href="#services" className="primary-btn">
            {isTelugu ? "సేవలను చూడండి →" : "Explore Services →"}
          </a>

          <button className="voice-btn" onClick={speakText}>
            🔊 {isTelugu ? "విని తెలుసుకోండి" : "Listen to Instructions"}
          </button>
        </div>

        <div className="hero-icon">🌿</div>
      </section>

      <section className="services" id="services">
        <h2>
          {isTelugu ? "మేము మీకు ఎలా సహాయపడగలం?" : "How Can We Help You?"}
        </h2>

        <p className="section-description">
          {isTelugu ? "ప్రారంభించడానికి ఒక సేవను ఎంచుకోండి." : "Choose a service to get started."}
        </p>

        <div className="service-grid">
          {services.map((service) => (
            <a
              href={service.link}
              className="service-card"
              key={service.title}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span>{isTelugu ? "చూడండి →" : "Explore →"}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="help-section" id="assistance">
        <div>
          <h2>
            {isTelugu ? "వైద్య సహాయం కావాలా?" : "Need Healthcare Assistance?"}
          </h2>

          <p>
            {isTelugu
              ? "అపాయింట్‌మెంట్లు, మందులు మరియు ఆరోగ్య సమాచారం కోసం సహాయం పొందండి."
              : "Get help with appointments, medicines and healthcare information."}
          </p>
        </div>

        <a href="tel:112" className="help-btn">
          {isTelugu ? "అత్యవసర సహాయం: 112" : "Emergency Help: 112"}
        </a>
      </section>
    </main>
  );
}

export default Home;
