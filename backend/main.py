from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List
import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("portfolio")

app = FastAPI(title="Sidaga Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Project(BaseModel):
    id: int
    title: str
    description: str
    tech: List[str]
    link: str | None = None


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


PROFILE = {
    "name": "Sidaga Waziri Kihongo",
    "title": "Machine Learning Engineer | Data & Backend Systems",
    "location": "Iringa, Tanzania",
    "email": "sidagawazirikihongo@gmail.com",
    "phone": "+255 686 000 231",
}

PROJECTS: List[Project] = [
    Project(id=1, title="Customer Churn Predictor",
            description="End-to-end ML pipeline that predicts churn from billing and usage data, served via a FastAPI endpoint.",
            tech=["Python", "scikit-learn", "FastAPI", "PostgreSQL"]),
    Project(id=2, title="Document Classification API",
            description="NLP service that classifies incoming documents into categories with confidence scores and audit logging.",
            tech=["Python", "Transformers", "FastAPI", "Docker"]),
    Project(id=3, title="Sales Forecasting Pipeline",
            description="Automated ETL + time-series forecasting workflow with daily retraining and monitoring dashboards.",
            tech=["Python", "Prophet", "Airflow", "SQL"]),
]


@app.get("/")
def root():
    return {"status": "ok", "service": "portfolio-api"}


@app.get("/api/profile")
def get_profile():
    return PROFILE


@app.get("/api/projects")
def get_projects():
    return {"projects": [p.model_dump() for p in PROJECTS]}


@app.post("/api/contact")
def post_contact(msg: ContactMessage):
    log.info("Contact message from %s <%s>: %s", msg.name, msg.email, msg.message[:200])
    return {"success": True, "message": "Thanks for reaching out — I'll get back to you soon."}