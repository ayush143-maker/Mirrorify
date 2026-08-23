<div align="center">

<!-- ═══════════ ANIMATED HEADER ═══════════ -->
<svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg" width="900">
  <defs>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E8B84B"/>
      <stop offset="1" stop-color="#D6A23A"/>
    </linearGradient>
    <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#E8B84B" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#E8B84B" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#E8B84B" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="frame"><rect width="900" height="320" rx="24"/></clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="900" height="320" fill="#080F1C"/>
    <rect width="900" height="6" fill="#D6A23A"/>

    <!-- twinkling stars -->
    <circle cx="120" cy="60" r="2" fill="#E8B84B"><animate attributeName="opacity" values="0.15;0.9;0.15" dur="2.6s" repeatCount="indefinite"/></circle>
    <circle cx="560" cy="40" r="1.6" fill="#F8F4EA"><animate attributeName="opacity" values="0.1;0.8;0.1" dur="3.2s" begin="0.6s" repeatCount="indefinite"/></circle>
    <circle cx="480" cy="270" r="2" fill="#E8B84B"><animate attributeName="opacity" values="0.15;0.85;0.15" dur="2.2s" begin="1.1s" repeatCount="indefinite"/></circle>
    <circle cx="840" cy="290" r="1.6" fill="#F8F4EA"><animate attributeName="opacity" values="0.1;0.7;0.1" dur="2.9s" begin="0.3s" repeatCount="indefinite"/></circle>
    <circle cx="300" cy="290" r="1.6" fill="#E8B84B"><animate attributeName="opacity" values="0.15;0.8;0.15" dur="3.5s" begin="1.6s" repeatCount="indefinite"/></circle>

    <!-- gold shimmer sweep -->
    <rect x="-300" y="0" width="300" height="320" fill="url(#shimmer)">
      <animate attributeName="x" values="-300;950" dur="4.5s" repeatCount="indefinite"/>
    </rect>

    <!-- logo: gold ID card with git branch -->
    <g transform="translate(70,110)">
      <rect width="120" height="104" rx="20" fill="url(#goldGrad)"/>
      <circle cx="40" cy="34" r="9" fill="#080F1C">
        <animate attributeName="r" values="9;10.5;9" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="40" cy="72" r="9" fill="#080F1C"/>
      <circle cx="80" cy="34" r="9" fill="#080F1C"/>
      <path d="M40 44v18M80 44c0 18-22 14-31 24" stroke="#080F1C" stroke-width="7" stroke-linecap="round" fill="none"/>
    </g>

    <!-- title -->
    <text x="230" y="168" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="bold" fill="#F8F4EA">GitDarpan</text>
    <text x="234" y="204" font-family="Verdana, sans-serif" font-size="15" letter-spacing="6" fill="#85858A">YOUR GITHUB, REFLECTED</text>

    <!-- mini report card with stamp animation -->
    <g transform="translate(620,70)">
      <rect width="210" height="180" rx="14" fill="#F8F4EA"/>
      <rect width="210" height="5" fill="#D6A23A"/>
      <text x="16" y="32" font-family="Verdana, sans-serif" font-size="10" letter-spacing="2" font-weight="bold" fill="#D6A23A">REPORT CARD</text>

      <g font-family="Verdana, sans-serif" font-size="12" fill="#101722">
        <text x="16" y="62">Experience</text>
        <text x="16" y="88">Popularity</text>
        <text x="16" y="114">Consistency</text>
      </g>
      <g stroke="#101722" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="1 5">
        <line x1="100" y1="58" x2="140" y2="58"/>
        <line x1="92" y1="84" x2="140" y2="84"/>
        <line x1="104" y1="110" x2="140" y2="110"/>
      </g>
      <g font-family="Verdana, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">
        <rect x="150" y="49" width="40" height="18" rx="4" fill="#24785F"/>
        <text x="170" y="62" fill="#F8F4EA">A+</text>
        <rect x="150" y="75" width="40" height="18" rx="4" fill="#24785F"/>
        <text x="170" y="88" fill="#F8F4EA">S</text>
        <rect x="150.5" y="101.5" width="39" height="17" rx="4" fill="none" stroke="#24785F" stroke-width="2"/>
        <text x="170" y="114" fill="#24785F">A</text>
      </g>

      <!-- the stamp: slams in every 5s -->
      <g transform="translate(105,148)">
        <g opacity="0">
          <animate attributeName="opacity" values="0;1;1;1" keyTimes="0;0.08;0.85;1" dur="5s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="scale" values="1.9;0.92;1;1" keyTimes="0;0.1;0.16;1" dur="5s" repeatCount="indefinite"/>
          <g transform="rotate(-10)">
            <rect x="-36" y="-19" width="72" height="38" rx="6" fill="none" stroke="#24785F" stroke-width="3"/>
            <rect x="-30" y="-14" width="60" height="28" rx="4" fill="none" stroke="#24785F" stroke-width="1.5"/>
            <text x="0" y="7" text-anchor="middle" font-family="Georgia, serif" font-size="19" font-weight="bold" fill="#24785F">A+</text>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>

