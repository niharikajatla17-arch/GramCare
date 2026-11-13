
import { useEffect, useState } from "react";
import "./HealthRecords.css";

function HealthRecords({ language }) {
  const isTelugu = language === "te";

  const t = (english, telugu) => (isTelugu ? telugu : english);

  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gramcare-health-records")) || [];
    } catch {
      return [];
    }
  });

  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [sugar, setSugar] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "gramcare-health-records",
      JSON.stringify(records)
    );
  }, [records]);

  const addRecord = (e) => {
    e.preventDefault();

    if (!date || (!systolic && !diastolic && !sugar)) {
      setMessage(
        t(
          "Enter a date and at least one reading.",
          "తేదీ మరియు కనీసం ఒక రీడింగ్ నమోదు చేయండి."
        )
      );
      return;
    }

    if ((systolic && !diastolic) || (!systolic && diastolic)) {
      setMessage(
        t(
          "Enter both BP values together.",
          "రెండు రక్తపోటు విలువలను నమోదు చేయండి."
        )
      );
      return;
    }

    if (
      (systolic &&
        (!Number.isFinite(Number(systolic)) || Number(systolic) <= 0)) ||
      (diastolic &&
        (!Number.isFinite(Number(diastolic)) || Number(diastolic) <= 0)) ||
      (sugar &&
        (!Number.isFinite(Number(sugar)) || Number(sugar) <= 0))
    ) {
      setMessage(
        t(
          "Please enter valid positive numbers.",
          "దయచేసి సరైన ధనాత్మక సంఖ్యలను నమోదు చేయండి."
        )
      );
      return;
    }

    const newRecord = {
      id: Date.now(),
      date,
      systolic: systolic || "",
      diastolic: diastolic || "",
      sugar: sugar || "",
    };

    setRecords((previous) => [newRecord, ...previous]);
    setSystolic("");
    setDiastolic("");
    setSugar("");
    setMessage(
      t(
        "Health record saved successfully!",
        "ఆరోగ్య రికార్డు విజయవంతంగా సేవ్ చేయబడింది!"
      )
    );
  };

  const deleteRecord = (id) => {
    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );
  };

  return (
    <section className="health-records">
      <div className="health-records-header">
        <h2>📊 {t("Health Records", "ఆరోగ్య రికార్డులు")}</h2>
        <p>
          {t(
            "Keep a record of your health readings.",
            "మీ ఆరోగ్య రీడింగ్‌లను నమోదు చేసుకోండి."
          )}
        </p>
      </div>

      <form className="health-records-form" onSubmit={addRecord}>
        <label>{t("Date", "తేదీ")}</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <h3>🩺 {t("Blood Pressure (BP)", "రక్తపోటు (BP)")}</h3>

        <label>{t("Systolic (top number)", "సిస్టోలిక్ (పై సంఖ్య)")}</label>
        <input
          type="number"
          placeholder="Example: 120"
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
        />

        <label>
          {t("Diastolic (bottom number)", "డయాస్టోలిక్ (కింది సంఖ్య)")}
        </label>
        <input
          type="number"
          placeholder="Example: 80"
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
        />

        <h3>🩸 {t("Blood Sugar", "రక్తంలో చక్కెర స్థాయి")}</h3>

        <label>{t("Reading (mg/dL)", "రీడింగ్ (mg/dL)")}</label>
        <input
          type="number"
          step="any"
          placeholder={t("Enter reading", "రీడింగ్ నమోదు చేయండి")}
          value={sugar}
          onChange={(e) => setSugar(e.target.value)}
        />

        <button type="submit">
          + {t("Save Health Record", "ఆరోగ్య రికార్డును సేవ్ చేయండి")}
        </button>

        {message && <p role="status">{message}</p>}
      </form>

      <div className="health-records-history">
        <h3>📋 {t("Previous Records", "మునుపటి రికార్డులు")}</h3>

        {records.length === 0 ? (
          <p>
            {t(
              "No health records added yet.",
              "ఇంకా ఆరోగ్య రికార్డులు జోడించలేదు."
            )}
          </p>
        ) : (
          records.map((record) => (
            <div className="health-record-card" key={record.id}>
              <h4>📅 {record.date}</h4>

              {record.systolic && (
                <p>
                  {t("Blood Pressure", "రక్తపోటు")}: {record.systolic}/
                  {record.diastolic} mmHg
                </p>
              )}

              {record.sugar && (
                <p>
                  {t("Blood Sugar", "రక్తంలో చక్కెర స్థాయి")}:{" "}
                  {record.sugar} mg/dL
                </p>
              )}

              <button
                type="button"
                onClick={() => deleteRecord(record.id)}
              >
                {t("Delete", "తొలగించండి")}
              </button>
            </div>
          ))
        )}
      </div>

      <p className="health-records-note">
        {t(
          "These records are for personal reference only. GramCare does not diagnose conditions or recommend treatment. Share readings with a qualified healthcare professional.",
          "ఈ రికార్డులు వ్యక్తిగత సమాచారం కోసం మాత్రమే. GramCare వ్యాధులను నిర్ధారించదు లేదా చికిత్సను సూచించదు. మీ రీడింగ్‌లను అర్హత కలిగిన వైద్య నిపుణుడితో పంచుకోండి."
        )}
      </p>
    </section>
  );
}

export default HealthRecords;
