/* ===== Zahiya-style augmentation: floating books on shelf =====
   Renders a trio of floating, clickable book covers beneath the hero.
   Clicking a book opens the existing detail modal, whose 3D viewer
   can already be dragged to spin ("Putar Bukunya"). */
(() => {
  'use strict';
  const row = document.getElementById('floatrow');
  if (!row || !window.BOOKS) return;

  // three signature titles shown floating on the shelf
  const picks = ['ilmu-ikhlas', 'tafsir-bacaan-shalat', 'memahami-surah-yasin'];
  const books = picks
    .map(slug => window.BOOKS.find(b => b.slug === slug))
    .filter(Boolean);

  row.innerHTML = books.map(b => {
    const idx = window.BOOKS.indexOf(b);
    return `<div class="fbook" data-open="${idx}" role="button" tabindex="0"
      aria-label="Putar dan lihat detail buku ${b.title}" title="Putar ${b.title}">
      <span class="spin" aria-hidden="true">↻</span>
      <img src="${b.cover}" alt="Sampul buku ${b.title} karya Dr. Izza Rohman"
        loading="lazy" width="330" height="468">
    </div>`;
  }).join('');

  row.querySelectorAll('.fbook').forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
  });
})();