<br/>

**Type a GitHub username. Get a beautiful report card.**
Stars · Forks · Followers · Streaks · Languages · Grades — **no login, no API keys.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_GitDarpan-D6A23A?style=for-the-badge&labelColor=080F1C)](https://YOUR-VERCEL-URL.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-080F1C?style=for-the-badge&logo=next.js&logoColor=F8F4EA)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## 🎓 The Idea

In a world of dashboards and graphs, **GitDarpan** does something nostalgic — it turns your GitHub profile into a **vintage academic report card**. A warm cream marksheet on deep navy, graded in forest-green ink, stamped like a real record.

> *"Modern developer product + premium vintage academic record."*

## ✨ Features

| | |
|---|---|
| 🪪 **One-tap report card** | Type any username → instant marksheet |
| 🟩 **Real grades (C → S)** | Experience, Community, Popularity, Consistency, Versatility |
| 🔥 **Activity streak** | Computed from public GitHub events — no auth needed |
| 🎨 **Language breakdown** | Star-weighted bars with authentic language colors |
| ⭐ **Starred repos** | Your top repositories, front and center |
| 🖼️ **Download as PNG** | Share your marksheet anywhere, one tap |
| 🔑 **100% keyless** | GitHub's public REST API, zero config |
| 📱 **Mobile-first** | Editorial typography, zero overflow |

## 🧾 How Grading Works

Every subject is scored `C → B → B+ → A → A+ → S`:

| Subject | Measured by | Thresholds (B → S) |
|---|---|---|
| 📅 Experience | Years on GitHub | 1 · 2 · 4 · 6 yrs |
| 🤝 Community | Followers | 25 · 100 · 400 · 1500 |
| ⭐ Popularity | Total stars | 30 · 150 · 750 · 3000 |
| 🔥 Consistency | Day streak (90-day events) | 3 · 7 · 14 · 30 |
| 🧰 Versatility | Languages used | 2 · 3 · 4 · 6 |

Overall grade = rounded average. Then the **stamp slams down**. 🟢

## 🎨 Design System

`Navy #080F1C` · `Navy Soft #151F35` · `Cream #F8F4EA` · `Gold #D6A23A` · `Gold Bright #E8B84B` · `Graphite #101722` · `Smoke #85858A` · `Forest #24785F`

- **Type:** Fraunces (display serif) + Space Grotesk (body)
- **Feel:** premium · editorial · nostalgic · developer-focused

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/gitdarpan.git
cd gitdarpan
npm install
npm run dev
```

Open `http://localhost:3000` — that's it. **No `.env`, no keys, no signup.**

### Deploy to Vercel

1. Push this repo to GitHub
2. Import it on [vercel.com](https://vercel.com)
3. Deploy. Done. ☁️

## 📂 Project Structure
## 🔐 API & Rate Limits

GitDarpan uses GitHub's **public REST API** (keyless, ~60 req/hr per IP).
One report ≈ 3–5 requests. If you hit the limit, wait a minute — the card will be waiting.

## 🤝 Contributing

Fork it → branch it → ship it. Ideas: OG-image sharing, compare-two-users mode, PDF export, more grading curves.

## 📄 License

MIT — free to use, remix, and stamp.

---

<div align="center">

**Made with cream, gold & forest green.**
If GitDarpan made you smile, leave a ⭐ — it counts toward *your* Popularity grade. 😉

</div>
