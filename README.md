# Ikigai Frontend (Next.js)

Frontend for The Ikigai Project, migrated from Vite to Next.js with TypeScript + React.

## Stack

- Frontend hosting: Vercel
- Backend APIs: configured via environment variables (not hardcoded in repo)
- Frontend framework: Next.js + React + TypeScript

## Environment Variables

Set these in `.env.local` for local dev and in Vercel project settings for production:

```bash
# Public API base used by frontend requests.
# Use your deployed API domain or leave unset if your platform proxies /api on same-origin.
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.example
# optional aliases supported in code:
NEXT_PUBLIC_API_URL=https://your-api-domain.example
NEXT_PUBLIC_API_BASE=https://your-api-domain.example
```

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```
