# Project Plan

**Status**: Awaiting Integration
**Created**: 2026-11-11
**Mode**: NEW

---

## 1. Project Overview

**Goal**: MarketFlow is a multi-business marketing workspace for service businesses to manage business profiles, review AI-assisted campaign drafts, and track customer inquiries from channels such as Instagram and Google. The project is designed so that every module is independently testable.

**App Type**: SPA + API

**API Login**: Yes

**Mode**: NEW

**Deployment Plan**: No deployment plan found

---

## 2. Backend - Azure Functions

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node |
| **Framework** | Azure Functions |
| **Package Manager** | npm |
| **Test Runner** | Vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |
| **Orchestration** | docker-compose |

> This backend handles business profile management, campaign draft generation, lead intake review, and ownership-safe routing for AI content suggestions. It exposes JSON endpoints for the web app and stores business data in PostgreSQL while preserving uploaded media in Blob Storage.

---

## 3. Frontend — Web App

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Framework** | React + Vite |
| **Package Manager** | npm |
| **Test Runner** | Vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

> The frontend is a single-page marketing workspace where each business owner can maintain a profile, review AI-crafted campaign drafts, and monitor inquiry volume and campaign status across channels.

---

## 4. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Blob Storage | Store marketing media, uploaded brand assets, and document attachments | STORAGE_CONNECTION_STRING | UseDevelopmentStorage=true | Essential |
| PostgreSQL | Primary data store for business profiles, lead records, and campaign draft history | DATABASE_URL | postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/marketflow | Essential |

---

## 5. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | frontend, backend | ✅ | v24.14.1 |
| npm | frontend, backend | ✅ | 10.8.2 |
| Azure Functions Core Tools | backend | ❓ | unknown |
| Docker + Docker Compose | backend | ✅ | Docker version 29.4.0, build 9d7ad9f |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| ms-azuretools.vscode-azurefunctions | backend | ❓ | unknown |
| ms-azuretools.vscode-docker | backend | ❓ | unknown |

> The Run group lists the tooling required to start and operate the project locally. The Debug group includes the VS Code integrations required for Azure Functions and local container orchestration. Any tool marked ❓ should be re-checked before proceeding.

---

## 6. Design System & UI

**Component Library**: Fluent UI v9
**Style Direction**: Modern, warm, conversion-focused workspace for beauty and wellness businesses. The experience balances premium brand presentation with clear lead-generation metrics and practical campaign review workflows.
**Typography**: Inter, system-ui

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#0F766E` | Brand color for primary buttons, active navigation, and CTA actions |
| `accent` | `#7C3AED` | Secondary accent for campaign highlights, status chips, and support actions |
| `surface` | `#F8FAFC` | Main page and card background for a calm, airy workspace |
| `text` | `#0F172A` | Body text and primary labels |
| `muted` | `#475569` | Secondary labels, timestamps, and supporting metadata |
| `border` | `#E2E8F0` | Dividers, borders on cards, and form outlines |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Overview | `/` | Review business performance and active campaign activity | `hero + stats + card-list` |
| Business Profile | `/business-profile` | Maintain core business details, services, and contact info | `two-column(media+meta) + action-bar` |
| Campaign Drafts | `/campaign-drafts` | Review AI-generated campaign concepts and approve next steps | `table + actions` |

### Sample Content

```
Overview — business:
| Business | Leads | Drafts | Status |
| Luna Spa Studio | 42 | 3 | Live |
| Northline Hair Studio | 31 | 2 | Draft |
| Harbor Med Spa | 24 | 1 | Review |

Business Profile — business details: Name: Luna Spa Studio · Services: Facials, brow sculpting, lash lift · Area: Downtown + Instagram-first

Campaign Drafts — campaign concept:
| Campaign | Channel | Reach | Status |
| Summer Glow Facial Offer | Instagram | 8.4K | Ready for review |
| Lash Lift Rebooking Push | Google | 5.1K | Draft |
| Bridal Glow Package | Email | 2.7K | Approved |
```

---

## 7. Project Structure

```
marketflow/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api/
│       ├── src/
│       ├── host.json
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── shared/
│   └── ui/
├── infra/
│   ├── azure-functions/
│   └── postgres/
├── .azure/
│   ├── requirements.json
│   ├── project-plan.md
│   └── .preview-temp/
├── docker-compose.yml
├── README.md
└── package.json
```

---

## 8. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/api/health` | Health check | — | `{ status, services }` | 200, 503 |
| 2 | GET | `/api/business` | Fetch the signed-in business profile | — | `{ id, name, industry, contact, services }` | 200, 404 |
| 3 | PUT | `/api/business/profile` | Update business profile details | `{ name, contact, services, hours }` | `{ id, updatedAt }` | 200, 400 |
| 4 | GET | `/api/campaigns` | List campaign drafts for the business | — | `{ campaigns: [...] }` | 200 |
| 5 | POST | `/api/campaigns/drafts` | Generate a reviewable campaign draft | `{ objective, tone, channel, offer }` | `{ draftId, status, summary }` | 201, 400 |
| 6 | GET | `/api/leads` | Get recent inquiries and lead activity | — | `{ leads: [...] }` | 200 |

---

## 9. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification
