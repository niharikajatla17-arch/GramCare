
import { useState } from 'react';
import './PatientProfile.css';

function PatientProfile() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    village: '',
    phone: '',
    caregiver: '',
    caregiverPhone: '',
    emergencyContact: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      'gramcare-patient-profile',
      JSON.stringify(profile)
    );

    setMessage('Patient profile saved successfully!');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>👤 Patient Profile</h2>
        <p>Keep your basic details and family contact information together.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h3>Personal Information</h3>

        <label>Patient Name</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter patient name"
          required
        />

        <label>Age</label>
        <input
          name="age"
          type="number"
          min="1"
          max="120"
          value={profile.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
        />

        <label>Village</label>
        <input
          name="village"
          value={profile.village}
          onChange={handleChange}
          placeholder="Enter village name"
        />

        <label>Contact Number</label>
        <input
          name="phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter contact number"
        />

        <h3>Family Support</h3>

        <label>Family Member / Caregiver Name</label>
        <input
          name="caregiver"
          value={profile.caregiver}
          onChange={handleChange}
          placeholder="Enter family member name"
        />

        <label>Caregiver Contact Number</label>
        <input
          name="caregiverPhone"
          type="tel"
          value={profile.caregiverPhone}
          onChange={handleChange}
          placeholder="Enter caregiver contact"
        />

        <label>Emergency Contact Number</label>
        <input
          name="emergencyContact"
          type="tel"
          value={profile.emergencyContact}
          onChange={handleChange}
          placeholder="Enter emergency contact"
        />

        <button type="submit" className="profile-save">
          Save Patient Profile
        </button>

        {message && <p className="success-message">{message}</p>}
      </form>

      <p className="privacy-note">
        Please use sample information while testing.
        This prototype saves information only in this browser.
      </p>
    </div>
  );
}

export default PatientProfile;
