
import { useState } from "react";
import "./PatientProfile.css";

function PatientProfile({ language }) {
  const isTelugu = language === "te";

  const t = (english, telugu) => (isTelugu ? telugu : english);

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("gramcare-patient-profile")) || {
          name: "",
          age: "",
          village: "",
          phone: "",
          caregiver: "",
          caregiverPhone: "",
          emergencyContact: "",
        }
      );
    } catch {
      return {
        name: "",
        age: "",
        village: "",
        phone: "",
        caregiver: "",
        caregiverPhone: "",
        emergencyContact: "",
      };
    }
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "gramcare-patient-profile",
      JSON.stringify(profile)
    );

    setMessage(
      t(
        "Patient profile saved successfully!",
        "రోగి వివరాలు విజయవంతంగా సేవ్ చేయబడ్డాయి!"
      )
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>👤 {t("Patient Profile", "రోగి వివరాలు")}</h2>

        <p>
          {t(
            "Keep your basic details and family contact information together.",
            "మీ ప్రాథమిక వివరాలు మరియు కుటుంబ సభ్యుల సంప్రదింపు సమాచారాన్ని ఒకే చోట ఉంచండి."
          )}
        </p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <h3>{t("Personal Information", "వ్యక్తిగత సమాచారం")}</h3>

        <label>{t("Patient Name", "రోగి పేరు")}</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder={t("Enter patient name", "రోగి పేరు నమోదు చేయండి")}
          required
        />

        <label>{t("Age", "వయస్సు")}</label>
        <input
          name="age"
          type="number"
          min="1"
          max="120"
          value={profile.age}
          onChange={handleChange}
          placeholder={t("Enter age", "వయస్సు నమోదు చేయండి")}
          required
        />

        <label>{t("Village", "గ్రామం")}</label>
        <input
          name="village"
          value={profile.village}
          onChange={handleChange}
          placeholder={t("Enter village name", "గ్రామం పేరు నమోదు చేయండి")}
        />

        <label>{t("Contact Number", "సంప్రదింపు నంబర్")}</label>
        <input
          name="phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange}
          placeholder={t("Enter contact number", "సంప్రదింపు నంబర్ నమోదు చేయండి")}
        />

        <h3>{t("Family Support", "కుటుంబ సహాయం")}</h3>

        <label>
          {t("Family Member / Caregiver Name", "కుటుంబ సభ్యుడు / సంరక్షకుని పేరు")}
        </label>
        <input
          name="caregiver"
          value={profile.caregiver}
          onChange={handleChange}
          placeholder={t(
            "Enter family member name",
            "కుటుంబ సభ్యుని పేరు నమోదు చేయండి"
          )}
        />

        <label>
          {t("Caregiver Contact Number", "సంరక్షకుని సంప్రదింపు నంబర్")}
        </label>
        <input
          name="caregiverPhone"
          type="tel"
          value={profile.caregiverPhone}
          onChange={handleChange}
          placeholder={t(
            "Enter caregiver contact",
            "సంరక్షకుని నంబర్ నమోదు చేయండి"
          )}
        />

        <label>
          {t("Emergency Contact Number", "అత్యవసర సంప్రదింపు నంబర్")}
        </label>
        <input
          name="emergencyContact"
          type="tel"
          value={profile.emergencyContact}
          onChange={handleChange}
          placeholder={t(
            "Enter emergency contact",
            "అత్యవసర సంప్రదింపు నంబర్ నమోదు చేయండి"
          )}
        />

        <button type="submit" className="profile-save">
          {t("Save Patient Profile", "రోగి వివరాలను సేవ్ చేయండి")}
        </button>

        {message && (
          <p className="success-message" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="privacy-note">
        {t(
          "Please use sample information while testing. This prototype saves information only in this browser.",
          "పరీక్షించే సమయంలో నమూనా వివరాలను మాత్రమే ఉపయోగించండి. ఈ ప్రోటోటైప్ సమాచారాన్ని ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ చేస్తుంది."
        )}
      </p>
    </div>
  );
}

export default PatientProfile;
