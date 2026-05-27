# Personal Portfolio — Sidaga Waziri Kihongo

A simple personal portfolio site with a React frontend (this Lovable project) and a separate Python FastAPI backend, ready to deploy to Vercel (frontend) and Render (backend) per the assignment.

## Frontend (React / TanStack Start — this project)

Single-page portfolio at `/` with smooth-scroll sections:

1. **Hero** — Name, title (Machine Learning Engineer | Data & Backend Systems), location, short tagline, CTA buttons (Contact, GitHub, LinkedIn).
2. **About** — Professional summary text.
3. **Skills** — Grouped chips: Machine Learning, Python, Data Pipelines, APIs, SQL/Relational DBs, Git, Testing, Networking/IT Infrastructure.
4. **Qualifications** — Computer Science background + key competencies as a clean list/cards.
5. **Projects** — 3 placeholder project cards (title, description, tech, links) fetched from the Python backend `GET /api/projects`.
6. **Contact** — Email, phone, location, LinkedIn/GitHub links + a contact form that POSTs to backend `POST /api/contact`.

Design: clean, professional, dark navy + accent (matches the assignment header vibe). Semantic tokens in `src/styles.css`. Responsive, single H1, proper meta tags.

Frontend reads backend URL from `VITE_API_URL` env var so it can point to the Render deployment.

## Backend (Python FastAPI — separate folder `backend/`)

Created in this repo under `backend/` so the user can push it to a separate Render service. Files:

- `backend/main.py` — FastAPI app with CORS enabled
  - `GET /` → `{ status: "ok" }`
  - `GET /api/profile` → personal info JSON
  - `GET /api/projects` → list of projects
  - `POST /api/contact` → accepts `{name, email, message}`, validates with Pydantic, logs and returns success
- `backend/requirements.txt` — fastapi, uvicorn, pydantic
- `backend/render.yaml` — Render service config (build + start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`)
- `backend/README.md` — local run + Render deploy instructions

## Deployment notes (in README)

- Frontend → Vercel: import repo, framework auto-detected, set `VITE_API_URL` to the Render URL.
- Backend → Render: New Web Service, root dir `backend/`, build `pip install -r requirements.txt`, start `uvicorn main:app --host 0.0.0.0 --port $PORT`.

## Out of scope

- No database, no auth (assignment says "simple backend API").
- No Lovable Cloud — backend is intentionally separate Python per assignment requirements.
