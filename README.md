<div align="center">

# 🎯 CrackIT

**Crack any interview — powered by AI that reads the room before you walk in.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Gemini](https://img.shields.io/badge/Gemini%20API-Generative%20AI-8E75FF?logo=googlegemini&logoColor=white)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

</div>

---

## Overview

**CrackIT** turns any resume and job description into a personalized battle plan for your next interview. Upload a resume — or type a quick self-description — alongside the job you're targeting, and CrackIT tells you exactly where you stand: a match score, the technical and behavioral questions you're likely to face (with model answers), the skill gaps that could cost you the offer, and a day-by-day roadmap to close them before interview day. It can also rewrite your resume to be ATS-optimized for that specific role, delivered as a ready-to-send PDF.

The name is the promise: don't just prepare for an interview — crack it.

Built to demonstrate a complete, production-shaped full-stack flow: custom session auth (not a third-party auth provider), structured LLM output handled safely, and server-side PDF generation from AI-produced content.

<!-- Add a screenshot or GIF of the app here -->
<!-- <p align="center"><img src="docs/screenshot.png" width="800" alt="CrackIT app screenshot" /></p> -->

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Database Models](#database-models)
- [API Reference](#api-reference)
- [Key Design Decisions](#key-design-decisions)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [License](#license)

## Features

- **Custom JWT authentication** with HTTP-only cookies and server-side token blacklisting on logout
- **Resume parsing** (PDF text extraction) combined with free-text self-description as input
- **AI-generated interview reports** — technical questions, behavioral questions, skill gaps, and a day-wise prep plan, all schema-validated
- **ATS resume generation** — Gemini writes tailored resume HTML, rendered to a PDF via Puppeteer
- **Report history** — every plan you've generated, saved and browsable, so you can track how your prep evolves
- **Automatic retry on AI overload** — transient `503` responses from Gemini are retried with backoff

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React (Vite), React Router, Axios, SCSS (feature-scoped stylesheets) |
| **Backend** | Node.js, Express, MongoDB + Mongoose |
| **Auth** | `jsonwebtoken`, `bcryptjs`, custom token-blacklist collection |
| **File handling** | `multer` (in-memory uploads), `pdf-parse` (resume text extraction) |
| **AI / Generation** | `@google/genai` (Gemini API), `zod` (schema definition + response validation) |
| **PDF rendering** | `puppeteer` (headless Chromium, HTML → PDF) |

## Architecture

### Frontend — layered, feature-based

The frontend is organized by feature (`auth`, `interview`), and each feature follows the same four-layer pattern so a component never talks to the network or global state directly:

```
Component (Pages)
      │
      ▼
Custom Hook (useAuth / useInterview)   ← the only thing components call
      │
      ▼
Context (AuthContext / InterviewContext)  ← global state
      │
      ▼
Service (auth.api.js / interview.api.js) ← Axios calls, one function per endpoint
```

`Protected.jsx` wraps any route that requires authentication: it reads `loading`/`user` from `useAuth`, shows a loading state while the session check resolves, and redirects to `/login` if there's no valid user.

### Backend — MVC with dedicated AI/PDF services

```
Client Request
      │
      ▼
Router                (auth.routes.js / interview.routes.js)
      │
      ▼
Middleware             (authUser: verifies JWT + blacklist · upload: Multer file parsing)
      │
      ▼
Controller              (auth.controller.js / interview.controller.js)
      │
      ├──▶ AI Service   (ai.service.js — Gemini call + Zod-validated response)
      ├──▶ PDF Service   (Puppeteer — HTML → PDF buffer)
      │
      ▼
Model (Mongoose)         (user / blacklist / interviewReport)
      │
      ▼
Response to Client
```

**Auth flow:** login/register issues a JWT (`res.cookie`), sent as an HTTP-only cookie on every subsequent request. `authUser` middleware checks the token against a blacklist collection *before* verifying its signature — this is what makes logout actually work despite JWTs being stateless (see below).

**Report generation flow:** `POST /api/interview/` → Multer parses the uploaded resume into memory → `pdf-parse` extracts its text → the combined resume/self-description/job-description prompt is sent to Gemini with a `zod`-defined output schema → the validated JSON is spread directly into a new `InterviewReport` document.

**Resume PDF flow:** Gemini generates ATS-tailored resume content as an HTML string (schema-validated to guarantee a `html` field) → Puppeteer launches headless Chromium → renders and exports it as a PDF buffer → streamed back as a file download.

## Folder Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── interview.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT verification + blacklist check
│   │   └── file.middleware.js   # Multer config
│   ├── models/
│   │   ├── user.model.js
│   │   ├── blacklist.model.js
│   │   └── interviewReport.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── interview.routes.js
│   ├── services/
│   │   └── ai.service.js        # Gemini integration + Puppeteer PDF generation
│   └── app.js                   # Express app setup
└── server.js                    # Entry point

Frontend/
└── src/
    ├── features/
    │   ├── auth/
    │   │   ├── components/Protected.jsx
    │   │   ├── hooks/useAuth.js
    │   │   ├── pages/Login.jsx, Register.jsx
    │   │   ├── services/auth.api.js
    │   │   └── auth.context.jsx
    │   └── interview/
    │       ├── hooks/useInterview.js
    │       ├── pages/Home.jsx, Interview.jsx
    │       ├── services/interview.api.js
    │       ├── interview.context.jsx
    │       └── style/
    ├── App.jsx
    ├── app.routes.jsx
    └── main.jsx
```

## Database Models

**`User`**
| Field | Type | Notes |
|---|---|---|
| username | String | unique |
| email | String | unique |
| password | String | bcrypt hash |

**`InterviewReport`**
| Field | Type | Notes |
|---|---|---|
| title | String | job title, AI-generated |
| jobDescription | String | required |
| resume / selfDescription | String | optional |
| matchScore | Number | 0–100 |
| technicalQuestions / behavioralQuestions | [{ question, intention, answer }] | |
| skillGaps | [{ skill, severity }] | severity: `low` \| `medium` \| `high` |
| preparationPlan | [{ day, focus, tasks[] }] | |
| user | ObjectId ref | owner |

**`blacklistTokens`**
| Field | Type | Notes |
|---|---|---|
| token | String | invalidated JWTs, checked on every request |

## API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new account |
| POST | `/api/auth/login` | Public | Authenticate and receive a session cookie |
| GET | `/api/auth/logout` | Public | Blacklist the current token, clear the cookie |
| GET | `/api/auth/get-me` | Private | Return the current authenticated user |
| POST | `/api/interview/` | Private | Generate a new interview report (multipart: `resume`, `jobDescription`, `selfDescription`) |
| GET | `/api/interview/` | Private | List all reports for the current user |
| GET | `/api/interview/report/:interviewId` | Private | Fetch a single report |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Private | Generate and download an ATS-optimized resume PDF |

## Key Design Decisions

**JWT + token blacklisting, not pure stateless JWTs.** JWTs can't be revoked before their natural expiry — logout alone doesn't invalidate them. On logout, the token is stored in a `blacklistTokens` collection; the auth middleware checks this collection *before* verifying the token's signature on every protected request, so a logged-out token is rejected immediately even though it hasn't technically expired.

**Zod schemas validate Gemini's output, not just parse it.** LLM responses are non-deterministic — `JSON.parse` only guarantees valid syntax, not the expected shape. The report schema is passed to Gemini as `responseJsonSchema`, and the same Zod schema implicitly defines the contract the rest of the app relies on, catching malformed AI output before it reaches the database.

**Puppeteer over a PDF-drawing library.** Rather than manually positioning text with a library like `pdfkit`, Gemini generates real HTML/CSS for the resume, and Puppeteer renders it through headless Chromium — giving pixel-accurate, styled output that matches normal web layout instead of a hand-plotted document.

**Retry with exponential backoff on Gemini `503`s.** Even GA models occasionally return `UNAVAILABLE` under load spikes. Both AI-calling functions retry (default: 3 attempts, doubling delay) before surfacing a real error to the client.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- A Google Gemini API key

### Backend

```bash
cd Backend
npm install
# create a .env file — see Environment Variables below
node server.js
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:3000` (see `services/*.api.js` — update `baseURL` if deploying).

## Environment Variables

Create a `.env` file inside `Backend/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

## Roadmap

Where CrackIT goes next:

- [ ] Refresh-token rotation alongside the current blacklist model, for longer-lived sessions
- [ ] Rate-limit AI-facing endpoints to control Gemini API cost under load
- [ ] Queue PDF generation as a background job instead of handling it inline on the request thread
- [ ] Support `.docx` resume uploads (currently PDF only)
- [ ] Deployment via Vercel (frontend) + Render/Railway (backend)


---

<div align="center">

**CrackIT** — built as a full-stack project covering custom authentication, structured LLM output handling, and AI-driven PDF generation.

</div>
