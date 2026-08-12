#!/usr/bin/env python3
"""Push zah-bookstore to GitHub Pages in one step with a timestamped message.
Usage: python3 push_zah.py "what changed"
"""
import sys, subprocess, pathlib, datetime

ROOT = pathlib.Path("/Users/zrlabib/hermes/zah-bookstore")
msg = sys.argv[1] if len(sys.argv) > 1 else f"Update {datetime.date.today().isoformat()}"

r = subprocess.run(["git","-C",str(ROOT),"add","-A"], capture_output=True, text=True)
if r.returncode != 0:
    print("git add failed:", r.stderr); sys.exit(1)
r = subprocess.run(["git","-C",str(ROOT),"commit","-q","-m",msg], capture_output=True, text=True)
if r.returncode != 0:
    print("git commit failed:", r.stderr); sys.exit(1)
r = subprocess.run(["git","-C",str(ROOT),"push","origin","main"], capture_output=True, text=True)
if r.returncode != 0:
    print("git push failed:", r.stderr); sys.exit(1)
print("PUSHED:", msg)
print("Live: https://zrlabiblaisyqi-hash.github.io/zah-bookstore/")
