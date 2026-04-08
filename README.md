# Ikigai Frontend (Next.js)

Frontend for The Ikigai Project, migrated from Vite to Next.js with TypeScript + React.

## Stack

- Frontend hosting: Vercel
- Database: Supabase
- Backend APIs: Oracle VM (FastAPI)
- Frontend framework: Next.js + React + TypeScript

## Environment Variables

Set these in `.env.local` for local dev and in Vercel project settings for production:

```bash
# Oracle VM backend (FastAPI)
NEXT_PUBLIC_API_BASE_URL=https://api.theikigaiproject.com
# or
NEXT_PUBLIC_API_URL=https://api.theikigaiproject.com
# optionally used by payment helper
NEXT_PUBLIC_API_BASE=https://api.theikigaiproject.com

# Supabase (if/when used in frontend code)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```
