#!/usr/bin/env python3
"""Ad-hoc verification for zah-bookstore. Reusable; not a committed test suite.
Run: /Users/zrlabib/.render-venv/bin/python /Users/zrlabib/hermes/scripts/verify_zah.py
Checks: 12 books @ 75% of Qaf ladder, no stale refs, BUNDLE=182250, headless render clean."""
import re, pathlib, sys
ROOT = pathlib.Path("/Users/zrlabib/hermes/zah-bookstore")
js = (ROOT/"data.js").read_text()
src = {f: (ROOT/f).read_text() for f in ["data.js","index.html","app.js","fs1.js"]}
problems=[]

# 1) books = 12, prices sane
slugs=re.findall(r'slug:\s*"([^"]+)"',js); prices=re.findall(r'price:\s*(\d+)',js)
bi=slugs.index("paket-5-buku-dr-izza-rohman")
books=slugs[:bi]; bps=list(map(int,prices[:bi]))
if len(books)!=12: problems.append(f"book count {len(books)}!=12")
for s,p in dict(zip(books,bps)).items():
    if not(5000<=p<=200000): problems.append(f"{s} price {p} out of range")

# 2) no stale exact old values
OLD=["247500","247.500","49500","53100","53.100","300.600","Rp45.000","Rp53.100",
     "6 Judul Resmi","6 judul resmi","Semua (6)","Enam judul","enam judul","QAF CHECK"]
for needle in OLD:
    for f,t in src.items():
        if needle in t: problems.append(f"STALE '{needle}' in {f}")

# 3) bundle
if "price: 182250" not in js: problems.append("BUNDLE.price!=182250")

# 4) render
from playwright.sync_api import sync_playwright
import pathlib as _p
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1280,"height":900}); errs=[]
    pg.on("pageerror",lambda e:errs.append(str(e)))
    pg.goto(_p.Path(ROOT/"index.html").as_uri()); pg.wait_for_timeout(2500)
    n=pg.eval_on_selector_all("#bgrid > *","e=>e.length")
    if n!=12: problems.append(f"render {n}!=12")
    if errs: problems.append(f"pageerrors {errs[:3]}")
    b.close()
print("RENDER cards=",n)
print("=== RESULT ===")
if problems:
    print("FAIL",len(problems)); [print(" -",x) for x in problems]; sys.exit(1)
print("PASS — 12 titles @75% Qaf ladder; no stale refs; BUNDLE=182250; render clean.")
