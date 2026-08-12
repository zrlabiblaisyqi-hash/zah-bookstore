/* ===== FlowState-style JS — part 3: chapters, math table, buy grid ===== */
(() => {
'use strict';
const { rupiah, waLink, $ } = window.__ZAH;
const single = BOOKS.reduce((a, b) => a + b.price, 0);

/* --- collection cards --- */
const chaps = $('#chaps');
if (chaps) chaps.innerHTML = BOOKS.map((b, i) => `
  <article class="chap rv">
    <span class="no">0${i + 1}</span>
    <div class="chapcov"><img src="${b.cover}" alt="Sampul ${b.title}" loading="lazy" width="112" height="155"></div>
    <div>
      <span class="cat">${b.tag}</span>
      <h3>${b.title}</h3>
      <p>${b.forWho}.</p>
      <div class="chips">
        <span>${b.pages} hlm</span><span>${b.dim}</span><span>${b.year}</span>
      </div>
      <div class="chapfoot">
        <span class="p">${rupiah(b.price)}</span>
        <button class="go" data-open="${i}">Lihat detail →</button>
      </div>
    </div>
  </article>`).join('');

/* --- value math table --- */
const mw = $('#mathwrap');
if (mw) {
  mw.innerHTML =
    `<div class="mrow hd"><span>Judul</span><span>Satuan</span><span>Dalam paket</span></div>` +
    BOOKS.map(b => {
      const inBundle = b.title !== 'Memahami Surah Yasin';
      return `<div class="mrow"><span>${b.title}</span><span>${rupiah(b.price)}</span><span>${inBundle ? 'Termasuk ✓' : 'Bonus ✓'}</span></div>`;
    }).join('') +
    `<div class="mrow tot"><span>Total kalau beli satuan</span><span>${rupiah(single)}</span><span>${rupiah(BUNDLES[0].price)}</span></div>`;
}

/* --- buy grid: 3 clear options --- */
const bg = $('#buyGrid');
if (bg) {
  const cheapest = [...BOOKS].sort((a, b) => a.price - b.price)[0];
  const starter = BOOKS.find(b => b.slug === 'tafsir-bacaan-shalat') || BOOKS[0];
  const opts = [
    {
      tag: 'Coba Dulu', name: 'Satu Judul Pilihan', price: cheapest.price,
      note: 'Mulai dari satu buku. Cocok kalau ingin mencoba gaya penulisannya dulu.',
      feats: ['Pilih bebas 1 dari 6 judul', 'Cetakan resmi + ISBN', 'Garansi ganti baru', 'Konsultasi pilih judul gratis'],
      msg: 'Halo Zah Bookstore, saya mau pesan 1 judul buku Dr. Izza Rohman. Mohon dibantu pilihkan ya.',
      hi: false
    },
    {
      tag: 'Paling Dipilih', name: BUNDLES[0].title, price: BUNDLES[0].price, old: single,
      note: 'Lima buku inti plus bonus satu judul. Metodenya jadi utuh dari awal sampai akhir.',
      feats: ['5 buku + 1 bonus (Yasin)', `Hemat ${rupiah(single - BUNDLES[0].price)}`, 'Bungkus rapi + bubble wrap rangkap', 'Prioritas kirim hari yang sama', 'Akses kelas baca bareng'],
      msg: `Halo Zah Bookstore, saya mau pesan ${BUNDLES[0].title} (${rupiah(BUNDLES[0].price)}). Mohon info total + ongkir ya.`,
      hi: true
    },
    {
      tag: 'Komunitas', name: 'Grosir & Wakaf Buku', price: null,
      note: 'Untuk pengajian, DKM, kampus, atau wakaf ke musala dan TPQ. Mulai 10 eksemplar.',
      feats: ['Harga grosir mulai 10 eksemplar', 'Faktur & surat jalan', 'Kartu ucapan wakaf', 'Pengiriman terjadwal'],
      msg: 'Halo Zah Bookstore, saya mau tanya harga grosir/wakaf buku Dr. Izza Rohman untuk komunitas.',
      hi: false
    }
  ];
  bg.innerHTML = opts.map(o => `
    <div class="svc rv" style="${o.hi ? 'border-color:#d4af6188;background:radial-gradient(120% 130% at 50% 0%,#1b1509,#0b0b11 62%)' : ''}">
      <span class="kicker" style="${o.hi ? '' : 'color:var(--faint)'}">${o.tag}</span>
      <h3 style="margin-top:8px">${o.name}</h3>
      <p style="min-height:52px">${o.note}</p>
      <div style="display:flex;align-items:baseline;gap:9px;margin:16px 0 4px">
        <span class="price" style="font-size:1.9rem">${o.price ? rupiah(o.price) : 'Hubungi kami'}</span>
        ${o.old ? `<span class="oldp">${rupiah(o.old)}</span>` : ''}
      </div>
      ${o.price === cheapest.price ? '<small style="color:var(--faint)">harga terendah di katalog</small>' : ''}
      <ul style="list-style:none;padding:0;margin:18px 0;color:var(--muted);font-size:.86rem">
        ${o.feats.map(f => `<li style="padding:7px 0;border-top:1px solid var(--border)">✓ ${f}</li>`).join('')}
      </ul>
      <a class="btn ${o.hi ? 'btn-gold' : 'btn-ghost'}" style="width:100%" href="${waLink(o.msg)}" target="_blank" rel="noopener">
        ${o.hi ? '<span class="sheen"></span>' : ''}${o.price ? 'Pesan via WhatsApp' : 'Tanya Harga Grosir'}
      </a>
    </div>`).join('');
}

/* --- deliverables --- */
const dv = $('#deliv');
if (dv) dv.innerHTML = [
  ['Cetakan resmi Penerbit Qaf + ISBN terverifikasi', 'wajib'],
  ['Konsultasi pilih judul lewat WhatsApp', 'gratis'],
  ['Bubble wrap rangkap + kardus tebal', 'gratis'],
  ['Resi dikirim di hari yang sama', 'gratis'],
  ['Garansi ganti baru bila rusak saat kirim', 'gratis'],
  ['Kartu ucapan tulis tangan (opsional hadiah)', 'gratis'],
  ['Kelas baca bareng daring bulanan untuk pembeli', 'gratis']
].map(([t, v]) => `<li>${t}<b>${v}</b></li>`).join('');

/* re-observe newly injected reveal elements */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
})();
