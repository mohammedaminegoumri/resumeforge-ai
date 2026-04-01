# ResumeForge AI — Complete Setup & Deployment Guide

## What You Have

A full-stack AI-powered resume optimization web app built with:
- **Next.js 15** (React, TypeScript)
- **Tailwind CSS** for styling
- **Claude AI** (Anthropic) for deep semantic optimization
- **Vercel-ready** deployment config

---

## STEP 1: Get Your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up / log in
3. Click **"API Keys"** in the left sidebar
4. Click **"Create Key"** → copy your key (starts with `sk-ant-...`)
5. Keep it safe — you'll need it in Step 3

**Cost:** Claude API is pay-per-use. ~1,000 resume optimizations ≈ $5–15 depending on usage.

---

## STEP 2: Deploy to Vercel (Free — Takes 5 Minutes)

### Option A: Deploy via GitHub (Recommended)

1. **Create a GitHub account** at https://github.com if you don't have one
2. **Create a new repository:**
   - Go to https://github.com/new
   - Name it `resumeforge-ai`
   - Set to **Public** or Private
   - Click **Create repository**

3. **Upload your code:**
   - Download the ZIP file of this project
   - Extract it on your computer
   - In your repository page, click **"uploading an existing file"**
   - Drag all files in and commit

   *Or use Git commands (if you have Git installed):*
   ```bash
   cd resumeforge-ai
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/resumeforge-ai.git
   git push -u origin main
   ```

4. **Deploy to Vercel:**
   - Go to **https://vercel.com** → Sign up with GitHub
   - Click **"Add New Project"**
   - Select your `resumeforge-ai` repository
   - Click **"Deploy"** — Vercel auto-detects Next.js

5. **Add your API Key to Vercel:**
   - In your Vercel project dashboard → **Settings → Environment Variables**
   - Add: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
   - Click **Save**
   - Go to **Deployments** → click the 3 dots → **Redeploy**

6. **Your app is live!** Vercel gives you a URL like `https://resumeforge-ai.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
# Follow prompts — it detects Next.js automatically
vercel env add ANTHROPIC_API_KEY
# Paste your API key when prompted
vercel --prod
```

---

## STEP 3: Run Locally (for testing)

```bash
# 1. Install Node.js from https://nodejs.org (LTS version)

# 2. Extract the project zip, open terminal in that folder

# 3. Install dependencies
npm install

# 4. Add your API key
# Edit .env.local file:
# ANTHROPIC_API_KEY=sk-ant-your-actual-key-here

# 5. Start development server
npm run dev

# 6. Open http://localhost:3000 in your browser
```

---

## STEP 4: Connect a Custom Domain

### On Vercel:
1. In your Vercel project → **Settings → Domains**
2. Type your domain (e.g., `resumeforgeai.com`) → **Add**
3. Vercel gives you DNS records to add

### Buy a Domain:
- **Namecheap:** https://namecheap.com (cheapest, ~$10/year)
- **Cloudflare:** https://cloudflare.com/products/registrar (at-cost pricing)
- **GoDaddy:** https://godaddy.com

### Point domain to Vercel:
After buying, go to your domain registrar's DNS settings:
- Add an **A record**: `@` → `76.76.21.21`
- Add a **CNAME**: `www` → `cname.vercel-dns.com`

Wait 10–60 minutes for DNS to propagate. Your site will be live at your custom domain.

---

## STEP 5: Add Google AdSense (Monetization)

### Get Approved:
1. Go to **https://adsense.google.com**
2. Sign up with your Google account
3. Add your website URL
4. Google reviews your site (takes 1–14 days)
5. You need some existing content — the app itself counts

### Add AdSense Code:

Once approved, Google gives you a **Publisher ID** like `ca-pub-1234567890123456` and **Ad Slot IDs**.

**In `app/layout.tsx`** — uncomment and replace:
```tsx
<script 
  async 
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" 
  crossOrigin="anonymous"
/>
```

