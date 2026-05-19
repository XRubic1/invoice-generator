# Invoice Generator

Single-page React app to fill out the empty invoice PDF template and download a completed invoice.

**Live demo:** https://xrubic1.github.io/invoice-generator/

## Features

- Carrier name, invoice #, date, debtor, address, load/PO, amount, and total
- Downloads a filled PDF (template embedded in the app — no separate file download)
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

## Enable GitHub Pages (required once)

1. Open [Settings → Pages](https://github.com/XRubic1/invoice-generator/settings/pages)
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Set **Branch** to `gh-pages` and folder to `/ (root)`
4. Click **Save**
5. Re-run the failed workflow (Actions → Deploy to GitHub Pages → Re-run), or push any commit

The workflow publishes the built app to the `gh-pages` branch. After the first successful run, the site is live at the URL above (may take 1–2 minutes).
