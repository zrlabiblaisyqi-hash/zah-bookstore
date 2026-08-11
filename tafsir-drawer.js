/* ===== Tafsir Drawer — in-page, right side, shares store with tafsir.html ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const STORE = 'zah_tafsir_v1';
const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } };
let articles = load();

const drawer = $('#tdrawer'), scrim = $('#scrime'), listEl = $('#tdList'), art = $('#tdArt');
let curFilter = 'all', curQ = '';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const findSurah = n => SURAHS.find(s => s.n === +n);

function renderArticle(a) {
  if (!a) return '';
  let html = '';
  if (a.intro) html += `<p>${esc(a.intro).replace(/\n/g, '</p><p>')}</p>`;
  if (a.body) {
    a.body.split('\n').forEach(line => {
      const t = line.trim();
      if (!t) return;
      if (t.startsWith('## ')) html += `</p><h3>${esc(t.slice(3))}</h3><p>`;
      else if (t.startsWith('> ')) html += `</p><blockquote>${esc(t.slice(2))}</blockquote><p>`;
      else html += esc(t) + ' ';
    });
    html += '</p>';
  }
  return html;
}

function renderList() {
  const q = curQ.toLowerCase();
  const qn = q.replace(/[^a-z0-9]/g, '');
  const list = SURAHS.filter(s => {
    const has = !!articles[s.n];
    const matchF = curFilter === 'all' || (curFilter === 'written' ? has : s.type === curFilter);
    const matchQ = !q || s.tr.toLowerCase().includes(q) || s.tr.toLowerCase().replace(/[^a-z0-9]/g, '').includes(qn)
      || s.ar.includes(curQ) || s.id.toLowerCase().includes(q) || String(s.n) === q;
    return matchF && matchQ;
  });
  if (!list.length) { listEl.innerHTML = `<div style="padding:40px 10px;text-align:center;color:var(--faint)">Tidak ada surah yang cocok.</div>`; return; }
  listEl.innerHTML = list.map(s => {
    const has = !!articles[s.n];
    return `<button class="trow ${has ? '' : 'locked'}" data-n="${s.n}" ${has ? '' : 'tabindex="-1" aria-disabled="true"'}>
      <span class="tn">${s.n}</span>
      <span class="tmeta">
        <span class="tar" aria-hidden="true">${s.ar}</span>
        <span class="tt">${esc(s.tr)}</span>
        <span class="tmean">${esc(s.id)}</span>
        <span class="tinfo">${s.ayat} ayat · Ke-${s.n} turun · ${s.type}</span>
      </span>
      <span class="ttag ${has ? (s.type === 'Makkiyah' ? 'mk' : 'md') : 'belum'}">${has ? s.type : 'Belum'}</span>
    </button>`;
  }).join('');
}

function openArticle(n) {
  const s = findSurah(n); if (!s) return;
  const a = articles[n];
  if (!a) return; // locked: do nothing
  $('#tdArtNum').textContent = s.n;
  $('#tdArtTitle').textContent = s.tr;
  $('#tdArtAr').textContent = s.ar;
  $('#tdArtMeta').innerHTML = `<span class="ttag ${s.type === 'Makkiyah' ? 'mk' : 'md'}">${s.type}</span><span>${s.ayat} ayat</span><span>Ke-${s.n} turun</span>`;
  let body = `<p style="color:var(--faint);font-size:.8rem;margin-bottom:16px">Ditulis oleh <b style="color:var(--muted)">${esc(a.author || 'Dr. Izza Rohman')}</b>${a.title ? ` · <i>${esc(a.title)}</i>` : ''}</p>` + renderArticle(a);
  $('#tdArtBody').innerHTML = body;
  art.classList.add('show');
  art.scrollTop = 0;
}
function closeArticle() { art.classList.remove('show'); }

function openDrawer() {
  articles = load(); renderList();
  drawer.classList.add('open'); scrim.classList.add('on');
  document.body.style.overflow = 'hidden';
  $('#tdSearch').value = ''; curQ = ''; curFilter = 'all';
  document.querySelectorAll('.td-seg button').forEach(b => b.classList.toggle('on', b.dataset.f === 'all'));
  closeArticle();
  setTimeout(() => $('#tdSearch').focus(), 350);
}
function closeDrawer() {
  drawer.classList.remove('open'); scrim.classList.remove('on');
  document.body.style.overflow = '';
  closeArticle();
}

/* events */
$('#tafsirOpen').addEventListener('click', openDrawer);
const openM = $('#tafsirOpenM'); if (openM) openM.addEventListener('click', () => { const mm = $('#mobmenu'); if (mm) mm.classList.remove('open'); openDrawer(); });
$('#tdClose').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
$('#tdBack').addEventListener('click', closeArticle);
listEl.addEventListener('click', e => {
  const r = e.target.closest('.trow');
  if (r && !r.classList.contains('locked')) openArticle(r.dataset.n);
});
$('#tdSearch').addEventListener('input', e => { curQ = e.target.value; renderList(); });
document.querySelectorAll('.td-seg button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.td-seg button').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); curFilter = b.dataset.f; renderList();
}));
addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) {
    if (art.classList.contains('show')) closeArticle(); else closeDrawer();
  }
});
// re-sync if articles change in another tab (e.g. tafsir.html authoring)
addEventListener('storage', e => { if (e.key === STORE) { articles = load(); if (drawer.classList.contains('open')) renderList(); } });
})();
