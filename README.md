# Architecture AI Tutor

A student-focused design studio workspace for turning an assignment brief into ideas, studies, and critique-ready work.

Developed by **Ronald Thaivan** as an architecture-focused extension of a collaborative AI Tutor project. This repository brings the architecture work together on its own default branch while preserving the architecture development history and crediting the original project.

## What it does

- **Project:** paste or import an assignment PDF, review requirements, work through a guided project tutor, or ask for help with a specific design issue.
- **Explore:** sketch through Site, Light, Movement, and Form exercises; develop and compare concepts; collect references and notes; generate exploratory concept images with AI.
- **Finish:** track requirements and milestones, prepare for pin-ups, record critique feedback, and export project notes.
- **Learn:** use the chat interface with architecture starter questions, or switch to architecture lessons on site analysis, circulation, scale, spatial organization, zoning and safety, accessibility, and lighting.

The interface uses a warm cream, muted green, and terracotta palette. Activities are grouped into Project, Explore, and Finish, with expandable guidance to reduce visual clutter.

## Try a walkthrough

1. Open `/studio` and enter a project name and assignment brief.
2. Use **Project → Review requirements** for AI analysis, or explore the manual tools without an API key.
3. In **Explore → Exercises**, choose one or more lenses and open a prompt to sketch or write a response.
4. Add concept cards and references; use **Generate images** when AI is configured.
5. Use **Finish** to plan deliverables, record critique notes, and export your work.
6. Open `/learning` for architecture chat, or choose **Exercises & progress** for independent lessons.

## Local setup

Prerequisites: Node.js 22.12+ (Node 24 recommended), Python 3.11+, and Git.

```bash
git clone https://github.com/itsronathan/architecture-ai-tutor.git
cd architecture-ai-tutor
```

### Backend

```bash
cd backend
python -m venv .venv
```

Activate the environment:

```powershell
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
```

```bash
# macOS / Linux
source .venv/bin/activate
```

Then install dependencies, copy `.env.example` to `.env`, and start the server:

```bash
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

For live AI features, set `OPENAI_API_KEY` in `backend/.env`. API usage requires provider billing. Never commit your key or put it in a frontend variable.

### Frontend

In another terminal:

```bash
cd frontend
npm install
```

The development server uses your local backend by default. To override it, create `frontend/.env.local` with:

```dotenv
VITE_API_URL=
DEV_API_PROXY_TARGET=http://127.0.0.1:8000
```

Then run:

```bash
npm run dev
```

Open `http://localhost:5173/studio`. Development requests go to `http://127.0.0.1:8000` by default. Production uses the same origin; set `VITE_API_URL` when deploying the backend separately.

## What needs AI?

Manual exercises, concept cards, reference notes, planning, and exports work without an AI key. PDF text extraction needs the backend. Assignment analysis, AI tutoring, and image generation need the backend and a configured provider key. Images are exploratory, not construction drawings or verified designs.

Project notes are saved in the browser; they are not automatically synced between devices. Export important work. Code and accessibility topics support learning and source research, not compliance approval.

## Technology

React 19 · TypeScript · Vite · Python · FastAPI · OpenAI API

The active application is architecture-only. Legacy FOCS textbook, math grading, and progress modules are no longer loaded by the UI or registered as backend routes. Architecture chat, exercises, and learning progress replace that flow; authentication and profile settings remain available.

## Development checks

```bash
cd frontend
npm run build
npm run test:run -- src/ArchitectureLearningMode.test.tsx src/StudioBrainstorm.test.tsx src/studio/BriefPdfUpload.test.tsx src/studio/ProjectTutor.test.tsx
```

## Credits and license

Based on the collaborative [AI Tutor project](https://github.com/itsronathan/AI_tutor), with architecture work carried forward from `codex/studio-brainstorm-starter`. Ronald Thaivan developed the architecture extension with AI-assisted coding and feedback from an architecture student.

The original project is imported as a single baseline commit; the architecture development commits are preserved individually. Original authorship is credited here and in the license. The original MIT copyright notice, **Copyright (c) 2025 JinBoatus1**, remains in [LICENSE](LICENSE). This is a student prototype, not an official RPI product.
