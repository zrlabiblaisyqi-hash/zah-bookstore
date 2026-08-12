#!/usr/bin/env python3
"""Instantly re-apply the Zah pricing rule to data.js from Qaf retail anchors.
Rule (user-confirmed): BUY = 60% of Qaf, SELL = 75% of Qaf, onkir on buyer.
Usage: python3 price_update.py
Reads QAF_RETAIL map (edit as Qaf prices change), rewrites price: in data.js for
matched slugs, leaves unmatched untouched, then prints a diff summary.
Safe: only edits `price:` lines for known slugs; never touches other fields.
"""
import re, pathlib

ROOT = pathlib.Path("/Users/zrlabib/hermes/zah-bookstore")
DATA = ROOT / "data.js"

# Qaf retail anchors (edit these when Qaf changes price; cost/sell auto-derive)
QAF_RETAIL = {
    "memahami-surah-al-maun": 49000,
    "ilmu-ikhlas": 55000,
    "memahami-surah-al-fatihah": 50000,
    "rizqan-wasian-thayyiban": 60000,
    "tafsir-bacaan-shalat": 54000,
    "memahami-surah-yasin": 59000,
    "tafsir-al-ashr": 16000,
    "tafsir-al-alaq": 16000,
    "tafsir-asmaulhusna": 99000,
    "ramadan-in-sydney": 75000,
    "cerah-mentari-di-ufuk-sydney": 100000,
    "tafsir-al-quran-bi-al-quran": 160000,
}
COST = 0.60   # writer discount: you buy at 60% of Qaf
SELL = 0.75   # you sell at 75% of Qaf (25% cheaper)

txt = DATA.read_text()
lines = txt.split("\n")
changed = []
for i, line in enumerate(lines):
    m = re.search(r'slug:\s*"([^"]+)"', line)
    if not m:
        continue
    slug = m.group(1)
    if slug in QAF_RETAIL:
        qaf = QAF_RETAIL[slug]
        new_sell = round(qaf * SELL)
        # find the price: line in the NEXT few lines for this block
        for j in range(i+1, min(i+12, len(lines))):
            pm = re.search(r'price:\s*(\d+)', lines[j])
            if pm:
                old = int(pm.group(1))
                if old != new_sell:
                    lines[j] = re.sub(r'price:\s*\d+', f"price: {new_sell}", lines[j])
                    changed.append((slug, old, new_sell, qaf))
                break

DATA.write_text("\n".join(lines))
print(f"Applied rule: BUY={COST:.0%} / SELL={SELL:.0%} of Qaf. {len(changed)} price(s) updated:")
for slug, old, new, qaf in changed:
    print(f"  {slug}: Rp{old:,} -> Rp{new:,}  (Qaf Rp{qaf:,})")
if not changed:
    print("  (no changes needed — prices already at rule)")
