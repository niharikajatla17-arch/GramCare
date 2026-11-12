
import { useState } from 'react';
import './PatientProfile.css';

const text = {
  en: {
    title: '👤 Patient Profile',
    subtitle: 'Keep your basic details and family contact information together.',
    personal: 'Personal Information',
    name: 'Patient Name',
    namePlaceholder: 'Enter patient name',
    age: 'Age',
    agePlaceholder: 'Enter age',
    village: 'Village',
    villagePlaceholder: 'Enter village name',
    phone: 'Contact Number',
    phonePlaceholder: 'Enter contact number',
    family: 'Family Support',
    caregiver: 'Family Member / Caregiver Name',
    caregiverPlaceholder: 'Enter family member name',
    caregiverPhone: 'Caregiver Contact Number',
    caregiverPhonePlaceholder: 'Enter caregiver contact',
    emergency: 'Emergency Contact Number',
    emergencyPlaceholder: 'Enter emergency contact',
    save: 'Save Patient Profile',
    success: 'Patient profile saved successfully!',
    privacy: 'Please use sample information while testing. This prototype saves information only in this browser.'
  },
  te: {
    title: '👤 రోగి వివరాలు',
    subtitle: 'మీ ప్రాథమిక వివరాలు మరియు కుటుంబ సభ్యుల సంప్రదింపు వివరాలను నమోదు చేయండి.',
    personal: 'వ్యక్తిగత సమాచారం',
    name: 'రోగి పేరు',
    namePlaceholder: 'రోగి పేరు నమోదు చేయండి',
    age: 'వయస్సు',
    agePlaceholder: 'వయస్సు నమోదు చేయండి',
    village: 'గ్రామం',
    villagePlaceholder: 'గ్రామం పేరు నమోదు చేయండి',
    phone: 'సంప్రదింపు నంబర్',
    phonePlaceholder: 'సంప్రదింపు నంబర్ నమోదు చేయండి',
    family: 'కుటుంబ సహాయం',
    caregiver: 'కుటుంబ సభ్యుడు / సంరక్షకుని పేరు',
    caregiverPlaceholder: 'కుటుంబ సభ్యుని పేరు నమోదు చేయండి',
    caregiverPhone: 'సంరక్షకుని ఫోన్ నంబర్',
    caregiverPhonePlaceholder: 'సంరక్షకుని నంబర్ నమోదు చేయండి',
    emergency: 'అత్యవసర సంప్రదింపు నంబర్',
    emergencyPlaceholder: 'అత్యవసర నంబర్ నమోదు చేయండి',
    save: 'రోగి వివరాలను భద్రపరచండి',
    success: 'రోగి వివరాలు విజయవంతంగా భద్రపరచబడ్డాయి!',
    privacy: 'పరీక్షించేటప్పుడు నమూనా వివరాలను మాత్రమే ఉపయోగించండి. ఈ నమూనా వివరాలను ఈ బ్రౌజర్‌లో మాత్రమే భద్రపరుస్తుంది.'
  }
};

function PatientProfile({ language = 'en' }) {
  const t = text[language] || text.en;

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

    setMessage(t.success);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h3>{t.personal}</h3>

        <label>{t.name}</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder={t.namePlaceholder}
          required
        />

        <label>{t.age}</label>
        <input
          name="age"
          type="number"
          min="1"
          max="120"
          value={profile.age}
          onChange={handleChange}
          placeholder={t.agePlaceholder}
          required
        />

        <label>{t.village}</label>
        <input
          name="village"
          value={profile.village}
          onChange={handleChange}
          placeholder={t.villagePlaceholder}
        />

        <label>{t.phone}</label>
        <input
          name="phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange}
          placeholder={t.phonePlaceholder}
        />

        <h3>{t.family}</h3>

        <label>{t.caregiver}</label>
        <input
          name="caregiver"
          value={profile.caregiver}
          onChange={handleChange}
          placeholder={t.caregiverPlaceholder}
        />

        <label>{t.caregiverPhone}</label>
        <input
          name="caregiverPhone"
          type="tel"
          value={profile.caregiverPhone}
          onChange={handleChange}
          placeholder={t.caregiverPhonePlaceholder}
        />

        <label>{t.emergency}</label>
        <input
          name="emergencyContact"
          type="tel"
          value={profile.emergencyContact}
          onChange={handleChange}
          placeholder={t.emergencyPlaceholder}
        />

        <button type="submit" className="profile-save">
          {t.save}
        </button>

        {message && (
          <p className="success-message" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="privacy-note">{t.privacy}</p>
    </div>
  );
}

export default PatientProfile;
