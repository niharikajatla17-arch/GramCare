
import { useState, useEffect } from "react";
import "./Medicine.css";

const reminderTimes = {
  Morning: "08:00",
  Afternoon: "13:00",
  Night: "20:00",
};

function Medicine({ language }) {
  const isTelugu = language === "te";

  const [medicines, setMedicines] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gramcare-medicines")) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("Morning");
  const [file, setFile] = useState(null);
  const [reminderStatus, setReminderStatus] = useState(
    "Notifications are not enabled yet."
  );

  const t = (english, telugu) => (isTelugu ? telugu : english);

  useEffect(() => {
    localStorage.setItem(
      "gramcare-medicines",
      JSON.stringify(medicines)
    );
  }, [medicines]);

  const addMedicine = (e) => {
    e.preventDefault();

    if (!name.trim() || !dosage.trim()) {
      alert(t(
        "Please enter medicine name and dosage.",
        "దయచేసి మందు పేరు మరియు మోతాదును నమోదు చేయండి."
      ));
      return;
    }

    const newMedicine = {
      id: Date.now(),
      name: name.trim(),
      dosage: dosage.trim(),
      time,
    };

    setMedicines((previous) => [...previous, newMedicine]);
    setName("");
    setDosage("");
    setTime("Morning");
  };

  const deleteMedicine = (id) => {
    setMedicines((previous) =>
      previous.filter((med) => med.id !== id)
    );
  };

  const enableReminders = async () => {
    if (!("Notification" in window)) {
      setReminderStatus(
        t(
          "Your browser does not support notifications.",
          "మీ బ్రౌజర్ నోటిఫికేషన్‌లకు మద్దతు ఇవ్వదు."
        )
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        setReminderStatus(
          t(
            "Reminders enabled! Keep GramCare open for reminders.",
            "రిమైండర్‌లు ప్రారంభించబడ్డాయి! రిమైండర్‌ల కోసం GramCare తెరిచి ఉంచండి."
          )
        );

        new Notification("GramCare", {
          body: t(
            "Medicine reminders are now enabled!",
            "మందుల రిమైండర్‌లు ఇప్పుడు ప్రారంభించబడ్డాయి!"
          ),
        });
      } else {
        setReminderStatus(
          t(
            "Notifications were not allowed. Please enable them in browser settings.",
            "నోటిఫికేషన్‌లకు అనుమతి లభించలేదు. దయచేసి బ్రౌజర్ సెట్టింగ్‌లలో ప్రారంభించండి."
          )
        );
      }
    } catch {
      setReminderStatus(
        t(
          "Unable to enable notifications.",
          "నోటిఫికేషన్‌లను ప్రారంభించడం సాధ్యం కాలేదు."
        )
      );
    }
  };

  useEffect(() => {
    if (
      !("Notification" in window) ||
      Notification.permission !== "granted"
    ) {
      return;
    }

    const checkReminders = () => {
      const now = new Date();

      const currentHour = String(now.getHours()).padStart(2, "0");
      const currentMinute = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${currentHour}:${currentMinute}`;

      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      medicines.forEach((med) => {
        const scheduledTime = reminderTimes[med.time];

        if (scheduledTime === currentTime) {
          const reminderKey = `gramcare-reminder-${today}-${med.id}`;

          if (!localStorage.getItem(reminderKey)) {
            new Notification(
              t(
                "GramCare Medicine Reminder 💊",
                "GramCare మందుల రిమైండర్ 💊"
              ),
              {
                body: `${t("Time for", "మందు తీసుకునే సమయం")}: ${med.name} - ${med.dosage}.`,
              }
            );

            localStorage.setItem(reminderKey, "sent");
          }
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 15000);

    return () => clearInterval(interval);
  }, [medicines, isTelugu]);

  const speak = (message) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = isTelugu ? "te-IN" : "en-IN";
      speech.rate = 0.85;

      window.speechSynthesis.speak(speech);
    } else {
      alert(
        t(
          "Voice assistance is not supported in this browser.",
          "ఈ బ్రౌజర్‌లో వాయిస్ సహాయం అందుబాటులో లేదు."
        )
      );
    }
  };

  const timeLabels = {
    Morning: t("Morning", "ఉదయం"),
    Afternoon: t("Afternoon", "మధ్యాహ్నం"),
    Night: t("Night", "రాత్రి"),
  };

  return (
    <div className="medicine-page">
      <main className="container">

        {/* Welcome */}
        <section className="medicine-welcome">
          <div>
            <p className="eyebrow">
              {t("YOUR HEALTH COMPANION", "మీ ఆరోగ్య సహచరుడు")}
            </p>

            <h2>{t("Good day! 👋", "శుభోదయం! 👋")}</h2>

            <p>
              {t(
                "Manage your medicines and stay on track with your health.",
                "మీ మందులను నిర్వహించండి మరియు మీ ఆరోగ్యాన్ని క్రమంగా పర్యవేక్షించండి."
              )}
            </p>
          </div>
          <div className="welcome-icon">💚</div>
        </section>

        {/* Statistics */}
        <section className="stats">
          <div className="stat-card">
            <span>💊</span>
            <h3>{medicines.length}</h3>
            <p>{t("Saved Medicines", "సేవ్ చేసిన మందులు")}</p>
          </div>

          <div className="stat-card">
            <span>🔔</span>
            <h3>3</h3>
            <p>{t("Reminder Slots", "రిమైండర్ సమయాలు")}</p>
          </div>

          <div className="stat-card">
            <span>📋</span>
            <h3>{file ? "1" : "0"}</h3>
            <p>{t("Uploaded Records", "అప్‌లోడ్ చేసిన రికార్డులు")}</p>
          </div>
        </section>

        {/* Add Medicine */}
        <section className="section">
          <div className="section-heading">
            <div>
              <h2>💊 {t("Medicine Management", "మందుల నిర్వహణ")}</h2>
              <p>
                {t(
                  "Add and manage your prescribed medicines.",
                  "మీకు సూచించిన మందులను జోడించండి మరియు నిర్వహించండి."
                )}
              </p>
            </div>
          </div>

          <form className="medicine-form" onSubmit={addMedicine}>
            <h3>➕ {t("Add New Medicine", "కొత్త మందును జోడించండి")}</h3>

            <label>{t("Medicine Name", "మందు పేరు")}</label>
            <input
              type="text"
              placeholder={t("Enter medicine name", "మందు పేరు నమోదు చేయండి")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>{t("Dosage (as prescribed)", "మోతాదు (వైద్యుడు సూచించినట్లు)")}</label>
            <input
              type="text"
              placeholder={t("Example: 1 tablet", "ఉదాహరణ: 1 టాబ్లెట్")}
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />

            <label>{t("Reminder Time", "రిమైండర్ సమయం")}</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="Morning">{timeLabels.Morning}</option>
              <option value="Afternoon">{timeLabels.Afternoon}</option>
              <option value="Night">{timeLabels.Night}</option>
            </select>

            <button type="submit" className="primary-btn">
              + {t("Add Medicine", "మందును జోడించండి")}
            </button>
          </form>
        </section>

        {/* Medicine List */}
        <section className="section">
          <h2>📋 {t("My Medicine List", "నా మందుల జాబితా")}</h2>

          {medicines.length === 0 ? (
            <div className="empty-state">
              <span>💊</span>
              <h3>{t("No medicines added yet", "ఇంకా మందులు జోడించలేదు")}</h3>
              <p>
                {t(
                  "Add medicines according to your doctor's prescription.",
                  "మీ వైద్యుడు సూచించిన మందులను జోడించండి."
                )}
              </p>
            </div>
          ) : (
            <div className="medicine-list">
              {medicines.map((med) => (
                <div className="medicine-card" key={med.id}>
                  <div className="medicine-icon">💊</div>

                  <div className="medicine-info">
                    <h3>{med.name}</h3>
                    <p>{med.dosage}</p>
                    <span className="time-tag">
                      🕒 {timeLabels[med.time]} ({reminderTimes[med.time]})
                    </span>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteMedicine(med.id)}
                    aria-label={t("Delete medicine", "మందును తొలగించండి")}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reminders */}
        <section className="section">
          <h2>🔔 {t("Medicine Reminders", "మందుల రిమైండర్‌లు")}</h2>

          <p className="section-description">
            {t(
              "Receive browser notifications at your selected medicine times.",
              "మీరు ఎంచుకున్న మందుల సమయాల్లో బ్రౌజర్ నోటిఫికేషన్‌లను పొందండి."
            )}
          </p>

          <div className="medicine-form">
            {[
              ["🌅", "Morning", "8:00 AM"],
              ["☀️", "Afternoon", "1:00 PM"],
              ["🌙", "Night", "8:00 PM"],
            ].map(([icon, title, clock]) => (
              <div className="medicine-card" key={title}>
                <span>{icon}</span>
                <div className="medicine-info">
                  <h3>{timeLabels[title]}</h3>
                  <p>{clock}</p>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="primary-btn"
              onClick={enableReminders}
            >
              🔔 {t(
                "Enable Medicine Notifications",
                "మందుల నోటిఫికేషన్‌లను ప్రారంభించండి"
              )}
            </button>

            <p className="section-description" role="status">
              {reminderStatus}
            </p>
          </div>
        </section>

        {/* Prescription */}
        <section className="section">
          <h2>📸 {t("Prescription Records", "ప్రిస్క్రిప్షన్ రికార్డులు")}</h2>

          <p className="section-description">
            {t(
              "Upload a photo or PDF of your doctor's prescription for easy reference.",
              "సులభంగా చూడటానికి మీ వైద్యుని ప్రిస్క్రిప్షన్ ఫోటో లేదా PDF అప్‌లోడ్ చేయండి."
            )}
          </p>

          <label className="upload-box">
            <span>📁</span>
            <strong>{t("Upload Prescription", "ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి")}</strong>
            <small>{t("Choose an image or PDF file", "చిత్రం లేదా PDF ఫైల్ ఎంచుకోండి")}</small>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          {file && (
            <p className="file-name">
              ✓ {t("Selected:", "ఎంచుకున్నది:")} {file.name}
            </p>
          )}
        </section>

        {/* Voice Assistance */}
        <section className="voice-section">
          <div>
            <h2>🔊 {t("Voice Assistance", "వాయిస్ సహాయం")}</h2>
            <p>
              {t(
                "Listen to your medicine schedule.",
                "మీ మందుల షెడ్యూల్‌ను వినండి."
              )}
            </p>
          </div>

          <button
            type="button"
            className="voice-btn"
            onClick={() =>
              speak(
                medicines.length
                  ? t(
                      "Your saved medicines are: ",
                      "మీరు సేవ్ చేసిన మందులు: "
                    ) +
                      medicines
                        .map((m) => `${m.name}, ${m.dosage}, ${timeLabels[m.time]}`)
                        .join(". ")
                  : t(
                      "You have not added any medicines yet.",
                      "మీరు ఇంకా మందులను జోడించలేదు."
                    )
              )
            }
          >
            🔊 {t("Read My Medicines", "నా మందులను చదవండి")}
          </button>
        </section>

        {/* Disclaimer */}
        <p className="disclaimer">
          {t(
            "Important: Enter medicines and dosages only as prescribed by a qualified healthcare professional. GramCare does not diagnose illnesses or recommend medicines.",
            "ముఖ్యమైనది: అర్హత కలిగిన వైద్య నిపుణుడు సూచించిన మందులు మరియు మోతాదులను మాత్రమే నమోదు చేయండి. GramCare వ్యాధులను నిర్ధారించదు లేదా మందులను సిఫార్సు చేయదు."
          )}
        </p>

      </main>
    </div>
  );
}

export default Medicine;
