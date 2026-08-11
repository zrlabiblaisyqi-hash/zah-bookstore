/* ===== Tafsir Dashboard — JS ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const STORE = 'zah_tafsir_v1';

/* ---- storage ---- */
function load() { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } }
function save(o) { localStorage.setItem(STORE, JSON.stringify(o)); }
let articles = load();

/* ---- helpers ---- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
function renderArticle(a) {
  if (!a) return '';
  let html = '';
  if (a.intro) html += `<p>${esc(a.intro).replace(/\n/g,'</p><p>')}</p>`;
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
const findSurah = n => SURAHS.find(s => s.n === +n);

/* ---- render list ---- */
let curFilter = 'all', curQ = '';
function renderList() {
  const q = curQ.toLowerCase();
  const qn = q.replace(/[^a-z0-9]/g, '');
  const list = SURAHS.filter(s => {
    const matchQ = !q || s.tr.toLowerCase().includes(q) || s.tr.toLowerCase().replace(/[^a-z0-9]/g, '').includes(qn)
      || s.ar.includes(curQ) || s.id.toLowerCase().includes(q) || String(s.n) === q;
    const matchF = curFilter === 'all' || (curFilter === 'written' ? articles[s.n] : s.type === curFilter);
    return matchQ && matchF;
  });
  const el = $('#slist');
  if (!list.length) { el.innerHTML = `<div class="empty"><div class="big">﷽</div>Belum ada tafsir yang ditulis untuk filter ini.</div>`; return; }
  el.innerHTML = list.map(s => `
    <button class="scard" data-n="${s.n}" aria-label="Buka tafsir ${esc(s.tr)}">
      <span class="snum">${s.n}</span>
      <span class="ar" aria-hidden="true">${s.ar}</span>
      <span class="smeta">
        <span class="tr">${esc(s.tr)}</span>
        <span class="sub"><span>${esc(s.id)}</span>
          <span class="tag ${s.type==='Makkiyah'?'mk':'md'}">${s.type === 'Makkiyah' ? 'Makkiyah' : 'Madaniyah'}</span>
          <span>${s.ayat} ayat</span></span>
      </span>
      <span class="dot ${articles[s.n] ? 'has' : ''}" title="${articles[s.n] ? 'sudah ditulis' : 'belum ditulis'}"></span>
    </button>`).join('');
}

/* ---- reader ---- */
const reader = $('#reader');
function openReader(n) {
  const s = findSurah(n); if (!s) return;
  const a = articles[n];
  $('#rNum').textContent = s.n;
  $('#rTitle').textContent = s.tr;
  $('#rAr').textContent = s.ar;
  $('#rMeta').innerHTML = `<span class="tag ${s.type==='Makkiyah'?'mk':'md'}">${s.type}</span><span>${s.ayat} ayat</span><span>Ke-${s.n} turun</span>`;
  if (a) {
    $('#rBody').innerHTML = `<p style="color:var(--faint);font-size:.82rem;margin-bottom:18px">Ditulis oleh <b style="color:var(--muted)">${esc(a.author || 'Dr. Izza Rohman')}</b>${a.title ? ` · <i>${esc(a.title)}</i>` : ''}</p>` + renderArticle(a);
    $('#rNote').innerHTML = '';
  } else {
    $('#rBody').innerHTML = `<div class="empty"><div class="big">﷽</div>
      <p>Tafsir <b style="color:var(--txt)">${esc(s.tr)}</b> (${esc(s.id)}) belum ditulis.</p>
      <p style="color:var(--faint);font-size:.86rem;max-width:46ch;margin:10px auto 0">Ini adalah kerangka surah. Artikel tafsir akan ditambahkan dari Mode Penulis di masa depan. Surah ke-${s.n} turun, termasuk golongan <b>${s.type}</b>, terdiri dari ${s.ayat} ayat.</p></div>`;
    $('#rNote').innerHTML = `<b>Catatan:</b> Konten tafsir belum tersedia — sesuai rencana, ditulis secara bertahap oleh penulis.`;
  }
  reader.classList.add('open');
  reader.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
function closeReader() { reader.classList.remove('open'); document.body.style.overflow = ''; }

/* ---- events: list clicks ---- */
$('#slist').addEventListener('click', e => { const c = e.target.closest('.scard'); if (c) openReader(c.dataset.n); });
$('#rClose').addEventListener('click', closeReader);
reader.addEventListener('click', e => { if (e.target === reader) closeReader(); });

/* ---- search & filter ---- */
$('#search').addEventListener('input', e => { curQ = e.target.value; renderList(); });
document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.seg button').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); curFilter = b.dataset.f; renderList();
}));

