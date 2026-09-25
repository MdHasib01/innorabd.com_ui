# INNORA BD — Dream Honeymoon Campaign

Landing page (`index.html`, the original static design) rebuilt as:

- `client/` — Next.js 16 (App Router) + Tailwind v4 + shadcn/ui. Bangla (default) and English, Anek Bangla font.
- `server/` — Node + Express + Mongoose order API.

## Setup

```bash
# 1. API
cd server
npm install
# edit .env → MONGODB_URI (local or Atlas), ADMIN_TOKEN
npm run dev            # http://localhost:5000

# 2. Web
cd ../client
npm install
npm run dev            # http://localhost:3000
```

The client proxies `/api/*` to the API (`API_URL` in `client/.env.local`, default `http://localhost:5000`).

### Images

Copy the original assets into `client/public/` with their original filenames:

- Hero slides: `85636338b2c27eedb11f0413101825db.jpg`, `c98fea6dc35ae151e288c47cf20b07d8.jpg`, `5531d13a4f5a40efb03ace747e9556b8.jpg`
- Variants: `watermarked_img_13858636076422768.jpg` (pink), `watermarked_img_4878021920900929224.jpg` (burgundy), `watermarked_img_13460204106529675595.jpg` (black)
- Ticket: `Lotarry-tikit-design_2.jpg` (falls back to `Lotarry-tikit-design.jpg`)

Paths live in `client/src/lib/campaign.ts`.

## Languages

Bangla is the default. The header toggle stores the choice in a `lang` cookie, so the server renders the right
language (and `<html lang>`) on the next load. All copy is in `client/src/i18n/dictionaries.ts`.

## API

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/health` | DB connection status |
| `GET` | `/api/campaign` | Prices, payment number, tickets left |
| `POST` | `/api/orders` | Creates an order. The price is recalculated on the server, and ticket serials are generated |
| `GET` | `/api/orders?status=&page=&limit=` | Admin: header `x-admin-token: $ADMIN_TOKEN` |
| `PATCH` | `/api/orders/:id/status` | Admin: `{ "status": "confirmed" }` |

Pricing and ticket rules: `server/src/config/campaign.js` (1 dress → 1 ticket, 2 → 3, n → ⌊1.5n⌋; COD +৳100, advance payment has free delivery).
