/* ===== FlowState-style JS — part 1: ticker, progress, shelf, kinetic, peel ===== */
(() => {
'use strict';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rupiah = n => 'Rp' + n.toLocaleString('id-ID');
const WA = '6282395440020';
const waLink = m => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
window.__ZAH = { rupiah, waLink, RM, $, $$ };

/* --- ticker --- */
const tk = $('#tk');
if (tk) {
  const items = ['GRATIS ONGKIR MIN. 2 BUKU SE-JAWA', '6 JUDUL RESMI DR. IZZA ROHMAN',
    'PAKET 5 BUKU HEMAT RP53.100', 'BALAS <24 JAM', 'COD & TRANSFER', 'GARANSI GANTI BARU'];
  tk.innerHTML = [...items, ...items].map(t => `<span>✦ ${t}</span>`).join('');
}

/* --- scroll-continues cue + section rail --- */
const cue = $('#morecue');
const railnav = $('#railnav');
const labels = [
  ['#top', 'Hero'], ['#katalog', 'Katalog'], ['#beli', 'Beli'],
  ['#cara-pesan', 'Cara Pesan'], ['#penulis', 'Penulis'], ['#ulasan', 'Ulasan'], ['#faq', 'FAQ']
];
if (railnav) railnav.innerHTML = labels
  .filter(([id]) => document.querySelector(id))
  .map(([id, t]) => `<a href="${id}" data-to="${id}"><span>${t}</span></a>`).join('');

function onScrollCue() {
  const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 120;
  const pastHero = scrollY > innerHeight * 0.8;
  cue.classList.toggle('on', pastHero && !atBottom);
  if (railnav) [...railnav.children].forEach(a => {
    const el = document.querySelector(a.dataset.to);
    a.classList.toggle('act', el && el.getBoundingClientRect().top <= innerHeight * 0.4
      && el.getBoundingClientRect().bottom >= innerHeight * 0.4);
  });
}
addEventListener('scroll', onScrollCue, { passive: true });
addEventListener('resize', onScrollCue);
onScrollCue();

/* --- scroll progress --- */
const prog = $('#prog');
addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (scrollY / h * 100) + '%';
}, { passive: true });

/* --- moving shelf (kept from v1, now 2 rails) --- */
function buildShelf(el, list) {
  el.innerHTML = [...list, ...list].map(b =>
    `<div class="sb" data-open="${BOOKS.indexOf(b)}" title="${b.title}">
       <img src="${b.cover}" alt="Sampul ${b.title}" loading="lazy" width="176" height="243">
       <div class="pill">${rupiah(b.price)}</div>
     </div>`).join('');
}
if ($('#rail1')) buildShelf($('#rail1'), BOOKS);
if ($('#rail2')) buildShelf($('#rail2'), [...BOOKS].reverse());

/* --- kinetic word reveal --- */
$$('.kwords').forEach(box => {
  const words = box.dataset.words.split(' ');
  box.innerHTML = words.map(w =>
    w.startsWith('*') ? `<i class="gold">${w.slice(1)}</i>` : `<i>${w}</i>`).join('');
  const items = $$('i', box);
  const onScroll = () => {
    const r = box.getBoundingClientRect();
    const p = 1 - (r.top + r.height * .35) / innerHeight;
    const n = Math.round(Math.max(0, Math.min(1, p * 1.5)) * items.length);
    items.forEach((el, i) => el.classList.toggle('lit', i < n));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
});

/* --- statement lines --- */
const sio = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    $$('p', e.target).forEach((p, i) => setTimeout(() => p.classList.add('in'), i * 170));
    sio.unobserve(e.target);
  }
}), { threshold: .3 });
$$('.stmt').forEach(s => sio.observe(s));

/* --- peel comparison --- */
const peel = $('#peel');
if (peel) {
  const set = x => {
    const r = peel.getBoundingClientRect();
    const p = Math.max(4, Math.min(96, (x - r.left) / r.width * 100));
    peel.style.setProperty('--split', p + '%');
  };
  peel.addEventListener('mousemove', e => set(e.clientX));
  peel.addEventListener('touchmove', e => set(e.touches[0].clientX), { passive: true });
  peel.addEventListener('mouseleave', () => peel.style.setProperty('--split', '50%'));
}
})();
