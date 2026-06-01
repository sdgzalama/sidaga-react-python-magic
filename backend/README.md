# Portfolio Backend (FastAPI)

Simple Python backend for the personal portfolio site.

## Endpoints

- `GET /` — health check
- `GET /api/profile` — personal info
- `GET /api/projects` — list of projects (consumed by the frontend)
- `POST /api/contact` — accepts `{ name, email, message }`

## Run locally

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API: http://localhost:8000

## Deploy to Render

1. Push this repo to GitHub.
2. https://render.com → New → Web Service → connect the repo.
3. Root Directory: `backend`
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Copy the resulting URL (e.g. `https://portfolio-api.onrender.com`).

`render.yaml` is included for Render Blueprints.

## Connect the frontend

On Vercel, set:

```
VITE_API_URL=https://portfolio-api.onrender.com
```

Then redeploy.
