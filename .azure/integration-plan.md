# MarketFlow Integration Handoff

## Services
- Backend: `apps/api`; Azure Functions v4, Node.js 4 programming model.
- Start: `npm --prefix apps/api run start`; port `7071`.
- Build: `npm --prefix apps/api run build`.
- Health: `GET /api/health`.
- Frontend: `apps/web`; build `npm --prefix apps/web run build`; dev `npm --prefix apps/web run dev`.
- Frontend API swap seam: `apps/web/src/api/index.ts` (currently exports `mockClient`). Replace this seam only.
- Remove after live wiring: `apps/web/src/api/mockClient.ts`, `apps/web/src/mocks/data.ts`, frontend-local domain types in `apps/web/src/api/types.ts`, `apps/web/src/api/previewState.ts`, and the preview-state switcher in `apps/web/src/App.tsx`.
- Shared contracts: `packages/shared`, package `@marketflow/shared`; build with `npm --prefix packages/shared run build`. Wire frontend and API types to this package and keep emitted imports resolvable.

## Routes
- `GET /api/health`
- `GET /api/business`
- `PUT /api/business/profile`
- `GET /api/campaigns`
- `POST /api/campaigns/drafts`
- `GET /api/leads`
- `POST /api/auth/register` (required by `API Login: Yes`; not scaffolded yet)
- `POST /api/auth/login` (required; not scaffolded yet)
- `GET /api/auth/me` (required; not scaffolded yet)
- `POST /api/auth/logout` (required; not scaffolded yet)

## Authentication
- Plan says `API Login: Yes`; add registration, login, current-user, logout, and authorization middleware. Persist password hashes, issue and validate short-lived signed sessions, and protect all feature routes.
- Add the frontend login/logout and dedicated create-account flow through the `ApiClient` seam. Keep initial local preview signed in; logout must expose login and account creation.
- Require production signing configuration; document it in `.env.example`. Never use an embedded production secret.

## Data And Azure Services
- PostgreSQL (Essential): `DATABASE_URL`; migrations in `apps/api/migrations` using `node-pg-migrate`.
- Blob Storage (Essential): `STORAGE_CONNECTION_STRING` for Development/Azurite only; production uses the storage endpoint with managed identity. Add the local Azurite service/configuration if absent.
- Create migrations only. **Do not create seed data.**
- Define collection/table mapping for business profiles, campaign drafts, leads, and users; use transactions for multi-table writes.

## Current Scaffold Notes
- The API currently serves in-memory fixture data; replace it with PostgreSQL-backed repositories.
- `apps/api/src/functions/` contains the six planned route handlers. Feature routes are currently anonymous; add auth before considering integration complete.
- Storage providers, database repositories, auth endpoints, and migrations are not present yet. Build gates passed, but live-data wiring and these listed requirements remain integration work.
- Azure service classification: Blob Storage Essential; PostgreSQL Essential; no Enhancement services planned.