/* ---- author mode ---- */
let author = false;
function setAuthor(on) {
  author = on; document.body.classList.toggle('author', on);
  $('#toggleAuthor').textContent = on ? 'Keluar Mode Penulis' : 'Mode Penulis';
  $('#footAuthor').textContent = on ? 'Keluar Mode Penulis' : 'Mode Penulis';
  if (on) renderDash();
}
$('#toggleAuthor').addEventListener('click', () => setAuthor(!author));
$('#footAuthor').addEventListener('click', e => { e.preventDefault(); document.querySelector('#top').scrollIntoView(); setAuthor(!author); });

/* ---- dashboard grid ---- */
function renderDash() {
  $('#hasCount').textContent = Object.keys(articles).length;
  const q = ($('#dashSearch').value || '').toLowerCase();
  const list = SURAHS.filter(s => !q || s.tr.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || String(s.n) === q);
  $('#dgrid').innerHTML = list.map(s => `
    <div class="dcell">
      <span class="dn">${s.n}</span>
      <span class="dt"><b>${esc(s.tr)}</b><span>${articles[s.n] ? '✓ ' + (articles[s.n].title || 'tafsir') : 'belum ditulis'}</span></span>
      <button class="ded" data-n="${s.n}">${articles[s.n] ? 'Edit' : 'Tulis'}</button>
    </div>`).join('');
}
$('#dashSearch').addEventListener('input', renderDash);
$('#dgrid').addEventListener('click', e => { const b = e.target.closest('.ded'); if (b) openEditor(b.dataset.n); });

/* ---- editor ---- */
const emask = $('#emask');
function fillSurahSelect(sel) {
  $('#eSurah').innerHTML = SURAHS.map(s => `<option value="${s.n}" ${String(s.n) === String(sel) ? 'selected' : ''}>${s.n}. ${esc(s.tr)} — ${esc(s.id)}</option>`).join('');
}
function openEditor(n) {
  const s = findSurah(n);
  const a = articles[n] || {};
  fillSurahSelect(n);
  $('#eTitle').textContent = a.title ? 'Edit Tafsir' : 'Tulis Tafsir';
  $('#eSub').textContent = `Surah ${s.n}. ${s.tr} (${s.id}) · ${s.type} · ${s.ayat} ayat`;
  $('#eTitleIn').value = a.title || '';
  $('#eAuthor').value = a.author || 'Dr. Izza Rohman';
  $('#eIntro').value = a.intro || '';
  $('#eBody').value = a.body || '';
  $('#eSaved').classList.remove('show');
  emask.classList.add('open');
  $('#eTitleIn').focus();
}
$('#newBtn').addEventListener('click', () => openEditor(1));
$('#eCancel').addEventListener('click', () => emask.classList.remove('open'));
emask.addEventListener('click', e => { if (e.target === emask) emask.classList.remove('open'); });
$('#eForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = +$('#eSurah').value;
  const title = $('#eTitleIn').value.trim();
  const authorName = $('#eAuthor').value.trim();
  const intro = $('#eIntro').value.trim();
  const body = $('#eBody').value.trim();
  if (!title && !intro && !body) { emask.classList.remove('open'); return; }
  articles[n] = { title, author: authorName, intro, body, saved: Date.now() };
  save(articles);
  emask.classList.remove('open');
  $('#eSaved').classList.add('show');
  renderList(); renderDash();
});

/* ---- export ---- */
$('#exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(articles, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'zah-tafsir.json'; a.click();
  URL.revokeObjectURL(a.href);
});

/* ---- esc to close ---- */
addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (emask.classList.contains('open')) emask.classList.remove('open'); else if (reader.classList.contains('open')) closeReader(); }
});

/* ---- init ---- */
const totalAyat = SURAHS.reduce((a, s) => a + s.ayat, 0);
$('#ayatCount').textContent = totalAyat.toLocaleString('id-ID');
$('#hasCount').textContent = Object.keys(articles).length;
renderList();
})();
