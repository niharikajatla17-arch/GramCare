
import React, { useState, useEffect } from "react";
import "./FollowUps.css";

const STORAGE_KEY = "gramcare-followups";

function FollowUps({ language = "en" }) {
  const isTelugu = language === "te";

  const t = (english, telugu) =>
    isTelugu ? telugu : english;

  const [followUps, setFollowUps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(followUps));
  }, [followUps]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFollowUp = {
      id: Date.now(),
      doctor: form.doctor.trim(),
      date: form.date,
      reason: form.reason.trim(),
    };

    setFollowUps((previous) => [...previous, newFollowUp]);

    setForm({
      doctor: "",
      date: "",
      reason: "",
    });

    setMessage(
      t(
        "Follow-up reminder added successfully!",
        "ఫాలో-అప్ రిమైండర్ విజయవంతంగా జోడించబడింది!"
      )
    );
  };

  const handleDelete = (id) => {
    setFollowUps((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="followup-page">
      <header className="followup-header">
        <p className="followup-eyebrow">
          {t("GRAMCARE / PATIENT CARE", "గ్రామ్‌కేర్ / రోగి సంరక్షణ")}
        </p>

        <h1>
          {t("Follow-up Reminders", "ఫాలో-అప్ రిమైండర్‌లు")}
        </h1>

        <p>
          {t(
            "Never miss your next doctor visit.",
            "మీ తదుపరి డాక్టర్ సందర్శనను మిస్ అవ్వకండి."
          )}
        </p>
      </header>

      {message && (
        <div className="followup-success" role="status">
          ✓ {message}
        </div>
      )}

      <section className="followup-card">
        <h2>📅 {t("Add Follow-up", "ఫాలో-అప్ జోడించండి")}</h2>

        <p>
          {t(
            "Enter your next follow-up appointment details.",
            "మీ తదుపరి ఫాలో-అప్ అపాయింట్‌మెంట్ వివరాలను నమోదు చేయండి."
          )}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="followup-grid">
            <div className="followup-group">
              <label htmlFor="doctor">
                {t("Doctor Name *", "డాక్టర్ పేరు *")}
              </label>

              <input
                id="doctor"
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                placeholder={t(
                  "Enter doctor name",
                  "డాక్టర్ పేరు నమోదు చేయండి"
                )}
                required
              />
            </div>

            <div className="followup-group">
              <label htmlFor="date">
                {t("Follow-up Date *", "ఫాలో-అప్ తేదీ *")}
              </label>

              <input
                id="date"
                name="date"
                type="date"
                min={today}
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="followup-group full-width">
              <label htmlFor="reason">
                {t("Reason for Follow-up *", "ఫాలో-అప్ కారణం *")}
              </label>

              <textarea
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder={t(
                  "Enter reason for follow-up",
                  "ఫాలో-అప్ కారణాన్ని నమోదు చేయండి"
                )}
                required
              />
            </div>
          </div>

          <button type="submit" className="followup-btn">
            + {t("Add Reminder", "రిమైండర్ జోడించండి")}
          </button>
        </form>
      </section>

      <section className="followup-card">
        <h2>📋 {t("Scheduled Follow-ups", "షెడ్యూల్ చేసిన ఫాలో-అప్‌లు")}</h2>

        <p>
          {t("Total reminders:", "మొత్తం రిమైండర్‌లు:")}{" "}
          {followUps.length}
        </p>

        {followUps.length === 0 ? (
          <div className="followup-empty">
            {t(
              "No follow-up reminders added yet.",
              "ఇంకా ఫాలో-అప్ రిమైండర్‌లు జోడించలేదు."
            )}
          </div>
        ) : (
          <div className="followup-list">
            {followUps
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((item) => (
                <div className="followup-item" key={item.id}>
                  <div>
                    <h3>{item.doctor}</h3>

                    <p>📅 {item.date}</p>

                    <p>
                      {t("Reason:", "కారణం:")} {item.reason}
                    </p>

                    <span>
                      {item.date < today
                        ? t("Past", "గతించినది")
                        : t("Upcoming", "రాబోయేది")}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="delete-followup"
                    onClick={() => handleDelete(item.id)}
                  >
                    {t("Delete", "తొలగించండి")}
                  </button>
                </div>
              ))}
          </div>
        )}
      </section>

      <p className="followup-privacy">
        {t(
          "🔒 Follow-up details are stored locally in this prototype. Use fictional test data only.",
          "🔒 ఫాలో-అప్ వివరాలు ఈ ప్రోటోటైప్‌లో స్థానికంగా నిల్వ చేయబడతాయి. పరీక్ష కోసం కల్పిత వివరాలను మాత్రమే ఉపయోగించండి."
        )}
      </p>
    </div>
  );
}

export default FollowUps;
