
import { useState, useEffect } from 'react';
import './App.css';
import PatientProfile from './PatientProfile';
import HealthRecords from './HealthRecords';

const translations = {
  en: {
    tagline: 'Healthcare made accessible',
    language: '🌐 English',
    welcome: 'Good day!',
    welcomeText: 'Manage your medicines and stay on track with your health.',
    companion: 'YOUR HEALTH COMPANION',
    medicines: 'Saved Medicines',
    reminders: 'Saved Reminders',
    selectedRecords: 'Selected Records',
    medicineManagement: '💊 Medicine Management',
    manageText: 'Add and manage your prescribed medicines.',
    addMedicine: '➕ Add New Medicine',
    medicineName: 'Medicine Name',
    enterName: 'Enter medicine name',
    dosage: 'Dosage (as prescribed)',
    dosageExample: 'Example: 1 tablet',
    reminderTime: 'Reminder Time (as prescribed)',
    add: '+ Add Medicine',
    medicineList: '📋 My Medicine List',
    noMedicines: 'No medicines added yet',
    noMedicinesText: "Add medicines according to your doctor's prescription.",
    reminderLabel: 'Reminder',
    reminderSection: '🔔 Medicine Reminders',
    reminderText: 'Receive browser notifications at your selected medicine times.',
    enableNotifications: '🔔 Enable Medicine Notifications',
    notificationsNotEnabled: 'Notifications are not enabled yet.',
    notificationsEnabled: 'Reminders enabled! Keep GramCare open for reminders.',
    notificationsBlocked: 'Notifications are blocked. Please allow them in browser settings.',
    notificationsUnsupported: 'Your browser does not support notifications.',
    permissionNotGranted: 'Notification permission was not granted.',
    notificationError: 'Unable to enable notifications.',
    testNotification: 'Medicine reminders are now enabled!',
    prescription: '📸 Prescription Records',
    prescriptionText: "Select a photo or PDF of your doctor's prescription for reference.",
    upload: 'Upload Prescription',
    chooseFile: 'Choose an image or PDF file',
    selected: '✓ Selected',
    voice: '🔊 Voice Assistance',
    voiceText: 'Listen to your medicine schedule.',
    readMedicines: '🔊 Read My Medicines',
    noMedicinesVoice: 'You have not added any medicines yet.',
    savedMedicinesVoice: 'Your saved medicines are:',
    reminderVoice: 'reminder at',
    disclaimer: 'Important: Enter medicines and dosages only as prescribed by a qualified healthcare professional. GramCare does not diagnose illnesses or recommend medicines.',
    footer: 'Bringing healthcare closer to every village.',
    footerNote: 'Your health, our priority',
    addError: 'Please enter medicine name, dosage and reminder time.',
    delete: 'Delete'
  },
  te: {
    tagline: 'ఆరోగ్య సేవలు అందరికీ అందుబాటులో',
    language: '🌐 తెలుగు',
    welcome: 'నమస్కారం!',
    welcomeText: 'మీ మందులను నిర్వహించండి మరియు మీ ఆరోగ్యాన్ని జాగ్రత్తగా చూసుకోండి.',
    companion: 'మీ ఆరోగ్య సహాయకుడు',
    medicines: 'నమోదు చేసిన మందులు',
    reminders: 'నమోదు చేసిన రిమైండర్లు',
    selectedRecords: 'ఎంచుకున్న రికార్డులు',
    medicineManagement: '💊 మందుల నిర్వహణ',
    manageText: 'వైద్యులు సూచించిన మందులను జోడించి నిర్వహించండి.',
    addMedicine: '➕ కొత్త మందును జోడించండి',
    medicineName: 'మందు పేరు',
    enterName: 'మందు పేరు నమోదు చేయండి',
    dosage: 'మోతాదు (వైద్యులు సూచించిన విధంగా)',
    dosageExample: 'ఉదాహరణ: 1 మాత్ర',
    reminderTime: 'రిమైండర్ సమయం',
    add: '+ మందును జోడించండి',
    medicineList: '📋 నా మందుల జాబితా',
    noMedicines: 'ఇంకా మందులు జోడించలేదు',
    noMedicinesText: 'వైద్యుల ప్రిస్క్రిప్షన్ ప్రకారం మందులను జోడించండి.',
    reminderLabel: 'రిమైండర్',
    reminderSection: '🔔 మందుల రిమైండర్లు',
    reminderText: 'మీరు ఎంచుకున్న సమయానికి బ్రౌజర్ నోటిఫికేషన్లు పొందండి.',
    enableNotifications: '🔔 మందుల నోటిఫికేషన్లను ప్రారంభించండి',
    notificationsNotEnabled: 'నోటిఫికేషన్లు ఇంకా ప్రారంభించబడలేదు.',
    notificationsEnabled: 'రిమైండర్లు ప్రారంభమయ్యాయి! రిమైండర్ల కోసం GramCare తెరిచి ఉంచండి.',
    notificationsBlocked: 'నోటిఫికేషన్లు నిరోధించబడ్డాయి. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.',
    notificationsUnsupported: 'మీ బ్రౌజర్ నోటిఫికేషన్లకు మద్దతు ఇవ్వదు.',
    permissionNotGranted: 'నోటిఫికేషన్ అనుమతి ఇవ్వబడలేదు.',
    notificationError: 'నోటిఫికేషన్లను ప్రారంభించలేకపోయాము.',
    testNotification: 'మందుల రిమైండర్లు ఇప్పుడు ప్రారంభమయ్యాయి!',
    prescription: '📸 ప్రిస్క్రిప్షన్ వివరాలు',
    prescriptionText: 'వైద్యుల ప్రిస్క్రిప్షన్ ఫోటో లేదా PDF ఎంచుకోండి.',
    upload: 'ప్రిస్క్రిప్షన్‌ను అప్‌లోడ్ చేయండి',
    chooseFile: 'చిత్రం లేదా PDF ఫైల్ ఎంచుకోండి',
    selected: '✓ ఎంచుకున్నది',
    voice: '🔊 వాయిస్ సహాయం',
    voiceText: 'మీ మందుల వివరాలను వినండి.',
    readMedicines: '🔊 నా మందుల వివరాలను వినండి',
    noMedicinesVoice: 'మీరు ఇంకా మందులను జోడించలేదు.',
    savedMedicinesVoice: 'మీరు నమోదు చేసిన మందులు:',
    reminderVoice: 'రిమైండర్ సమయం',
    disclaimer: 'ముఖ్యమైనది: అర్హత కలిగిన వైద్య నిపుణుడు సూచించిన మందులు మరియు మోతాదులను మాత్రమే నమోదు చేయండి. GramCare వ్యాధులను నిర్ధారించదు లేదా మందులను సూచించదు.',
    footer: 'ప్రతి గ్రామానికి ఆరోగ్య సేవలను చేరువ చేయడం.',
    footerNote: 'మీ ఆరోగ్యమే మా ప్రాధాన్యత',
    addError: 'దయచేసి మందు పేరు, మోతాదు మరియు రిమైండర్ సమయాన్ని నమోదు చేయండి.',
    delete: 'తొలగించండి'
  }
};

