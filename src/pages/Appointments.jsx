
import React, { useState, useEffect } from "react";
import "./Appointments.css";

const initialAppointments = [];

function Appointments({ language = "en" }) {
  const isTelugu = language === "te";

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

  const text = {
    eyebrow: isTelugu ? "గ్రామ్‌కేర్ / రోగి సంరక్షణ" : "GRAMCARE / PATIENT CARE",
    title: isTelugu ? "డాక్టర్ అపాయింట్‌మెంట్లు" : "Doctor Appointments",
    subtitle: isTelugu ? "మీ డాక్టర్ సందర్శనలను బుక్ చేసి నిర్వహించండి." : "Book and manage your doctor visits.",
    bookTitle: isTelugu ? "అపాయింట్‌మెంట్ బుక్ చేయండి" : "Book an Appointment",
    bookSubtitle: isTelugu ? "డాక్టర్ సందర్శనను షెడ్యూల్ చేయడానికి వివరాలను నమోదు చేయండి." : "Enter the details to schedule a doctor visit.",
    doctor: isTelugu ? "డాక్టర్ పేరు *" : "Doctor Name *",
    doctorPlaceholder: isTelugu ? "డాక్టర్ పేరు నమోదు చేయండి" : "Enter doctor name",
    specialty: isTelugu ? "వైద్య ప్రత్యేకత *" : "Specialization *",
    selectSpecialty: isTelugu ? "ప్రత్యేకతను ఎంచుకోండి" : "Select specialization",
    general: isTelugu ? "సాధారణ వైద్యుడు" : "General Physician",
    cardiologist: isTelugu ? "గుండె వైద్య నిపుణుడు" : "Cardiologist",
    dermatologist: isTelugu ? "చర్మ వైద్య నిపుణుడు" : "Dermatologist",
    pediatrician: isTelugu ? "పిల్లల వైద్యుడు" : "Pediatrician",
    gynecologist: isTelugu ? "స్త్రీ వైద్య నిపుణుడు" : "Gynecologist",
    orthopedic: isTelugu ? "ఎముకల వైద్య నిపుణుడు" : "Orthopedic",
    other: isTelugu ? "ఇతర" : "Other",
    date: isTelugu ? "అపాయింట్‌మెంట్ తేదీ *" : "Appointment Date *",
    time: isTelugu ? "అపాయింట్‌మెంట్ సమయం *" : "Appointment Time *",
    reason: isTelugu ? "సందర్శన కారణం *" : "Reason for Visit *",
    reasonPlaceholder: isTelugu ? "అపాయింట్‌మెంట్ కారణాన్ని నమోదు చేయండి" : "Enter reason for appointment",
    bookButton: isTelugu ? "అపాయింట్‌మెంట్ బుక్ చేయండి" : "Book Appointment",
    myAppointments: isTelugu ? "నా అపాయింట్‌మెంట్లు" : "My Appointments",
    myAppointmentsSubtitle: isTelugu ? "మీ షెడ్యూల్ చేసిన సందర్శనలను చూడండి మరియు నిర్వహించండి." : "View and manage your scheduled visits.",
    total: isTelugu ? "మొత్తం అపాయింట్‌మెంట్లు:" : "Total appointments:",
    noAppointments: isTelugu ? "ఇంకా అపాయింట్‌మెంట్లు బుక్ చేయలేదు." : "No appointments booked yet.",
    reasonLabel: isTelugu ? "కారణం:" : "Reason:",
    upcoming: isTelugu ? "రాబోయేవి" : "Upcoming",
    cancelled: isTelugu ? "రద్దు చేయబడింది" : "Cancelled",
    cancel: isTelugu ? "రద్దు చేయండి" : "Cancel",
    booked: isTelugu ? "అపాయింట్‌మెంట్ విజయవంతంగా బుక్ చేయబడింది!" : "Appointment booked successfully!",
    cancelMessage: isTelugu ? "అపాయింట్‌మెంట్ రద్దు చేయబడింది." : "Appointment cancelled.",
    confirmCancel: isTelugu ? "ఈ అపాయింట్‌మెంట్‌ను రద్దు చేయాలనుకుంటున్నారా?" : "Are you sure you want to cancel this appointment?",
    privacy: isTelugu
      ? "🔒 అపాయింట్‌మెంట్ వివరాలు ఈ నమూనా అప్లికేషన్‌లో స్థానికంగా నిల్వ చేయబడతాయి. పరీక్ష కోసం కల్పిత వివరాలను మాత్రమే ఉపయోగించండి."
      : "🔒 Appointment details are stored locally in this prototype. Use fictional test data only.",
  };

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

    setMessage(text.booked);
  };

  const cancelAppointment = (id) => {
    const confirmed = window.confirm(text.confirmCancel);

    if (confirmed) {
      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "Cancelled" }
            : appointment
        )
      );

      setMessage(text.cancelMessage);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const translateSpecialty = (specialty) => {
    const translations = {
      "General Physician": text.general,
      Cardiologist: text.cardiologist,
      Dermatologist: text.dermatologist,
      Pediatrician: text.pediatrician,
      Gynecologist: text.gynecologist,
      Orthopedic: text.orthopedic,
      Other: text.other,
    };

    return translations[specialty] || specialty;
  };

  return (
    <div className="appointments-page">

      <header className="appointments-header">
        <div>
          <p className="appointments-eyebrow">
            {text.eyebrow}
          </p>
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
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
            <h2>{text.bookTitle}</h2>
            <p>{text.bookSubtitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="appointment-grid">

            <div className="appointment-group">
              <label htmlFor="doctor">{text.doctor}</label>
              <input
                id="doctor"
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                placeholder={text.doctorPlaceholder}
                required
              />
            </div>

            <div className="appointment-group">
              <label htmlFor="specialty">{text.specialty}</label>
              <select
                id="specialty"
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                required
              >
                <option value="">{text.selectSpecialty}</option>
                <option value="General Physician">{text.general}</option>
                <option value="Cardiologist">{text.cardiologist}</option>
                <option value="Dermatologist">{text.dermatologist}</option>
                <option value="Pediatrician">{text.pediatrician}</option>
                <option value="Gynecologist">{text.gynecologist}</option>
                <option value="Orthopedic">{text.orthopedic}</option>
                <option value="Other">{text.other}</option>
              </select>
            </div>

            <div className="appointment-group">
              <label htmlFor="date">{text.date}</label>
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
              <label htmlFor="time">{text.time}</label>
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
              <label htmlFor="reason">{text.reason}</label>
              <textarea
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder={text.reasonPlaceholder}
                rows="3"
                required
              />
            </div>

          </div>

          <div className="appointment-actions">
            <button type="submit" className="book-appointment-btn">
              + {text.bookButton}
            </button>
          </div>
        </form>
      </section>

      <section className="appointment-card">
        <div className="appointment-heading">
          <span>📋</span>
          <div>
            <h2>{text.myAppointments}</h2>
            <p>{text.myAppointmentsSubtitle}</p>
          </div>
        </div>

        <div className="appointment-count">
          {text.total} {appointments.length}
        </div>

        {appointments.length === 0 ? (
          <div className="no-appointments">
            <span>📅</span>
            <p>{text.noAppointments}</p>
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
                    <p>{translateSpecialty(appointment.specialty)}</p>
                    <p>📅 {appointment.date}</p>
                    <p>🕒 {appointment.time}</p>
                    <p>{text.reasonLabel} {appointment.reason}</p>

                    <span
                      className={`appointment-status ${
                        appointment.status === "Cancelled"
                          ? "cancelled"
                          : "upcoming"
                      }`}
                    >
                      {appointment.status === "Cancelled"
                        ? text.cancelled
                        : text.upcoming}
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
                      {text.cancel}
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>

      <p className="appointment-privacy">
        {text.privacy}
      </p>

    </div>
  );
}

export default Appointments;
