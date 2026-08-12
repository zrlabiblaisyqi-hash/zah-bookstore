#!/usr/bin/env python3
"""Generate Shopee/Tokopedia-ready listing CSV from data.js.
Run: python3 marketplace_csv.py
Outputs: marketplace_listings.csv (name, price, description, image_path, category)
Mirror the 75% Qaf rule automatically. Edit store name in STORE var.
"""
import re, csv, pathlib

ROOT = pathlib.Path("/Users/zrlabib/hermes/zah-bookstore")
DATA = ROOT / "data.js"
OUT = ROOT / "marketplace_listings.csv"
STORE = "Zah Bookstore"

txt = DATA.read_text()
# grab each book block
blocks = re.findall(r'\{\s*slug: "([^"]+)"(.*?)\n  \}', txt, re.S)
rows = []
for slug, body in blocks:
    if slug.startswith("paket-"):  # skip bundles here; list separately if wanted
        continue
    def get(field):
        m = re.search(rf'{field}:\s*"([^"]*)"', body)
        return m.group(1) if m else ""
    title = get("title"); sub = get("sub"); price = re.search(r'price:\s*(\d+)', body)
    price = int(price.group(1)) if price else 0
    cover = get("cover").replace("img/", "")
    cat = get("cat")
    desc = f"{title}. {sub}. Cetakan resmi Penerbit Qaf — 25% lebih murah dari harga retail. Ongkir ditanggung pembeli. {STORE}."
    rows.append({"Nama Produk": title, "Harga (Rp)": price, "Deskripsi": desc,
                 "Kategori": cat, "Gambar": cover, "Slug": slug})

with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["Nama Produk","Harga (Rp)","Deskripsi","Kategori","Gambar","Slug"])
    w.writeheader(); w.writerows(rows)

print(f"Wrote {len(rows)} listings → {OUT}")
for r in rows[:3]:
    print(f"  {r['Nama Produk']} | Rp{r['Harga (Rp)']:,} | {r['Gambar']}")
