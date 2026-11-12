
import React, { useState, useEffect } from "react";
import "./FollowUps.css";

const STORAGE_KEY = "gramcare-followups";

function FollowUps() {
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

    setMessage("Follow-up reminder added successfully!");
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
        <p className="followup-eyebrow">GRAMCARE / PATIENT CARE</p>
        <h1>Follow-up Reminders</h1>
        <p>Never miss your next doctor visit.</p>
      </header>

      {message && (
        <div className="followup-success" role="status">
          ✓ {message}
        </div>
      )}

      <section className="followup-card">
        <h2>📅 Add Follow-up</h2>
        <p>Enter your next follow-up appointment details.</p>

        <form onSubmit={handleSubmit}>
          <div className="followup-grid">
            <div className="followup-group">
              <label htmlFor="doctor">Doctor Name *</label>
              <input
                id="doctor"
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                placeholder="Enter doctor name"
                required
              />
            </div>

            <div className="followup-group">
              <label htmlFor="date">Follow-up Date *</label>
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
              <label htmlFor="reason">Reason for Follow-up *</label>
              <textarea
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Enter reason for follow-up"
                required
              />
            </div>
          </div>

          <button type="submit" className="followup-btn">
            + Add Reminder
          </button>
        </form>
      </section>

      <section className="followup-card">
        <h2>📋 Scheduled Follow-ups</h2>
        <p>Total reminders: {followUps.length}</p>

        {followUps.length === 0 ? (
          <div className="followup-empty">
            No follow-up reminders added yet.
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
                    <p>Reason: {item.reason}</p>
                    <span>
                      {item.date < today ? "Past" : "Upcoming"}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="delete-followup"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        )}
      </section>

      <p className="followup-privacy">
        🔒 Follow-up details are stored locally in this prototype.
        Use fictional test data only.
      </p>
    </div>
  );
}

export default FollowUps;
