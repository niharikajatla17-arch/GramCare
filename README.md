# 🌿 GramCare – Smart Rural Healthcare Assistance Platform

> Making medicine management and regular health follow-ups simple, voice-based and accessible for rural communities.

## 📌 Problem Statement

During our village visit, we found that a primary healthcare facility is available within about 2 km, and most villagers did not report major difficulty reaching healthcare. However, we identified a real everyday challenge: **keeping track of prescribed medicines**. Villagers, especially elderly people, struggle to maintain organized written lists of medicines, remember schedules, and understand instructions in a simple format.

**How can we make medicine management and regular healthcare follow-ups simpler and more accessible through technology, especially for people who need additional assistance?**

## 💡 Our Solution

GramCare is a simple, Telugu-first platform that helps patients, family members and local health workers manage medicines and follow-ups in one place.

**Core flow:**

1. 📷 Upload a photo of the prescription
2. 🤖 AI extracts the medicines, doses and timings
3. ✅ A person confirms the details are correct
4. ⏰ A daily medicine schedule is created
5. 🔊 Voice reminders are played in Telugu (and other local languages)
6. 🔔 Family members or health workers are alerted if a dose is missed

## ✨ Features

### Available in this prototype
- [ ] Prescription upload and medicine extraction
- [ ] Confirmation screen for extracted medicines
- [ ] Medicine schedule and daily dashboard
- [ ] Telugu voice-based reminders
- [ ] Missed-dose alert for family member / health worker
- [ ] Simple health worker view of patient status

### Planned (future scope)
- Blood pressure tracking
- Pregnancy checkup and scan reminders
- Medicine refill requests through registered pharmacies and delivery tracking
- Doctor consultations through calls or SMS, and home visit requests
- Reminders through phone calls and SMS for people without smartphones
- Support for more local languages

*(Tick the boxes above as you finish each one.)*

## ♿ Designed for Accessibility

- **Telugu-first and voice-first**, with minimal text and large icons
- **Works as a web app (PWA)**: no Play Store download, works on low-end phones
- **Photo instead of typing** for entering prescriptions
- **Operator-friendly:** a family member or local health worker can set up and manage an elderly person's profile
- **Low-connectivity friendly**, with reminders scheduled ahead

## 🛠️ Tech Stack

*(Edit to match what you use.)*

| Layer | Technology |
|---|---|
| Frontend | [React / Next.js / HTML + Tailwind] (PWA) |
| Backend & Database | [Supabase / Firebase] |
| Prescription Reading | [Claude API / Gemini / Google Vision OCR] |
| Voice | [Web Speech API (te-IN) / Google Text-to-Speech] |
| Reminders | [Twilio / Exotel / browser notifications] |
| Hosting | [Vercel / Netlify] |

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone [your-repo-url]
cd [your-repo-name]

# 2. Install dependencies
npm install

# 3. Add environment variables
# Create a .env file and add your keys (see .env.example)

# 4. Run the app
npm run dev
```

**Live demo:** [add link]
**Demo video:** [add link]

## 🌱 Sustainability

- **Run by the community:** Local health workers and family members act as operators, so it does not depend on villagers being tech-savvy.
- **Free for villagers:** Possible support through pharmacy partnerships, NGOs, CSR programs and health initiatives.
- **Low running cost:** Built on free-tier cloud services, with costs only per reminder sent.
- **Scalable:** The same approach can support BP, diabetes and pregnancy follow-ups in other villages.

## 🔒 Safety & Privacy

- GramCare **supports** medicine management. It does **not** give medical advice, diagnose conditions or change doses.
- AI-extracted prescription details are always **confirmed by a person** before use.
- Health data is sensitive: we use consent-based, secure storage, and no real patient data is included in this repository.

## 🗺️ Roadmap

- [x] Field research and problem identification in the village
- [ ] Working prototype (prescription → schedule → voice reminder → alert)
- [ ] Pilot with a village health worker and a few families
- [ ] Add BP tracking and pregnancy follow-up modules
- [ ] Pharmacy and doctor integration
- [ ] Expand to nearby villages

## 👥 Team

**Team [Team Name]**: [Member 1], [Member 2], [Member 3], [Member 4]

Built for **Sociothon Round 2**.

## 📄 License

[MIT License / choose one]# GramCare
