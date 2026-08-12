# Zah Bookstore — 90-Day Lead-Gen & Ops Calendar

Model: BUY 60% of Qaf · SELL 75% of Qaf · buyer pays onkir · 20% margin.
Lead gen is the bottleneck. Content is FREE. You are a designer/videographer — this is your edge.

## Weekly content rhythm (repeat every week)
| Day | Platform | Format | Hook | CTA |
|---|---|---|---|---|
| Mon | TikTok + Reel | 15–25s book flip | "Buku tafsir murah resmi Qaf — bedanya?" | "Link di bio / WA" |
| Tue | WhatsApp Status | Photo of 1 book + price | "Edisi hari ini: ___ Rp___" | "Chat WA" |
| Wed | TikTok + Reel | Read-along 1 ayat + meaning | "Paham dulu, baru khusyuk" | "Koleksi lengkap di WA" |
| Thu | Study-group post (FB/WA groups) | Bundle showcase | "Paket 5 buku hemat Rp182k" | "DM / WA" |
| Fri | TikTok + Reel | Unboxing/packing | "Dikirim hari sama + bubble wrap" | "Order via WA" |
| Sat | Carousel (IG/TikTok) | 12 judul grid | "Pilih yang dekat sama kamu" | "WA" |
| Sun | WhatsApp broadcast (existing buyers) | Restock / new title | "Stok baru: ___" | "Balas WA" |

## 3 content pillars (rotate)
1. **Paham dulu, baru khusyuk** — short tafsir nuggets (your video skill)
2. **Resmi & murah** — "cetakan Qaf asli, 25% lebih murah" trust builder
3. **Bundles = hemat** — push AOV, one courier pickup

## First 14 days (setup — do in parallel with content)
- [ ] WhatsApp Business: catalog, bio "Buku Dr. Izza Rohman resmi Qaf · 25% lebih murah · onkir pembeli"
- [ ] Shopee + Tokopedia shop draft (use price_update.py outputs as price list)
- [ ] Biteship/Siapkirim account for courier quotes → pass to buyer
- [ ] 3 short Reels scheduled (Mon/Wed/Fri template)
- [ ] Join 5 study groups (tafsir, TPQ guru, mahasiswa)

## 15–60 days (scale organic)
- [ ] Daily post; track which hook gets saves/shares
- [ ] After 20 organic sales → tiny paid boost on best Reel (CAC ≤ Rp15k)
- [ ] Collect 5 reviews → screenshot to social proof section

## 61–90 days (compound)
- [ ] Scale ads; push AOV > Rp100k via bundles
- [ ] WA broadcast restocks; referral "beli 2 dapat diskon kemasan"
- [ ] Qaf reorder using writer discount as stock runs low

## Metrics to watch (weekly)
- Orders/week · AOV · CAC (if ads) · WA response time (<24h) · Restock frequency
- Break-even = 34 bundled orders/month.

## Automation notes
- `price_update.py` — re-apply 60/75 rule when Qaf changes price.
- `verify_zah.py` — confirm site renders + prices correct before any push.
- `push_zah.py "msg"` — ship to GitHub Pages in one command.
- Run order: edit data.js → `python3 price_update.py` → `python3 verify_zah.py` → `python3 push_zah.py "msg"`.
