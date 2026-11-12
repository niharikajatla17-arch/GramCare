
import { useEffect, useState } from 'react';
import './HealthRecords.css';

function HealthRecords() {
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
      setMessage('Enter a date and at least one reading.');
      return;
    }

    if ((systolic && !diastolic) || (!systolic && diastolic)) {
      setMessage('Enter both BP values together.');
      return;
    }

    if (
      (systolic && (!Number.isFinite(Number(systolic)) || Number(systolic) <= 0)) ||
      (diastolic && (!Number.isFinite(Number(diastolic)) || Number(diastolic) <= 0)) ||
      (sugar && (!Number.isFinite(Number(sugar)) || Number(sugar) <= 0))
    ) {
      setMessage('Please enter valid positive numbers.');
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
    setMessage('Health record saved successfully!');
  };

  const deleteRecord = (id) => {
    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );
  };

  return (
    <section className="health-records">
      <div className="health-records-header">
        <h2>📊 Health Records</h2>
        <p>Keep a record of your health readings.</p>
      </div>

      <form className="health-records-form" onSubmit={addRecord}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <h3>🩺 Blood Pressure (BP)</h3>
        <label>Systolic (top number)</label>
        <input
          type="number"
          placeholder="Example: 120"
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
        />

        <label>Diastolic (bottom number)</label>
        <input
          type="number"
          placeholder="Example: 80"
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
        />

        <h3>🩸 Blood Sugar</h3>
        <label>Reading (mg/dL)</label>
        <input
          type="number"
          step="any"
          placeholder="Enter reading"
          value={sugar}
          onChange={(e) => setSugar(e.target.value)}
        />

        <button type="submit">+ Save Health Record</button>

        {message && <p role="status">{message}</p>}
      </form>

      <div className="health-records-history">
        <h3>📋 Previous Records</h3>

        {records.length === 0 ? (
          <p>No health records added yet.</p>
        ) : (
          records.map((record) => (
            <div className="health-record-card" key={record.id}>
              <h4>📅 {record.date}</h4>

              {record.systolic && (
                <p>
                  Blood Pressure: {record.systolic}/
                  {record.diastolic} mmHg
                </p>
              )}

              {record.sugar && (
                <p>Blood Sugar: {record.sugar} mg/dL</p>
              )}

              <button
                type="button"
                onClick={() => deleteRecord(record.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <p className="health-records-note">
        These records are for personal reference only.
        GramCare does not diagnose conditions or recommend treatment.
        Share readings with a qualified healthcare professional.
      </p>
    </section>
  );
}

export default HealthRecords;
