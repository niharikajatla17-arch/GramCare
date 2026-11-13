
import React, { useState } from "react";
import "./DoctorAssistance.css";

const PROFILE_KEY = "gramcare-patient-profile";
const REQUESTS_KEY = "gramcare-home-visit-requests";

const emptyProfile = {
  name: "",
  age: "",
  village: "",
  phone: "",
};

function getSavedProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));

    return saved
      ? { ...emptyProfile, ...saved }
      : emptyProfile;
  } catch {
    return emptyProfile;
  }
}

function getSavedRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(REQUESTS_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function DoctorAssistance({ language = "en" }) {
  const isTelugu = language === "te";

  const t = (english, telugu) =>
    isTelugu ? telugu : english;

  const [profile] = useState(getSavedProfile);
  const [requests, setRequests] = useState(getSavedRequests);

  const [form, setForm] = useState({
    street: "",
    houseNumber: "",
    reason: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!profile.name || !profile.phone) {
      setMessage(
        t(
          "Please save your name and phone number in Patient Profile first.",
          "ముందుగా రోగి వివరాలలో మీ పేరు మరియు ఫోన్ నంబర్‌ను సేవ్ చేయండి."
        )
      );
      return;
    }

    const newRequest = {
      id: Date.now(),
      patientName: profile.name,
      age: profile.age,
      phone: profile.phone,
      village: profile.village,
      street: form.street,
      houseNumber: form.houseNumber,
      reason: form.reason,
      date: form.date,
      time: form.time,
      status: "Pending",
    };

    const updatedRequests = [newRequest, ...requests];

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(updatedRequests)
    );

    setRequests(updatedRequests);

    setForm({
      street: "",
      houseNumber: "",
      reason: "",
      date: "",
      time: "",
    });

    setMessage(
      t(
        "Your home visit request has been submitted successfully!",
        "మీ ఇంటి సందర్శన అభ్యర్థన విజయవంతంగా సమర్పించబడింది!"
      )
    );
  };

  const getStatusText = (status) => {
    if (status === "Approved") {
      return t("Approved", "ఆమోదించబడింది");
    }

    if (status === "Completed") {
      return t("Completed", "పూర్తయింది");
    }

    return t("Pending", "పెండింగ్‌లో ఉంది");
  };

  return (
    <main className="doctor-assistance-page">
      <section className="doctor-assistance-header">
        <h2>
          👩‍⚕️ {t("Doctor Assistance", "డాక్టర్ సహాయం")}
        </h2>

        <p>
          {t(
            "Request healthcare support at your doorstep.",
            "మీ ఇంటి వద్దకే వైద్య సహాయం కోసం అభ్యర్థించండి."
          )}
        </p>
      </section>

      <section className="home-visit-card">
        <h3>
          🏠 {t("Request a Home Visit", "ఇంటి సందర్శన కోసం అభ్యర్థించండి")}
        </h3>

        <p className="doctor-card-description">
          {t(
            "Your saved Patient Profile details are used below.",
            "మీరు సేవ్ చేసిన రోగి వివరాలు క్రింద చూపబడతాయి."
          )}
        </p>

        {!profile.name || !profile.phone ? (
          <div className="profile-warning">
            <p>
              {t(
                "Please complete and save your Patient Profile before requesting a home visit.",
                "ఇంటి సందర్శన కోసం అభ్యర్థించే ముందు మీ రోగి వివరాలను పూర్తి చేసి సేవ్ చేయండి."
              )}
            </p>

            <a href="/patient-profile">
              {t("Go to Patient Profile", "రోగి వివరాలకు వెళ్లండి")}
            </a>
          </div>
        ) : (
          <>
            <div className="saved-patient-details">
              <h4>{t("Patient Details", "రోగి వివరాలు")}</h4>

              <div className="patient-detail-grid">
                <div>
                  <span>{t("Patient Name", "రోగి పేరు")}</span>
                  <strong>{profile.name}</strong>
                </div>

                <div>
                  <span>{t("Age", "వయస్సు")}</span>
                  <strong>{profile.age || "—"}</strong>
                </div>

                <div>
                  <span>{t("Phone Number", "ఫోన్ నంబర్")}</span>
                  <strong>{profile.phone}</strong>
                </div>

                <div>
                  <span>{t("Village", "గ్రామం")}</span>
                  <strong>{profile.village || "—"}</strong>
                </div>
              </div>

              <a
                className="edit-profile-link"
                href="/patient-profile"
              >
                {t("Edit Patient Profile", "రోగి వివరాలను మార్చండి")}
              </a>
            </div>

            <form
              className="home-visit-form"
              onSubmit={handleSubmit}
            >
              <h4>{t("Visit Address", "సందర్శన చిరునామా")}</h4>

              <label htmlFor="visit-street">
                {t("Street Name", "వీధి పేరు")}
              </label>
              <input
                id="visit-street"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder={t(
                  "Enter street name",
                  "వీధి పేరు నమోదు చేయండి"
                )}
                required
              />

              <label htmlFor="visit-house">
                {t("House Number", "ఇంటి నంబర్")}
              </label>
              <input
                id="visit-house"
                name="houseNumber"
                value={form.houseNumber}
                onChange={handleChange}
                placeholder={t(
                  "Enter house number",
                  "ఇంటి నంబర్ నమోదు చేయండి"
                )}
                required
              />

              <h4>{t("Visit Details", "సందర్శన వివరాలు")}</h4>

              <label htmlFor="visit-reason">
                {t("Reason for Home Visit", "ఇంటి సందర్శనకు కారణం")}
              </label>
              <textarea
                id="visit-reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder={t(
                  "Explain why you need a home visit",
                  "ఇంటి సందర్శన ఎందుకు అవసరమో వివరించండి"
                )}
                rows="4"
                required
              />

              <label htmlFor="visit-date">
                {t("Preferred Date", "కావలసిన తేదీ")}
              </label>
              <input
                id="visit-date"
                type="date"
                name="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                required
              />

              <label htmlFor="visit-time">
                {t("Preferred Time", "కావలసిన సమయం")}
              </label>
              <input
                id="visit-time"
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />

              <button type="submit" className="home-visit-submit">
                {t("Submit Home Visit Request", "ఇంటి సందర్శన అభ్యర్థనను సమర్పించండి")}
              </button>
            </form>
          </>
        )}

        {message && (
          <p className="home-visit-message" role="status">
            {message}
          </p>
        )}
      </section>

      <section className="home-visit-history">
        <h3>
          📋 {t("Home Visit Request History", "ఇంటి సందర్శన అభ్యర్థనల చరిత్ర")}
        </h3>

        {requests.length === 0 ? (
          <p className="no-home-requests">
            {t(
              "No home visit requests yet.",
              "ఇంకా ఇంటి సందర్శన అభ్యర్థనలు లేవు."
            )}
          </p>
        ) : (
          <div className="home-request-list">
            {requests.map((request) => (
              <article
                className="home-request-item"
                key={request.id}
              >
                <div className="home-request-top">
                  <h4>{request.patientName}</h4>

                  <span
                    className={`home-request-status ${request.status.toLowerCase()}`}
                  >
                    {getStatusText(request.status)}
                  </span>
                </div>

                <p>
                  <strong>{t("Phone:", "ఫోన్:")}</strong>{" "}
                  {request.phone}
                </p>

                <p>
                  <strong>{t("Village:", "గ్రామం:")}</strong>{" "}
                  {request.village || "—"}
                </p>

                <p>
                  <strong>{t("Address:", "చిరునామా:")}</strong>{" "}
                  {request.houseNumber}, {request.street}
                </p>

                <p>
                  <strong>{t("Reason:", "కారణం:")}</strong>{" "}
                  {request.reason}
                </p>

                <p>
                  <strong>{t("Preferred Date:", "కావలసిన తేదీ:")}</strong>{" "}
                  {request.date}
                </p>

                <p>
                  <strong>{t("Preferred Time:", "కావలసిన సమయం:")}</strong>{" "}
                  {request.time}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="doctor-assistance-note">
        {t(
          "This is a demonstration request system. Submitting a request does not guarantee a doctor visit. Please contact your local healthcare provider to confirm arrangements. This prototype stores data only in this browser.",
          "ఇది ఒక నమూనా అభ్యర్థన వ్యవస్థ మాత్రమే. అభ్యర్థన సమర్పించడం ద్వారా డాక్టర్ సందర్శన ఖరారు కాదు. ఏర్పాట్లను నిర్ధారించుకోవడానికి మీ స్థానిక వైద్య సేవల ప్రదాతను సంప్రదించండి. ఈ ప్రోటోటైప్ సమాచారాన్ని ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ చేస్తుంది."
        )}
      </p>
    </main>
  );
}

export default DoctorAssistance;
