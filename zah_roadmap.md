# Zah Bookstore — Autonomous Roadmap (next 10 + next 100 steps)

Model anchor (locked unless user says): BUY 60% of Qaf (writer discount) · SELL 75% of Qaf · onkir on buyer · 20% margin.
Lead gen is the bottleneck. Content (TikTok/Reels) is free and is the user's native skill.

## NEXT 10 STEPS (now → ~2 weeks)
1. ✅ Correct pricing rule site-wide (75% of Qaf, onkir on buyer).
2. ✅ 12 titles live + 4 bundles (5-book, Tafsir Trio, Surah Duo, Sydney Set).
3. ✅ Business-model viz v2 (buy-60/sell-75, 20% GM).
4. ✅ Reusable tooling: price_update.py · verify_zah.py · push_zah.py.
5. ✅ 90-day content + ops calendar.
6. ⬜ USER: WhatsApp Business setup (number confirm + catalog).
7. ⬜ USER: Shopee/Tokopedia seller account + Biteship for onkir quotes.
8. 🔄 Inventory tracker (stock.csv) + low-stock alert → reorder from Qaf.
9. ⬜ Shopee/Tokopedia bulk-listing CSV generator from data.js.
10. ⬜ First 3 Reels scheduled (Mon/Wed/Fri templates).

## NEXT 100 STEPS (horizon: 0–18 months) — grouped
### A. Inventory & fulfilment (months 0–3)
- Stock sheet per title; reorder-at thresholds; Qaf reorder via writer discount.
- Biteship webhook → auto onkir quote to buyer in WA.
- Packaging kit (bubble wrap, branded sticker, bookmark).
- Cold-chain none; but damage-rate tracking → supplier quality loop.
- Bundle pre-pack stations to cut pick time.
- Inventory value cap (don't tie up cash > 2× avg monthly COGS).
- Dead-stock alert > 90 days → bundle-it or discount.
- Stocktake weekly until steady, then monthly.
- Reorder batcher: group low-stock into one Qaf PO.
- Supplier relationship: ask Qaf for upcoming titles / pre-orders.

### B. Demand & lead gen (months 0–6)
- Daily content (TikTok/Reel) on 3 pillars: paham-dulu, resmi-murah, bundle-hemat.
- Study-group posting (FB/WA) 2–3×/week.
- WA Status daily; broadcast restocks to past buyers.
- After 20 organic sales → tiny paid boost on best Reel (CAC ≤ Rp15k).
- Review collection → screenshot social proof section.
- Collaborate with 1 micro-influencer (Islamic parenting/study).
- Ramadan prep campaign (biggest demand window).
- Landing-page A/B: hero CTA "Lihat 12 Judul" vs "Pesan Paket".
- Upsell logic: cart < 3 books → suggest bundle.
- Referral: buyer gives friend code → both get packaging discount.

### C. Conversion & UX (months 0–4)
- Sticky CTA already live; add "paling laku" badge from real sales.
- Chatbot (fs2/fs3) tuned with real FAQs from WA chats.
- Add "pilih buku buat pemula" quiz → recommended bundle.
- Trust badges: ISBN, garansi, wakaf.
- Speed: lazy-load, image optimize (webp covers).
- Mobile checkout friction audit (WA deep-link works on iOS/Android).
- Abandoned-chat follow-up template (24h).
- Multi-courier COD toggle.
- Bundle page dedicated URL for ads.
- Exit-intent: "chat dulu, gratis konsultasi pilih buku".

### D. Channels & marketplace (months 1–6)
- Shopee + Tokopedia live with synced prices (CSV gen).
- TikTok Shop if eligible (video → buy).
- WhatsApp Catalog linked to site.
- Marketplace repricer (match 75% rule automatically).
- Cross-list bundles as separate SKUs.
- Review seeding on each platform.
- Promo calendar aligned to Islamic dates.
- Bulk order form for pengajian/TPQ.
- Affiliate for komunitas leaders.
- Corporate/wakaf B2B outreach (musala, TPQ).

### E. Finance & scale (months 2–12)
- Monthly P&L from order log; margin watch at 20%.
- Cash-recycle cap; never pre-spend > incoming 30d.
- Founder salary: draw only after 6 mo steady > break-even ×1.5.
- CAC payback < 30 days before scaling ads.
- Reinvest 70% profit to inventory until velocity stable.
- Quarterly price re-anchor if Qaf changes retail.
- Tax: register UMKM (NIB/IZIN) when revenue triggers.
- Buffer fund = 1 month COGS.
- Year-1 target: ~Rp32M cumulative net (model).
- Scenario plan: if margin compresses, shift to higher-ASP bundles.

### F. Product & catalog (months 0–12)
- Add new Qaf titles as they release (price_update.py).
- Themed bundles per season (Ramadan, back-to-school TPQ).
- "Starter library" for new converts/pemula.
- Arabic-learning tie-ins.
- Pre-order for upcoming Qaf titles (cash ahead).
- Limited gift set (buku + bookmark + card).
- Kids' tafsir if Qaf releases.
- Audio/bundle with recitation link.
- Bundle builder (user picks 3–5, auto 75% price).
- Catalog API so other tools read live prices.

### G. System & autonomy (ongoing)
- Nightly verify_zah.py cron → alert on regression.
- Price drift monitor vs Qaf (when scraping allowed later).
- Auto-commit + push on content change.
- Weekly metric digest to user (orders, AOV, low-stock).
- Backup data.js + stock.csv to cloud.
- Docs: runbook for user (how to reorder, post, reply).
- Skill saved: "zah-bookstore-ops" for reusable workflow.
- Alert if site downtime > 5 min.
- A/B test log.
- Quarterly strategy review (autonomous + user sign-off).

## AUTONOMY RULES
- I execute all code/site/finance-model/asset tasks without asking.
- I spin a terminal for anything needing user accounts/logins.
- I never change the 60/75 rule or onkir-on-buyer without explicit user say.
- I verify (verify_zah.py) before every push.
- I report progress in plain language, no jargon.