function App() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('gramcare-language') || 'en'
  );

  const t = translations[language];

  const [medicines, setMedicines] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramcare-medicines')) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [customTime, setCustomTime] = useState('08:00');
  const [file, setFile] = useState(null);
  const [reminderStatus, setReminderStatus] = useState(
    translations[language].notificationsNotEnabled
  );

  useEffect(() => {
    localStorage.setItem('gramcare-language', language);
    document.documentElement.lang = language === 'te' ? 'te' : 'en';
    setReminderStatus(
      translations[language].notificationsNotEnabled
    );
  }, [language]);

  useEffect(() => {
    localStorage.setItem(
      'gramcare-medicines',
      JSON.stringify(medicines)
    );
  }, [medicines]);

  const addMedicine = (e) => {
    e.preventDefault();

    if (!name.trim() || !dosage.trim() || !customTime) {
      alert(t.addError);
      return;
    }

    const newMedicine = {
      id: Date.now(),
      name: name.trim(),
      dosage: dosage.trim(),
      time: customTime
    };

    setMedicines((previous) => [...previous, newMedicine]);
    setName('');
    setDosage('');
    setCustomTime('08:00');
  };

  const deleteMedicine = (id) => {
    setMedicines((previous) =>
      previous.filter((med) => med.id !== id)
    );
  };

  const enableReminders = async () => {
    if (!('Notification' in window)) {
      setReminderStatus(t.notificationsUnsupported);
      return;
    }

    try {
      let permission = window.Notification.permission;

      if (permission === 'default') {
        permission = await window.Notification.requestPermission();
      }

      if (permission === 'granted') {
        setReminderStatus(t.notificationsEnabled);

        new window.Notification('GramCare', {
          body: t.testNotification
        });
      } else if (permission === 'denied') {
        setReminderStatus(t.notificationsBlocked);
      } else {
        setReminderStatus(t.permissionNotGranted);
      }
    } catch (error) {
      console.error('Notification error:', error);
      setReminderStatus(t.notificationError);
    }
  };

  useEffect(() => {
    const checkReminders = () => {
      if (
        !('Notification' in window) ||
        window.Notification.permission !== 'granted'
      ) {
        return;
      }

      const now = new Date();

      const currentTime =
        `${String(now.getHours()).padStart(2, '0')}:` +
        `${String(now.getMinutes()).padStart(2, '0')}`;

      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
      ].join('-');

      medicines.forEach((med) => {
        if (!/^\d{2}:\d{2}$/.test(med.time || '')) return;
        if (med.time !== currentTime) return;

        const reminderKey = `gramcare-reminder-${today}-${med.id}`;

        if (localStorage.getItem(reminderKey)) return;

        try {
          const body = language === 'te'
            ? `${med.name} - ${med.dosage}. మీ వైద్యుల సూచనలను అనుసరించండి.`
            : `Reminder for ${med.name} - ${med.dosage}. Please follow your prescription.`;

          new window.Notification(
            language === 'te'
              ? 'GramCare మందుల రిమైండర్'
              : 'GramCare Medicine Reminder',
            { body }
          );

          localStorage.setItem(reminderKey, 'sent');
        } catch (error) {
          console.error('Reminder error:', error);
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 15000);

    return () => clearInterval(interval);
  }, [medicines, language]);

  const speak = (message) => {
    if (!('speechSynthesis' in window)) {
      alert(
        language === 'te'
          ? 'ఈ బ్రౌజర్ వాయిస్ సహాయానికి మద్దతు ఇవ్వదు.'
          : 'Voice assistance is not supported in this browser.'
      );
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = language === 'te' ? 'te-IN' : 'en-IN';
    speech.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) =>
      language === 'te'
        ? voice.lang.toLowerCase().startsWith('te')
        : voice.lang.toLowerCase().startsWith('en-in')
    );

    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  const readMedicines = () => {
    if (!medicines.length) {
      speak(t.noMedicinesVoice);
      return;
    }

    const message = language === 'te'
      ? 'మీరు నమోదు చేసిన మందులు: ' +
        medicines.map(
          (m) => `${m.name}, ${m.dosage}, ${m.time}`
        ).join('. ')
      : t.savedMedicinesVoice + ' ' +
        medicines.map(
          (m) => `${m.name}, ${m.dosage}, ${t.reminderVoice} ${m.time}`
        ).join('. ');

    speak(message);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">✚</span>
          <div>
            <h1>GramCare</h1>
            <p>{t.tagline}</p>
          </div>
        </div>

        <select
          className="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select language"
        >
          <option value="en">🌐 English</option>
          <option value="te">🌐 తెలుగు</option>
        </select>
      </header>

      <main className="container">
        <section className="welcome">
          <div>
            <p className="eyebrow">{t.companion}</p>
            <h2>{t.welcome} 👋</h2>
            <p>{t.welcomeText}</p>
          </div>
          <div className="welcome-icon">💚</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>💊</span>
            <h3>{medicines.length}</h3>
            <p>{t.medicines}</p>
          </div>
          <div className="stat-card">
            <span>🔔</span>
            <h3>{medicines.length}</h3>
            <p>{t.reminders}</p>
          </div>
          <div className="stat-card">
            <span>📋</span>
            <h3>{file ? '1' : '0'}</h3>
            <p>{t.selectedRecords}</p>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>{t.medicineManagement}</h2>
              <p>{t.manageText}</p>
            </div>
          </div>

          <form className="medicine-form" onSubmit={addMedicine}>
            <h3>{t.addMedicine}</h3>

            <label>{t.medicineName}</label>
            <input
              type="text"
              placeholder={t.enterName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>{t.dosage}</label>
            <input
              type="text"
              placeholder={t.dosageExample}
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />

            <label>{t.reminderTime}</label>
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              required
            />

            <button type="submit" className="primary-btn">
              {t.add}
            </button>
          </form>
        </section>

        <section className="section">
          <h2>{t.medicineList}</h2>

          {medicines.length === 0 ? (
            <div className="empty-state">
              <span>💊</span>
              <h3>{t.noMedicines}</h3>
              <p>{t.noMedicinesText}</p>
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
                      🕒 {t.reminderLabel}: {med.time}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteMedicine(med.id)}
                    aria-label={`${t.delete} ${med.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>{t.reminderSection}</h2>
          <p className="section-description">{t.reminderText}</p>
          <div className="medicine-form">
            <button
              type="button"
              className="primary-btn"
              onClick={enableReminders}
            >
              {t.enableNotifications}
            </button>
            <p className="section-description" role="status">
              {reminderStatus}
            </p>
          </div>
        </section>

        <section className="section">
          <h2>{t.prescription}</h2>
          <p className="section-description">{t.prescriptionText}</p>

          <label className="upload-box">
            <span>📁</span>
            <strong>{t.upload}</strong>
            <small>{t.chooseFile}</small>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          {file && (
            <p className="file-name">
              {t.selected}: {file.name}
            </p>
          )}
        </section>

        <section className="voice-section">
          <div>
            <h2>{t.voice}</h2>
            <p>{t.voiceText}</p>
          </div>
          <button
            type="button"
            className="voice-btn"
            onClick={readMedicines}
          >
            {t.readMedicines}
          </button>
        </section>

        <p className="disclaimer">{t.disclaimer}</p>
      </main>

      <PatientProfile language={language} />
      <HealthRecords language={language} />

      <footer>
        <h3>💚 GramCare</h3>
        <p>{t.footer}</p>
        <small>© 2026 GramCare | {t.footerNote}</small>
      </footer>
    </div>
  );
}

export default App;
