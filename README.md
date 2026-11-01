# IVR Tech Solutions Private Limited
### Official Corporate Web Platform & Backend Service
**Tagline:** *Innovation That Builds Tomorrow.*

An enterprise-grade, Accenture-inspired corporate website and web platform built for **IVR Tech Solutions Private Limited** (Chennai, Tamil Nadu).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested & verified on Node v24)
- **npm**: v10+

Before starting the server, copy `server/.env.example` to `server/.env` and set a unique `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`. Never commit `server/.env`.

### 2. Starting the Platform
You can run the unified full-stack application immediately:

```bash
# Starts the backend API & static corporate web application
npm start
```
The entire platform will be available at: **[http://localhost:5000](http://localhost:5000)**

### 3. Development Mode
To run with hot-module reloading on both frontend and backend:
```bash
# Terminal 1 (Backend API on port 5000)
npm run dev:server

# Terminal 2 (Vite React Client on port 3000)
npm run dev:client
```
Client: **[http://localhost:3000](http://localhost:3000)** (auto-proxies `/api` to port 5000)<br>
Server: **[http://localhost:5000](http://localhost:5000)**

---

## 🔐 Admin Console & Credentials

Access the secure administrative console by navigating to:
**[http://localhost:5000/admin](http://localhost:5000/admin)**

- Sign in with the `ADMIN_USERNAME` and `ADMIN_PASSWORD` values configured in `server/.env`.

### Admin Capabilities
1. **Overview Dashboard**: Live counters for Inquiries, RFPs, Job Applications, and Articles.
2. **Contact Inquiries**: Review submissions from prospective clients with status workflows (`NEW`, `IN_PROGRESS`, `RESOLVED`).
3. **Project RFPs ("Let's Talk")**: Review scope descriptions, client contact info, and budget indications with status workflows (`NEW`, `IN_REVIEW`, `PROPOSAL_SENT`, `CLOSED`).
4. **Careers & Resume Downloads**: Review candidate submissions, read cover letters, and download candidate resume files directly.
5. **Insights / Blog Publisher**: Draft, publish, or delete corporate articles and technical whitepapers.

---

## 🏛️ Brand & Visual Identity

- **Official Legal Name:** IVR Tech Solutions Private Limited
- **Brand Name:** IVR Tech Solutions
- **Tagline:** Innovation That Builds Tomorrow.
- **Color Palette:**
  - Pure White: `#FFFFFF`
  - Light Grey: `#F5F6F8` (Card Surfaces: `#FFFFFF`, Borders: `#E5E7EB`)
  - Dark Navy Typography: `#111827`
  - Brand Purple Accent: `#7047EB`
  - Brand Blue Accent: `#3478E5`
- **Typography:** `Manrope` (Headings & Display), `Inter` (UI & Body)
- **Corporate Geometric Logo:** Custom SVG monogram featuring the bold letters "IVR" with a forward-leaning technological chevron accent.

---

## 📄 Pages Included

1. **Home (`/`)**: Hero headline *"Building Digital Solutions That Move Businesses Forward."*, Company Intro, 8 Services overview, Why Choose IVR pillars, Featured Projects preview, 4-stage Development Process, Tech Capabilities, Client Testimonials, and Let's Talk CTA.
2. **About Us (`/about`)**: Entity history in Chennai TN, Mission, Vision, Core Values, Executive Governance & Leadership Councils, Engineering Approach, and Commitment to Innovation.
3. **Services (`/services`)**: Comprehensive breakdown of all 8 services:
   - Web Development
   - Mobile Application Development
   - Software Development
   - Artificial Intelligence and Machine Learning
   - Cloud Solutions & Telephony
   - UI/UX Design
   - IT Consulting
   - Digital Transformation
4. **Our Work (`/work`)**: Filterable project portfolio with verified company projects (Flashcard Study App, Supermarket Management System, Online Store Website, Clinic Appointment System, Sales Analytics Dashboard, Student Portfolio Platform, Business Lead Generation Website) plus clearly marked Enterprise Demonstration Models. Interactive Case Study modal displaying Problem, Solution, and Measurable Outcomes.
5. **Careers (`/careers`)**: Culture, hiring process, detailed job specs, and a working application form with secure resume file upload (`.pdf`, `.doc`, `.docx`, max 5MB).
6. **Insights (`/insights` & `/insights/:slug`)**: Blog & technical whitepapers with live category filtering, search bar, and reader detail view.
7. **Contact Us (`/contact`)**: Official emails (`admin@ivrtechsolution.in`, `ivrtechsolutionspvtld@gmail.com`), phone numbers (`+91 8143177907`, `+91 8008640126`), Chennai location, existing website reference, direct WhatsApp integration, and working contact form.
8. **Let's Talk (`/lets-talk` & Modal)**: Project scope estimator and proposal submission tool accessible anywhere on the site.
9. **Admin Console (`/admin`)**: Protected management portal with JWT token authentication.
10. **Legal Compliance (`/privacy` & `/terms`)**: Comprehensive Privacy Policy and Terms of Service.

---

## 🔒 Security & Backend Features

- **Embedded SQLite (node:sqlite)**: Lightning-fast, ACID compliant, zero native build errors, automated schema migration and seed data.
- **Secure File Storage**: Multer configured with filename sanitization, UUID suffixing, 5MB limit, and MIME verification for `.pdf`, `.doc`, and `.docx`.
- **Anti-Spam Controls**: Honeypot detection fields and Express IP rate limiters on public form endpoints.
- **Email Notifications**: Integrated Nodemailer dispatcher with console fallback when SMTP is in local development mode.
- **Security Headers**: Helmet integration and CORS protection.

---

## 🧪 Running Automated Tests

An automated test suite is provided in `test_platform.js`. Run it anytime with:
```bash
node test_platform.js
```
Verifies all 31 end-to-end integration checks including health checks, static SPA serving, form submissions, validation errors, search, authentication, and resume uploads.
