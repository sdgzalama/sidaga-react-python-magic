import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sidaga Waziri Kihongo — Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Sidaga Waziri Kihongo, Machine Learning Engineer specializing in data pipelines, model deployment, and backend systems.",
      },
      { property: "og:title", content: "Sidaga Waziri Kihongo — ML Engineer" },
      {
        property: "og:description",
        content:
          "ML Engineer based in Iringa, Tanzania. Python, data pipelines, APIs, model deployment.",
      },
    ],
  }),
  component: Index,
});

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

type Project = { id: number; title: string; description: string; tech: string[]; link?: string };

const SKILLS: Record<string, string[]> = {
  "Machine Learning": [
    "scikit-learn",
    "PyTorch",
    "XGBoost",
    "Feature Engineering",
    "Model Validation",
  ],
  "Data & Backend": ["Python", "FastAPI", "REST APIs", "PostgreSQL", "ETL Pipelines"],
  Engineering: ["Git", "Testing", "Docker", "CI/CD", "Production Debugging"],
  Infrastructure: ["Networking", "IT Systems", "Linux", "Cloud Deployment"],
};

function Index() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsError, setProjectsError] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.projects) setProjects(data.projects);
        else setProjectsError(true);
      })
      .catch(() => setProjectsError(true));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-semibold tracking-tight">
            SWK
          </a>
          <div className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            <a href="#about" className="hover:text-foreground">
              About
            </a>
            <a href="#skills" className="hover:text-foreground">
              Skills
            </a>
            <a href="#projects" className="hover:text-foreground">
              Projects
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-6">
        <section className="py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Machine Learning Engineer
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            Sidaga Waziri Kihongo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Data &amp; Backend Systems · Iringa, Tanzania. I build Python data pipelines, train and
            validate ML models, and ship them into reliable production systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Get in touch
            </a>
            <a
              href="mailto:sidagawazirikihongo@gmail.com"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              Email me
            </a>
          </div>
        </section>

        <section id="about" className="border-t border-border py-16">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Machine Learning Engineer with a Computer Science background and hands-on experience
              building Python-based data pipelines, training machine learning models, and deploying
              them into production environments. I turn raw, messy data into reliable features,
              select and validate models, and integrate ML into real systems via APIs and automated
              workflows.
            </p>
            <p>
              Strong foundation in software engineering principles, relational databases, and system
              design, with practical exposure to version control, testing, and production debugging.
              Additional expertise in networking and IT infrastructure helps me collaborate across
              data, backend, and operations teams and keep deployed models stable, observable, and
              maintainable.
            </p>
            <p>
              Focused on practical ML: models that run, scale, and deliver measurable value. I'm
              comfortable owning the full lifecycle from data ingestion and experimentation through
              deployment, monitoring, and iteration.
            </p>
          </div>
        </section>

        <section id="skills" className="border-t border-border py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">{group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="qualifications" className="border-t border-border py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Qualifications</h2>
          <ul className="mt-6 space-y-4">
            <li className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold">B.Sc. Computer Science</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Foundation in algorithms, databases, networking, and software engineering.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold">Applied Machine Learning</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                End-to-end model development: data prep, feature engineering, training, validation,
                and deployment.
              </p>
            </li>
            <li className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold">Networking &amp; IT Infrastructure</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Practical exposure to networks and infrastructure, supporting reliable production
                deployments.
              </p>
            </li>
          </ul>
        </section>

        <section id="projects" className="border-t border-border py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">Loaded from the Python backend API.</p>
          {projectsError && (
            <p className="mt-2 text-sm text-destructive">
              Could not load projects. Make sure VITE_API_URL points to your Render service.
            </p>
          )}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-border py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                <a className="hover:underline" href="mailto:sidagawazirikihongo@gmail.com">
                  sidagawazirikihongo@gmail.com
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span> +255 686 000 231
              </p>
              <p>
                <span className="text-muted-foreground">Location:</span> Iringa, Tanzania
              </p>
              <p className="pt-2 flex gap-4">
                <a className="hover:underline" href="#" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="hover:underline" href="#" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </p>
            </div>
            <form
              onSubmit={submit}
              className="space-y-3 rounded-lg border border-border bg-card p-5"
            >
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Message"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button
                disabled={status === "sending"}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send message"}
              </button>
              {status === "error" && (
                <p className="text-xs text-destructive">
                  Could not reach the backend. Make sure VITE_API_URL points to your Render service.
                </p>
              )}
            </form>
          </div>
        </section>

        <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sidaga Waziri Kihongo
        </footer>
      </main>
    </div>
  );
}
