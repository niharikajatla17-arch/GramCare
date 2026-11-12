import { useState, useEffect } from "react";
import "./Medicine.css";

const reminderTimes = {
  Morning: "08:00",
  Afternoon: "13:00",
  Night: "20:00",
};

function Medicine() {
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

  useEffect(() => {
    localStorage.setItem(
      "gramcare-medicines",
      JSON.stringify(medicines)
    );
  }, [medicines]);

  const addMedicine = (e) => {
    e.preventDefault();

    if (!name.trim() || !dosage.trim()) {
      alert("Please enter medicine name and dosage.");
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
        "Your browser does not support notifications."
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        setReminderStatus(
          "Reminders enabled! Keep GramCare open for reminders."
        );

        new Notification("GramCare", {
          body: "Medicine reminders are now enabled!",
        });
      } else {
        setReminderStatus(
          "Notifications were not allowed. Please enable them in browser settings."
        );
      }
    } catch {
      setReminderStatus("Unable to enable notifications.");
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
            new Notification("GramCare Medicine Reminder 💊", {
              body: `Time for ${med.name} - ${med.dosage}. Please follow your prescription.`,
            });

            localStorage.setItem(reminderKey, "sent");
          }
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 15000);

    return () => clearInterval(interval);
  }, [medicines]);

  const speak = (message) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = "en-IN";
      speech.rate = 0.85;

      window.speechSynthesis.speak(speech);
    } else {
      alert("Voice assistance is not supported in this browser.");
    }
  };

  return (
    <div className="medicine-page">
      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR HEALTH COMPANION</p>
            <h2>Good day! 👋</h2>
            <p>Manage your medicines and stay on track with your health.</p>
          </div>
          <div className="welcome-icon">💚</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>💊</span>
            <h3>{medicines.length}</h3>
            <p>Saved Medicines</p>
          </div>
          <div className="stat-card">
            <span>🔔</span>
            <h3>3</h3>
            <p>Reminder Slots</p>
          </div>
          <div className="stat-card">
            <span>📋</span>
            <h3>{file ? "1" : "0"}</h3>
            <p>Uploaded Records</p>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>💊 Medicine Management</h2>
              <p>Add and manage your prescribed medicines.</p>
            </div>
          </div>

          <form className="medicine-form" onSubmit={addMedicine}>
            <h3>➕ Add New Medicine</h3>

            <label>Medicine Name</label>
            <input
              type="text"
              placeholder="Enter medicine name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Dosage (as prescribed)</label>
            <input
              type="text"
              placeholder="Example: 1 tablet"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />

            <label>Reminder Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Night</option>
            </select>

            <button type="submit" className="primary-btn">
              + Add Medicine
            </button>
          </form>
        </section>

        <section className="section">
          <h2>📋 My Medicine List</h2>

          {medicines.length === 0 ? (
            <div className="empty-state">
              <span>💊</span>
              <h3>No medicines added yet</h3>
              <p>Add medicines according to your doctor's prescription.</p>
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
                      🕒 {med.time} ({reminderTimes[med.time]})
                    </span>
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteMedicine(med.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>🔔 Medicine Reminders</h2>
          <p className="section-description">
            Receive browser notifications at your selected medicine times.
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
                  <h3>{title}</h3>
                  <p>{clock}</p>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="primary-btn"
              onClick={enableReminders}
            >
              🔔 Enable Medicine Notifications
            </button>

            <p className="section-description" role="status">
              {reminderStatus}
            </p>
          </div>
        </section>

        <section className="section">
          <h2>📸 Prescription Records</h2>
          <p className="section-description">
            Upload a photo or PDF of your doctor's prescription for easy reference.
          </p>

          <label className="upload-box">
            <span>📁</span>
            <strong>Upload Prescription</strong>
            <small>Choose an image or PDF file</small>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          {file && <p className="file-name">✓ Selected: {file.name}</p>}
        </section>

        <section className="voice-section">
          <div>
            <h2>🔊 Voice Assistance</h2>
            <p>Listen to your medicine schedule.</p>
          </div>

          <button
            type="button"
            className="voice-btn"
            onClick={() =>
              speak(
                medicines.length
                  ? "Your saved medicines are: " +
                      medicines
                        .map((m) => `${m.name}, ${m.dosage}, ${m.time}`)
                        .join(". ")
                  : "You have not added any medicines yet."
              )
            }
          >
            🔊 Read My Medicines
          </button>
        </section>

        <p className="disclaimer">
          Important: Enter medicines and dosages only as prescribed by a
          qualified healthcare professional. GramCare does not diagnose
          illnesses or recommend medicines.
        </p>
      </main>
    </div>
  );
}

export default Medicine;