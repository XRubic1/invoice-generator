# Invoice Generator

Single-page React app to fill out the empty invoice PDF template and download a completed invoice.

**Live demo:** https://xrubic1.github.io/invoice-generator/

## Features

- Carrier name, invoice #, date, debtor, address, load/PO, amount, and total
- Downloads a filled PDF based on `public/EmptyInvoice.pdf`
- Line amount: `$2.250,00` · Total: `$2,250.00`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: invoice generator SPA"
git branch -M main
git remote add origin https://github.com/XRubic1/invoice-generator.git
git push -u origin main
```

Then enable **GitHub Pages** → Source: **GitHub Actions** (Settings → Pages).
