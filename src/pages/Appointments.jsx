
import React, { useState, useEffect } from "react";
import "./Appointments.css";

const initialAppointments = [];

function Appointments() {
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem("gramcare-appointments");
      return saved ? JSON.parse(saved) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  const [form, setForm] = useState({
    doctor: "",
    specialty: "",
    date: "",
    time: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "gramcare-appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      ...form,
      status: "Upcoming",
    };

    setAppointments((previous) => [
      ...previous,
      newAppointment,
    ]);

    setForm({
      doctor: "",
      specialty: "",
      date: "",
      time: "",
      reason: "",
    });

    setMessage("Appointment booked successfully!");
  };

  const cancelAppointment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (confirmed) {
      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "Cancelled" }
            : appointment
        )
      );

      setMessage("Appointment cancelled.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="appointments-page">

      <header className="appointments-header">
        <div>
          <p className="appointments-eyebrow">
            GRAMCARE / PATIENT CARE
          </p>
          <h1>Doctor Appointments</h1>
          <p>Book and manage your doctor visits.</p>
        </div>
        <div className="appointment-avatar">🩺</div>
      </header>

      {message && (
        <div className="appointment-message" role="status">
          ✓ {message}
        </div>
      )}

      <section className="appointment-card">
        <div className="appointment-heading">
          <span>📅</span>
          <div>
            <h2>Book an Appointment</h2>
            <p>Enter the details to schedule a doctor visit.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="appointment-grid">

            <div className="appointment-group">
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

            <div className="appointment-group">
              <label htmlFor="specialty">Specialization *</label>
              <select
                id="specialty"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select specialization</option>
                <option value="General Physician">General Physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="appointment-group">
              <label htmlFor="date">Appointment Date *</label>
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

            <div className="appointment-group">
              <label htmlFor="time">Appointment Time *</label>
              <input
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="appointment-group full-width">
              <label htmlFor="reason">Reason for Visit *</label>
              <textarea
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Enter reason for appointment"
                rows="3"
                required
              />
            </div>

          </div>

          <div className="appointment-actions">
            <button type="submit" className="book-appointment-btn">
              + Book Appointment
            </button>
          </div>
        </form>
      </section>

      <section className="appointment-card">
        <div className="appointment-heading">
          <span>📋</span>
          <div>
            <h2>My Appointments</h2>
            <p>View and manage your scheduled visits.</p>
          </div>
        </div>

        <div className="appointment-count">
          Total appointments: {appointments.length}
        </div>

        {appointments.length === 0 ? (
          <div className="no-appointments">
            <span>📅</span>
            <p>No appointments booked yet.</p>
          </div>
        ) : (
          <div className="appointment-list">
            {appointments
              .slice()
              .sort((a, b) =>
                (a.date + a.time).localeCompare(b.date + b.time)
              )
              .map((appointment) => (
                <div
                  className="appointment-item"
                  key={appointment.id}
                >
                  <div className="appointment-item-info">
                    <h3>{appointment.doctor}</h3>
                    <p>{appointment.specialty}</p>
                    <p>📅 {appointment.date}</p>
                    <p>🕒 {appointment.time}</p>
                    <p>Reason: {appointment.reason}</p>
                    <span
                      className={`appointment-status ${
                        appointment.status === "Cancelled"
                          ? "cancelled"
                          : "upcoming"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  {appointment.status !== "Cancelled" && (
                    <button
                      type="button"
                      className="cancel-appointment-btn"
                      onClick={() =>
                        cancelAppointment(appointment.id)
                      }
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>

      <p className="appointment-privacy">
        🔒 Appointment details are stored locally in this prototype.
        Use fictional test data only.
      </p>

    </div>
  );
}

export default Appointments;
