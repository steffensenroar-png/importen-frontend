# Importen — Frontend

Next.js 14 web app for Norwegian car import cost calculator.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Auth:** Supabase Auth (email/password + magic link)
- **Fonts:** Fraunces (display) + Geist Sans
- **Deploy:** Vercel

## Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/kalkulator` | Main calculator — paste URL, get costs |
| `/priser` | Pricing plans |
| `/login` | Auth (login + signup + magic link) |
| `/dashboard` | Saved listings (auth required) |

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Fill in Supabase keys
npm run dev
```

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=https://rgmxcmyezhubzxmnrqfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://importen-backend-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://importen.no
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo at vercel.com/new
3. Add environment variables
4. Deploy — Vercel auto-detects Next.js

## Backend
API runs at `https://importen-backend-production.up.railway.app`
