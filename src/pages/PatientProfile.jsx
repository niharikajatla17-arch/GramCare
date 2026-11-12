
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./PatientProfile.css";

const initialProfile = {
  name: "",
  age: "",
  gender: "",
  state: "Andhra Pradesh",
  village: "",
  phone: "",
  language: "Telugu",
  emergencyName: "",
  emergencyPhone: "",
  caregiver: "",
};

function PatientProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("gramcare-patient-profile");
      return saved
        ? { ...initialProfile, ...JSON.parse(saved) }
        : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [villages, setVillages] = useState([]);
  const [loadingVillages, setLoadingVillages] = useState(true);
  const [villageError, setVillageError] = useState("");
  const [saved, setSaved] = useState(false);

  // Load Andhra Pradesh villages from CSV
  useEffect(() => {
    fetch("/data/andhra_pradesh_villages.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("CSV file could not be found.");
        }
        return response.text();
      })
      .then((csvText) => {
        const result = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) =>
            header.trim().replace(/^\uFEFF/, ""),
        });

        console.log("CSV Headers:", result.meta.fields);
        console.log("CSV Rows:", result.data.length);

        const villageNames = [
          ...new Set(
            result.data
              .filter(
                (row) =>
                  row.State?.trim() === "Andhra Pradesh" &&
                  row.Village?.trim()
              )
              .map((row) => row.Village.trim())
          ),
        ].sort((a, b) => a.localeCompare(b));

        setVillages(villageNames);

        console.log("Villages loaded:", villageNames.length);

        if (villageNames.length === 0) {
          setVillageError(
            "No villages found. Please check the CSV column names."
          );
        }
      })
      .catch((error) => {
        console.error("Village loading error:", error);
        setVillageError(error.message);
      })
      .finally(() => {
        setLoadingVillages(false);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  // Save patient profile
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      localStorage.setItem(
        "gramcare-patient-profile",
        JSON.stringify(profile)
      );
      setSaved(true);
    } catch {
      setSaved(false);
      alert("Unable to save the profile in this browser.");
    }
  };

  return (
    <div className="patient-page">

      {/* Page Header */}
      <div className="patient-header">
        <div>
          <p className="patient-eyebrow">
            GRAMCARE / PATIENT CARE
          </p>
          <h1>Patient Profile</h1>
          <p className="patient-subtitle">
            Manage personal details and emergency contacts.
          </p>
        </div>

        <div className="profile-avatar">
          <span>👤</span>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="success-message" role="status">
          ✓ Patient profile saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Personal Information */}
        <section className="profile-card">
          <div className="section-heading">
            <span className="section-icon">👤</span>
            <div>
              <h2>Personal Information</h2>
              <p>Enter the patient's basic details.</p>
            </div>
          </div>

          <div className="profile-grid">

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={profile.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                value={profile.state}
                readOnly
              />
            </div>

            {/* Village Dropdown */}
            <div className="form-group">
              <label htmlFor="village">Village Name *</label>

              <select
                id="village"
                name="village"
                value={profile.village}
                onChange={handleChange}
                required
                disabled={
                  loadingVillages || villages.length === 0
                }
              >
                <option value="">
                  {loadingVillages
                    ? "Loading villages..."
                    : villageError
                    ? "Unable to load villages"
                    : "Select your village"}
                </option>

                {villages.map((village, index) => (
                  <option key={index} value={village}>
                    {village}
                  </option>
                ))}
              </select>

              {villageError && (
                <p className="error-message" role="alert">
                  {villageError}
                </p>
              )}

              {!loadingVillages && villages.length > 0 && (
                <p className="village-info">
                  {villages.length} villages available
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                maxLength="10"
                value={profile.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="language">
                Preferred Language
              </label>
              <select
                id="language"
                name="language"
                value={profile.language}
                onChange={handleChange}
              >
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </select>
            </div>

          </div>
        </section>

        {/* Emergency Contact */}
        <section className="profile-card">
          <div className="section-heading">
            <span className="section-icon">🚨</span>
            <div>
              <h2>Emergency Contact</h2>
              <p>
                Someone to contact when assistance is needed.
              </p>
            </div>
          </div>

          <div className="profile-grid">

            <div className="form-group">
              <label htmlFor="emergencyName">
                Emergency Contact Name
              </label>
              <input
                id="emergencyName"
                name="emergencyName"
                value={profile.emergencyName}
                onChange={handleChange}
                placeholder="Enter contact person's name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyPhone">
                Emergency Contact Number
              </label>
              <input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                pattern="[0-9]{10}"
                maxLength="10"
                value={profile.emergencyPhone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="caregiver">
                Family Member / Caregiver
              </label>
              <input
                id="caregiver"
                name="caregiver"
                value={profile.caregiver}
                onChange={handleChange}
                placeholder="Enter family member or caregiver name"
              />
            </div>

          </div>
        </section>

        {/* Save Button */}
        <div className="profile-actions">
          <button
            type="submit"
            className="save-profile-btn"
            disabled={
              loadingVillages || villages.length === 0
            }
          >
            ✓ Save Patient Profile
          </button>
        </div>

      </form>

      {/* Privacy Note */}
      <p className="privacy-note">
        🔒 Your information is stored locally in this prototype.
        Do not enter real patient information.
      </p>

    </div>
  );
}

export default PatientProfile;
