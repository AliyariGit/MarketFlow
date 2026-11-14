# MarketFlow

MarketFlow is a multi-business marketing workspace for service businesses to manage business profiles, review AI-assisted campaign drafts, and monitor customer inquiries.

## Structure

- `apps/web` — React + Vite frontend
- `apps/api` — Azure Functions API
- `packages/shared` — shared types and contracts
- `docker-compose.yml` — local Postgres for development

## Getting started

1. Install dependencies with `npm install`
2. Start Postgres with `docker-compose up -d`
3. Start the API: `npm --prefix apps/api run start`
4. Start the web app: `npm --prefix apps/web run dev`

## Build

```bash
npm run build
```
