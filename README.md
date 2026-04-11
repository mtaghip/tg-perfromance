# TG Performance Cars – Website

A production-ready Next.js website for TG Performance Cars, with live AutoTrader Connect API integration. Stock automatically updates from AutoTrader whenever you add, edit or remove vehicles in your dealer portal.

---

## Tech Stack

- **Framework**: Next.js 14 (React)
- **API**: AutoTrader Connect (Stock API)
- **Styling**: CSS-in-JS (Next.js `<style jsx>`) + global CSS
- **Deployment**: Vercel (recommended) or any Node.js host

---

## Project Structure

```
tg-performance/
├── lib/
│   └── autotrader.js        ← AutoTrader API client (auth, fetch, normalise)
├── pages/
│   ├── api/
│   │   ├── stock.js          ← GET /api/stock (all vehicles, with filters)
│   │   ├── stock/[id].js     ← GET /api/stock/:id (single vehicle)
│   │   └── enquiry.js        ← POST /api/enquiry (contact/enquiry form)
│   ├── stock/
│   │   ├── index.js          ← /stock — full stocklist with filters
│   │   └── [id].js           ← /stock/:id — individual vehicle detail
│   ├── index.js              ← / — homepage
│   ├── about.js              ← /about
│   ├── contact.js            ← /contact
│   ├── finance.js            ← /finance
│   ├── sell-your-car.js      ← /sell-your-car
│   └── 404.js                ← Custom 404 page
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   └── CarCard.js
├── styles/
│   └── globals.css
├── next.config.js
├── package.json
└── .env.local.example        ← Copy to .env.local and fill in your values
```

---

## Quick Start

### 1. Install dependencies

```bash
cd tg-performance
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```env
AUTOTRADER_API_KEY=your_api_key
AUTOTRADER_API_SECRET=your_api_secret
AUTOTRADER_ADVERTISER_ID=your_dealer_id
```

AutoTrader will supply these when they grant you API access.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## AutoTrader Connect API Setup

### Getting Access

1. Contact AutoTrader via [autotrader.co.uk/partners](https://www.autotrader.co.uk/partners/retailer/platform/autotrader-connect) or speak to your AutoTrader account manager
2. Request **AutoTrader Connect API** access as an independent partner
3. You will receive an **API Key**, **API Secret**, and confirm your **Advertiser ID** (your dealer ID — typically 4–8 digits)

### How Authentication Works

AutoTrader uses OAuth 2.0 client credentials. The flow in `lib/autotrader.js`:

1. Exchange your API Key + Secret for an access token (valid 15 minutes)
2. Attach the token as `Authorization: Bearer <token>` on all API calls
3. Tokens are cached and refreshed automatically

### Stock API Endpoints Used

| Action | Method | Endpoint |
|--------|--------|----------|
| Get all stock | `GET` | `https://api.autotrader.co.uk/stock?advertiserId={id}` |
| Get single vehicle | `GET` | `https://api.autotrader.co.uk/stock/{stockId}?advertiserId={id}` |

### Stock Data Caching

Stock is cached in memory for **5 minutes** to avoid rate-limiting. The cache is automatically invalidated and refreshed after that. For a production deployment with multiple server instances, replace the in-memory cache in `pages/api/stock.js` with Redis or a database.

### Rate Limiting

AutoTrader applies fair-use rate limits. If you hit a `429` response the client automatically waits 1 second and retries. Contact `partner.support@autotrader.co.uk` if you need a higher limit.

---

## Enquiry Form (Email Setup)

The enquiry form (`/api/enquiry`) currently logs submissions to the console. To send real emails:

1. Install nodemailer:
```bash
npm install nodemailer
```

2. In `pages/api/enquiry.js`, uncomment the nodemailer block and fill in your SMTP details in `.env.local`:

```env
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your@gmail.com
EMAIL_SMTP_PASS=your_app_password
```

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your main password. For a more reliable setup use [Mailgun](https://mailgun.com) or [SendGrid](https://sendgrid.com).

---

## Deployment (Vercel — Recommended)

Vercel is the easiest way to deploy a Next.js site.

### Steps

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. In the Vercel dashboard, go to **Settings → Environment Variables** and add:
   - `AUTOTRADER_API_KEY`
   - `AUTOTRADER_API_SECRET`
   - `AUTOTRADER_ADVERTISER_ID`
   - Any email/SMTP variables
4. Deploy — Vercel handles everything automatically

### Custom Domain

In Vercel → Settings → Domains, add `www.tgperformancecars.co.uk` and follow the DNS instructions.

---

## Alternative Deployment (VPS / cPanel)

If you prefer to host on your own server:

```bash
npm run build
npm start
```

Use [PM2](https://pm2.keymetrics.io/) to keep the process running:

```bash
npm install -g pm2
pm2 start npm --name "tg-performance" -- start
pm2 save
```

Set up Nginx as a reverse proxy pointing port 80/443 → port 3000.

---

## Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero, latest stock (live), services, reviews, contact |
| Stocklist | `/stock` | All live vehicles, filterable by make/price/fuel/keyword |
| Vehicle Detail | `/stock/[id]` | Full spec, image gallery, enquiry form |
| Finance | `/finance` | Finance types and how it works |
| Sell Your Car | `/sell-your-car` | Valuation request form |
| About | `/about` | About TG Performance |
| Contact | `/contact` | Contact details and enquiry form |

---

## Customisation

### Your Details

Search for `Flitwick, Bedfordshire` across the codebase and replace with your full address. Update the phone number and email in:
- `components/Footer.js`
- `pages/contact.js`
- `pages/index.js`

### Colours

Edit `styles/globals.css`:
```css
:root {
  --gold: #C9A84C;       /* Change to your brand colour */
  --gold-light: #E8C96A;
}
```

### Logo

Replace the text logo in `components/Navbar.js` with an `<img>` tag pointing to your logo file in `/public`.

---

## Support

For AutoTrader API issues: `partner.support@autotrader.co.uk`
