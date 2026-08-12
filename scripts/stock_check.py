#!/usr/bin/env python3
"""Zah Bookstore inventory tracker.
Tracks stock per title; flags low-stock so you can reorder from Qaf (writer discount 60%).
Run: python3 stock_check.py
Edits stock.csv (title, stock, reorder_at). Add a row per title once; update `stock` as you sell.
Cost to reorder = stock_needed × (Qaf_retail × 0.60). Sell = Qaf × 0.75.
"""
import csv, pathlib

ROOT = pathlib.Path("/Users/zrlabib/hermes/zah-bookstore")
CSV = ROOT / "stock.csv"

# Qaf retail anchors (mirror price_update.py)
QAF = {
    "memahami-surah-al-maun": 49000, "ilmu-ikhlas": 55000, "memahami-surah-al-fatihah": 50000,
    "rizqan-wasian-thayyiban": 60000, "tafsir-bacaan-shalat": 54000, "memahami-surah-yasin": 59000,
    "tafsir-al-ashr": 16000, "tafsir-al-alaq": 16000, "tafsir-asmaulhusna": 99000,
    "ramadan-in-sydney": 75000, "cerah-mentari-di-ufuk-sydney": 100000, "tafsir-al-quran-bi-al-quran": 160000,
}
COST = 0.60

# Seed defaults if no CSV yet (reorder_at = 3, start stock = 5 each as example)
def seed():
    rows = []
    for slug, qaf in QAF.items():
        rows.append({"title": slug, "stock": 5, "reorder_at": 3})
    with open(CSV, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["title","stock","reorder_at"])
        w.writeheader(); w.writerows(rows)
    return rows

if not CSV.exists():
    rows = seed()
    print("Created stock.csv with seed data (stock=5, reorder_at=3 each). Edit `stock` as you sell.")
else:
    with open(CSV) as f:
        rows = list(csv.DictReader(f))

low = []
print(f"{'TITLE':35} {'STOCK':>5} {'REORDER_AT':>10}  STATUS")
for r in rows:
    stock = int(r["stock"]); ro = int(r["reorder_at"])
    flag = "LOW ▼ reorder" if stock <= ro else "ok"
    if stock <= ro:
        qaf = QAF.get(r["title"], 0)
        need = max(ro*2 - stock, 1)
        cost = round(qaf*COST*need)
        low.append((r["title"], stock, need, cost, qaf))
        print(f"{r['title']:35} {stock:>5} {ro:>10}  {flag} (need {need}, ~Rp{cost:,} @60% Qaf)")
    else:
        print(f"{r['title']:35} {stock:>5} {ro:>10}  {flag}")

if low:
    total = sum(x[3] for x in low)
    print(f"\n⚠ {len(low)} title(s) low. Total reorder cost ≈ Rp{total:,} (your 60% Qaf price).")
    print("Reorder from Penerbit Qaf with writer discount. Update stock.csv after restock.")
else:
    print("\n✓ All stock healthy.")
