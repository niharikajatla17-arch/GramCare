
import { useEffect, useState } from 'react';
import './HealthRecords.css';

const text = {
  en: {
    title: '📊 Health Records',
    subtitle: 'Keep a record of your health readings.',
    date: 'Date',
    bp: '🩺 Blood Pressure (BP)',
    systolic: 'Systolic (top number)',
    systolicPlaceholder: 'Example: 120',
    diastolic: 'Diastolic (bottom number)',
    diastolicPlaceholder: 'Example: 80',
    sugar: '🩸 Blood Sugar',
    reading: 'Reading (mg/dL)',
    sugarPlaceholder: 'Enter reading',
    save: '+ Save Health Record',
    history: '📋 Previous Records',
    empty: 'No health records added yet.',
    pressure: 'Blood Pressure',
    bloodSugar: 'Blood Sugar',
    delete: 'Delete',
    dateError: 'Enter a date and at least one reading.',
    bpError: 'Enter both BP values together.',
    numberError: 'Please enter valid positive numbers.',
    success: 'Health record saved successfully!',
    note: 'These records are for personal reference only. GramCare does not diagnose conditions or recommend treatment. Share readings with a qualified healthcare professional.'
  },
  te: {
    title: '📊 ఆరోగ్య రికార్డులు',
    subtitle: 'మీ ఆరోగ్య కొలతల వివరాలను నమోదు చేయండి.',
    date: 'తేదీ',
    bp: '🩺 రక్తపోటు (BP)',
    systolic: 'సిస్టోలిక్ (పై సంఖ్య)',
    systolicPlaceholder: 'ఉదాహరణ: 120',
    diastolic: 'డయాస్టోలిక్ (కింది సంఖ్య)',
    diastolicPlaceholder: 'ఉదాహరణ: 80',
    sugar: '🩸 రక్తంలో చక్కెర స్థాయి',
    reading: 'రీడింగ్ (mg/dL)',
    sugarPlaceholder: 'రీడింగ్ నమోదు చేయండి',
    save: '+ ఆరోగ్య రికార్డును భద్రపరచండి',
    history: '📋 గత రికార్డులు',
    empty: 'ఇంకా ఆరోగ్య రికార్డులు జోడించలేదు.',
    pressure: 'రక్తపోటు',
    bloodSugar: 'రక్తంలో చక్కెర',
    delete: 'తొలగించండి',
    dateError: 'తేదీ మరియు కనీసం ఒక కొలతను నమోదు చేయండి.',
    bpError: 'రెండు BP విలువలను నమోదు చేయండి.',
    numberError: 'దయచేసి సరైన ధన సంఖ్యలను నమోదు చేయండి.',
    success: 'ఆరోగ్య రికార్డు విజయవంతంగా భద్రపరచబడింది!',
    note: 'ఈ రికార్డులు వ్యక్తిగత సమాచారం కోసం మాత్రమే. GramCare వ్యాధులను నిర్ధారించదు లేదా చికిత్సను సూచించదు. మీ కొలతలను అర్హత కలిగిన వైద్య నిపుణుడితో పంచుకోండి.'
  }
};

function HealthRecords({ language = 'en' }) {
  const t = text[language] || text.en;

  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gramcare-health-records')) || [];
    } catch {
      return [];
    }
  });

  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [sugar, setSugar] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(
      'gramcare-health-records',
      JSON.stringify(records)
    );
  }, [records]);

  const addRecord = (e) => {
    e.preventDefault();

    if (!date || (!systolic && !diastolic && !sugar)) {
      setMessage(t.dateError);
      return;
    }

    if ((systolic && !diastolic) || (!systolic && diastolic)) {
      setMessage(t.bpError);
      return;
    }

    if (
      (systolic && (!Number.isFinite(Number(systolic)) || Number(systolic) <= 0)) ||
      (diastolic && (!Number.isFinite(Number(diastolic)) || Number(diastolic) <= 0)) ||
      (sugar && (!Number.isFinite(Number(sugar)) || Number(sugar) <= 0))
    ) {
      setMessage(t.numberError);
      return;
    }

    const newRecord = {
      id: Date.now(),
      date,
      systolic: systolic || '',
      diastolic: diastolic || '',
      sugar: sugar || ''
    };

    setRecords((previous) => [newRecord, ...previous]);
    setSystolic('');
    setDiastolic('');
    setSugar('');
    setMessage(t.success);
  };

  const deleteRecord = (id) => {
    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );
  };

  return (
    <section className="health-records">
      <div className="health-records-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      <form className="health-records-form" onSubmit={addRecord}>
        <label>{t.date}</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <h3>{t.bp}</h3>

        <label>{t.systolic}</label>
        <input
          type="number"
          placeholder={t.systolicPlaceholder}
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
        />

        <label>{t.diastolic}</label>
        <input
          type="number"
          placeholder={t.diastolicPlaceholder}
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
        />

        <h3>{t.sugar}</h3>

        <label>{t.reading}</label>
        <input
          type="number"
          step="any"
          placeholder={t.sugarPlaceholder}
          value={sugar}
          onChange={(e) => setSugar(e.target.value)}
        />

        <button type="submit">{t.save}</button>

        {message && <p role="status">{message}</p>}
      </form>

      <div className="health-records-history">
        <h3>{t.history}</h3>

        {records.length === 0 ? (
          <p>{t.empty}</p>
        ) : (
          records.map((record) => (
            <div className="health-record-card" key={record.id}>
              <h4>📅 {record.date}</h4>

              {record.systolic && (
                <p>
                  {t.pressure}: {record.systolic}/
                  {record.diastolic} mmHg
                </p>
              )}

              {record.sugar && (
                <p>
                  {t.bloodSugar}: {record.sugar} mg/dL
                </p>
              )}

              <button
                type="button"
                onClick={() => deleteRecord(record.id)}
              >
                {t.delete}
              </button>
            </div>
          ))
        )}
      </div>

      <p className="health-records-note">{t.note}</p>
    </section>
  );
}

export default HealthRecords;
