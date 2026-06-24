# Trading Operations Platform

A single-file, browser-based trading journal and process platform — built around the idea that for a disciplined beginner, *process and record-keeping* matter far more than fancy instruments. It treats trading like an operations discipline: checklists before "go-live," incident reviews after, and continuous improvement on a cycle.

No install. No server. No account. Open the file and it runs.

> **Not financial advice.** This is a record-keeping and discipline tool. It does not give buy/sell recommendations, and trading carries real risk of loss.

---

## Quick start

1. Open `TradingOps.html` in any modern browser (Chrome, Safari, Edge, Firefox), on desktop, tablet, or phone.
2. Go to the **Capital** page and record your starting capital (and any past top-ups) as transactions.
3. Use **Pre-Trade Readiness** before logging a trade, then log it in the **Trade Journal**.
4. Export a backup regularly from **Settings** (this is important — see *Your data* below).

That's it. There is nothing to configure.

## Install it with an icon (optional)

To get an app icon on your desktop or phone home screen, host the `trading-ops-app/` folder on GitHub Pages (free) and use your browser's Install / "Add to Home Screen" option. Step-by-step instructions are in `SETUP-GitHub-and-Devices.md`. The standalone `TradingOps.html` works fine on its own but isn't installable — installation needs the supporting files (manifest, icons, service worker) in that folder.

---

## What's inside

The sidebar is grouped into Operate, Build, Review, and System.

### Operate
- **Dashboard** — equity curve, capital panel, monthly & daily P/L, win rate, profit factor, expectancy (in $ and R), max drawdown, plus a discipline score and a risk-control score.
- **Capital** — a ledger of deposits and withdrawals. Your equity is *net capital + trading P/L*, so top-ups and withdrawals are reflected correctly. Returns are measured against net capital.
- **Pre-Trade Readiness** — an editable checklist gate. The "Log Trade" button stays locked until every item is checked, mirroring a change-management sign-off. The completion snapshot is saved onto the trade.
- **Trade Journal** — full trade capture: date/time, symbol, asset class, direction, strategy, setup grade, entry/stop/target/exit, position size (quantity — shares or contracts), risk amount, commission, gross/net P/L, notes, and a screenshot link. Risk auto-calculates from `|entry − stop| × qty`; gross P/L auto-calculates from the exit. Each trade can link a psychology entry and lessons.
- **Psychology Log** — confidence, stress, energy (1–10), emotional state, whether you followed your rules, and a reflection. Your mental state is a leading indicator of your P/L.

### Build
- **Playbook** — your strategies, each with entry/exit checklists, risk rules, market conditions, a grade, and live performance stats (trades, win rate, net P/L) computed from linked trades.
- **Lessons (RCA)** — root-cause analysis for trading mistakes: Mistake → Root Cause → Resolution → Prevention. Shows which trades each lesson came from.
- **Study Library** — books, videos, articles, notes and research, with reading-progress tracking for books. Also contains the **Operational Checklists** (collapsible, collapsed by default): the daily routine (pre-market sign-off, live observation, post-incident review) and the weekly QA checklist (phase-specific milestones for the 90-day cycle). Ticks persist. The checklists are fully editable — use "Edit" to add, rename or delete items, sections and whole checklists, "+ New checklist" to create your own, and "Restore defaults" to return to the original 90-day playbook.

### Review
- **Case Files** — each trade assembled with its linked mindset and lessons into one incident-review card. Filter to linked-only or all trades.
- **Analytics** — win rate by setup grade, by strategy, by weekday and by hour; average R/R; consecutive win/loss streaks; profit factor; expectancy; and an R-multiple distribution.
- **AI Insights** — Claude reviews your data (trades, psychology, lessons, links) and produces a daily/weekly/monthly review, behaviour analysis, risk warnings, or an improvement plan. Sent only when you click. **No API key required**, and none is stored — a key in browser code would be exposed, so AI runs without one.
- **Quarterly Review** — every 90 days: best trades, worst trades, most common mistake, and an improvement plan.

### System
- **Settings & Backup** — account name, currency, risk-per-trade; plus all export/import and the danger zone.

---

## Exports & backup

From **Settings & Backup**:

- **Export backup (JSON)** — complete, lossless snapshot of everything. Use this to move data between devices or to recover.
- **Import / restore backup** — load a JSON backup. Replaces current data (after confirmation). Dangling links to deleted records are cleaned automatically.
- **Export trades (CSV)** — trades with linked mindset and lesson columns. Good for quick analysis; treat as read-only (Excel can mangle CSVs on re-save).
- **Export workbook (Excel / .xlsx)** — a five-sheet workbook: Summary, Trades (with linkage), Capital, Psychology, Lessons.
- **Performance report (PDF)** — a printable summary via your browser's print-to-PDF.

---

## Your data — read this

- **Stored locally** in your browser only. Nothing is uploaded anywhere.
- **Survives** page refreshes, closing the tab, and restarting your device.
- **Does NOT survive** clearing browser data / "clear site data", private/incognito mode, or switching to a different browser or device.
- Data lives in the browser, **not** in the HTML file — so copying the file to another device does not copy your trades.
- A reminder banner appears once you've logged several trades since your last export.

**Therefore: export a JSON backup regularly** and keep it somewhere safe (iCloud Drive, Google Drive). That file is both your cross-device transfer and your disaster recovery.

---

## Using it across devices (GitHub Pages)

You can host the app once and open it on every device. The data still stays per-device — use export/import to move it. See `SETUP-GitHub-and-Devices.md` for step-by-step instructions. The short version:

1. Create a public GitHub repo.
2. Upload `TradingOps.html` and **rename it to `index.html`**.
3. Settings → Pages → deploy from `main` / root.
4. Open the resulting `https://<you>.github.io/<repo>/` URL on any device; "Add to Home Screen" for an app-like icon.

Hosting over https (which Pages provides) also lets the AI Insights feature work on mobile, where opening a raw local file can block it.

---

## Notes & limitations

- **Position size is quantity** (shares/contracts). For options/futures, contract multipliers are not auto-applied — fold the multiplier into the quantity, or just enter the dollar P/L directly.
- **AI Insights** needs a live connection and works best served over https; opened as a local `file://` some browsers block the request.
- **Sample size:** a few dozen trades is far too small to prove an edge. The journal's real value early on is spotting behavioural patterns, not "proving" profitability.
- **No automatic sync.** True multi-device sync would need a hosted database (a Flask/SQLite backend). The data model is plain JSON, so migrating later is straightforward.

---

## Tech

Plain HTML/CSS/JavaScript in one file. Charts via Chart.js; Excel export via SheetJS; both loaded from CDN. AI via Claude. Dark mode, responsive, keyboard-focus-friendly, respects reduced-motion.

---

*Built as a production-readiness program, not a get-rich tool. Discipline and process beat instrument knowledge.*
