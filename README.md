# 🏆 StadiumGPT — Smart Stadium Assistant for FIFA World Cup 2026

StadiumGPT is a GenAI-powered web application that improves the fan experience and stadium
operations during FIFA World Cup 2026. It combines a conversational AI assistant, live crowd
analytics, and an emergency response center in one premium, multilingual, mobile-responsive app.

> **Runs fully in "demo mode" out of the box** — no API keys required. Add a Gemini API key and
> Supabase project to unlock live AI answers, persistent auth, and real operational data.

---

## ✨ Features

| Category | Details |
|---|---|
| 🏟️ Landing Page | FIFA-inspired hero, glassmorphism UI, animated stadium background, fully responsive |
| 🤖 AI Assistant | Gemini-powered chat with conversation history, voice input, typing indicator, suggested prompts |
| 🚨 Emergency Center | SOS button, emergency contacts, nearest-exit finder, evacuation guidance |
| 📊 Crowd Analytics | Live metrics, Recharts graphs, heatmap-style gate grid, parking occupancy |
| 🌍 Multilingual | English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ), Spanish (Español) |
| 🌓 Dark/Light Mode | Persisted theme toggle |
| 🔐 Auth | Supabase auth with graceful local demo-mode fallback |
| 🔔 Notifications | In-app notification center |
| 💬 Chat History | Persisted per-browser via localStorage |
| ⚡ Resilience | Loading skeletons, global error handling, offline/demo data fallback everywhere |

---

## 🧱 Tech Stack

**Frontend:** React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion · React Router · Recharts · Lucide Icons
**Backend:** FastAPI · Google Gemini API · Supabase · Pydantic

---

## 📁 Project Structure

```
stadiumgpt/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, GlassCard, ChatBubble, ...)
│   │   ├── pages/           # Route-level pages (Home, Dashboard, AIAssistant, ...)
│   │   ├── hooks/           # useAuth, useTheme, useChat
│   │   ├── utils/           # i18n translations
│   │   ├── services/        # api.ts, supabaseClient.ts
│   │   ├── types/           # Shared TypeScript interfaces
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env.example
└── backend/
    ├── routers/          # chat, dashboard, emergency, auth
    ├── services/         # gemini_service.py, supabase_service.py
    ├── models/           # domain dataclasses
    ├── schemas/          # Pydantic request/response models
    ├── database/         # Supabase client factory
    ├── main.py
    ├── config.py
    ├── requirements.txt
    ├── render.yaml
    └── .env.example
```

---

## 🚀 Run Locally

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then fill in GEMINI_API_KEY / SUPABASE_* (optional)
uvicorn main:app --reload --port 8000
```
Backend runs at **http://localhost:8000** — interactive docs at `/docs`.

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
cp .env.example .env            # defaults already point to localhost:8000
npm run dev
```
Frontend runs at **http://localhost:5173**.

> Without a `GEMINI_API_KEY`, the AI Assistant uses a smart rule-based fallback so the app is
> always demoable. Without Supabase credentials, auth runs in local demo mode and dashboard/
> emergency data is served from realistic in-memory mock data.

---

## ☁️ Deployment

### Frontend → Vercel
```bash
cd frontend
npm i -g vercel
vercel --prod
```
Set environment variables in the Vercel dashboard: `VITE_API_BASE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
`vercel.json` is already configured for SPA routing.

### Backend → Render
1. Push this repo to GitHub.
2. In Render, "New +" → "Blueprint" → point to this repo (uses `backend/render.yaml`).
3. Set secret env vars: `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.
4. Update `ALLOWED_ORIGINS` to your deployed Vercel URL.
5. Update the frontend's `VITE_API_BASE_URL` to your Render URL + `/api`.

---

## 🔑 Environment Variables

**Frontend (`frontend/.env`)**
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**Backend (`backend/.env`)**
```
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
ALLOWED_ORIGINS=http://localhost:5173
ENVIRONMENT=development
```

---

## 📡 API Documentation

Base URL: `/api`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/chat` | Send a message + history, get an AI reply |
| GET | `/dashboard/metrics` | Live headline metrics |
| GET | `/dashboard/gates` | Gate-by-gate queue/status |
| GET | `/dashboard/parking` | Parking zone occupancy |
| GET | `/dashboard/crowd-trend` | Crowd density time series |
| GET | `/emergency/contacts` | Emergency contact directory |
| GET | `/emergency/exits` | Nearest exits with crowd level |
| POST | `/emergency/sos` | Trigger an SOS alert, returns a ticket ID |
| POST | `/auth/register` | Register via Supabase |
| POST | `/auth/login` | Login via Supabase |
| GET | `/health` | Health check |

Full interactive docs (Swagger UI) available at `/docs` when the backend is running.

---

## 🗄️ Supabase Schema (optional, for live data)

If you want the dashboard/emergency endpoints to serve real data instead of the built-in mock
data, create these tables in Supabase (all optional — the API detects and falls back
automatically if any table is missing):

```sql
create table dashboard_metrics (label text, value numeric, unit text, trend text, "changePercent" numeric);
create table gate_status (gate text, status text, "queueLength" int, "waitTimeMinutes" int);
create table parking_zones (zone text, "totalSlots" int, "occupiedSlots" int);
create table crowd_trend (time text, density numeric);
create table emergency_contacts (id text, name text, role text, phone text, "available247" boolean);
create table evacuation_exits (id text, gate text, "distanceMeters" int, "crowdLevel" text, status text);
create table sos_events (ticket_id text, location text, created_at timestamptz);
```

---

## 🏗️ Deployment Checklist

- [ ] Set `GEMINI_API_KEY` in backend env
- [ ] Set `SUPABASE_URL` / `SUPABASE_SERVICE_KEY` in backend env
- [ ] Set `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in frontend env
- [ ] Update `ALLOWED_ORIGINS` on backend to match deployed frontend URL
- [ ] Update `VITE_API_BASE_URL` on frontend to match deployed backend URL

---

## 📄 License

MIT — built for demonstration/hackathon purposes for FIFA World Cup 2026.