**In `app/page.tsx`** — replace the placeholder `<div>` blocks with real AdSense tags:
```tsx
<ins
  className="adsbygoogle"
  style={{ display: "block" }}
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

**Ad placements already set up in the code:**
- `app/page.tsx` line ~88: Leaderboard banner (728×90) above optimizer
- `app/page.tsx` line ~137: Banner above results
- `app/page.tsx` line ~148: Rectangle (300×250) below results

### Vercel Environment Variable for AdSense:
```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

---

## STEP 6: Auto-Deploy on Every Code Change

With GitHub + Vercel connected:
- Push any change to your GitHub repo
- Vercel automatically rebuilds and deploys in ~60 seconds
- Zero downtime deployments

---

## Project Structure

```
resumeforge-ai/
├── app/
│   ├── api/
│   │   └── optimize/
│   │       └── route.ts      ← AI optimization API endpoint
│   ├── globals.css            ← Global styles
│   ├── layout.tsx             ← Root layout + metadata + AdSense
│   └── page.tsx               ← Main page + app state management
├── components/
│   ├── Header.tsx             ← Navigation bar
│   ├── Hero.tsx               ← Landing hero section
│   ├── OptimizerForm.tsx      ← Upload + job description form
│   ├── ProcessingView.tsx     ← Loading animation during AI processing
│   ├── ResultsView.tsx        ← Score cards + keywords + optimized content
│   ├── FeaturesSection.tsx    ← How it works + features grid
│   └── Footer.tsx             ← Footer with links
├── lib/
│   └── optimizer.ts           ← Core Claude AI logic
├── types/
│   └── index.ts               ← TypeScript types
├── .env.local                 ← Local API key (never commit this)
├── .env.example               ← Safe template to share
├── next.config.ts             ← Next.js configuration
├── vercel.json                ← Vercel deployment config
└── package.json               ← Dependencies
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ Yes | Your Claude API key from console.anthropic.com |
| `NEXT_PUBLIC_APP_URL` | Optional | Your production URL |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Optional | Your AdSense publisher ID |

---

## Customization Guide

### Change the app name/branding:
- `app/layout.tsx` → update `metadata.title` and `metadata.description`
- `components/Header.tsx` → update logo name
- `components/Footer.tsx` → update brand name

### Change colors:
- `app/globals.css` → edit CSS variables in `:root`
- Main colors: `--navy` (#0f1729), `--gold` (#e8b86d), `--cream` (#faf8f4)

### Adjust AI behavior:
- `lib/optimizer.ts` → edit the `systemPrompt` and `userPrompt`
- Change `model: "claude-opus-4-5"` to `"claude-haiku-4-5-20251001"` for faster/cheaper results

### Add more pages:
- Create `app/blog/page.tsx` for a blog
- Create `app/about/page.tsx` for an about page
- These help with Google AdSense approval

---

## Scaling & Production Tips

1. **Rate limiting:** Add `npm install rate-limiter-flexible` to prevent API abuse
2. **Caching:** Add Redis/Upstash for caching common optimizations
3. **Analytics:** Add Google Analytics 4 or Vercel Analytics (free)
4. **Error monitoring:** Add Sentry for production error tracking
5. **Database:** Add Supabase (free tier) to save optimization history

---

## Troubleshooting

**"API key not found" error:**
→ Make sure `ANTHROPIC_API_KEY` is set in Vercel Environment Variables and redeployed

**"Optimization failed" error:**
→ Check your Anthropic account has billing set up at console.anthropic.com

**Build fails:**
→ Run `npm run build` locally to see the exact error

**Fonts not loading:**
→ The Google Fonts import in `globals.css` requires internet access

**AdSense not showing:**
→ Make sure your domain is approved and you've redeployed after adding the code

---

## Support & Updates

- Anthropic docs: https://docs.anthropic.com
- Next.js docs: https://nextjs.org/docs
- Vercel docs: https://vercel.com/docs
- Tailwind docs: https://tailwindcss.com/docs
