/* ================= Zah Bookstore — interactions ================= */
(() => {
'use strict';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rupiah = n => 'Rp' + n.toLocaleString('id-ID');
const lerp = (a, b, t) => a + (b - a) * t;

const WA = '6282395440020'; // demo — ganti nomor asli sebelum live
const waLink = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/* ---------- hero kinetic type ---------- */
$$('.kin > span').forEach((s, i) => {
  if (RM) return;
  s.style.transform = 'translateY(110%)'; s.style.opacity = '0';
  requestAnimationFrame(() => {
    s.style.transition = `transform .9s var(--ease-expo) ${i * .1 + .05}s, opacity .7s ${i * .1 + .05}s`;
    s.style.transform = 'none'; s.style.opacity = '1';
  });
});

/* ---------- AURORA ---------- */
(function aurora() {
  const c = $('#aurora'), x = c.getContext('2d');
  const blobs = [{ h: 43, a: 0, sp: .00020 }, { h: 172, a: 2, sp: -.00015 }, { h: 268, a: 4, sp: .00012 }];
  const size = () => { c.width = innerWidth; c.height = innerHeight; };
  size(); addEventListener('resize', size);
  function draw(t) {
    x.clearRect(0, 0, c.width, c.height);
    blobs.forEach(b => {
      const cx = c.width * (.5 + Math.cos(t * b.sp + b.a) * .3);
      const cy = c.height * (.42 + Math.sin(t * b.sp * 1.4 + b.a) * .28);
      const r = Math.min(c.width, c.height) * .5;
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `hsla(${b.h},58%,45%,.14)`);
      g.addColorStop(1, 'hsla(0,0%,0%,0)');
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
    });
    if (!RM) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ---------- header / mobile menu ---------- */
addEventListener('scroll', () => $('#hdr').classList.toggle('solid', scrollY > 40), { passive: true });
const mob = $('#mobmenu'), burger = $('#burger');
const setMenu = on => {
  mob.classList.toggle('open', on);
  burger.setAttribute('aria-expanded', on);
  document.body.style.overflow = on ? 'hidden' : '';
  if (on) $('#mobx').focus(); else burger.focus();
};
burger.onclick = () => setMenu(true);
$('#mobx').onclick = () => setMenu(false);
$$('#mobmenu a').forEach(a => a.onclick = () => setMenu(false));

/* ---------- reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
const observeAll = () => $$('.rv:not(.in)').forEach(el => io.observe(el));
observeAll();

/* ---------- marquee ---------- */
const mqItems = ['6 Judul Resmi Dr. Izza Rohman', 'Cetakan Resmi Penerbit Qaf', 'Kirim se-Indonesia', 'Konsultasi Pilih Buku Gratis', 'Garansi Ganti Baru', 'Wakaf Buku untuk TPQ'];
$('#mq').innerHTML = [...mqItems, ...mqItems].map(s => `<span><i>✦</i> ${s}</span>`).join('');

/* ---------- CATALOGUE ---------- */
const grid = $('#bgrid');
function cardHTML(b, i) {
  return `<article class="bcard rv" data-cat="${b.cat}" data-i="${i}">
    <div class="glare" aria-hidden="true"></div>
    <div class="bcover"><span class="btag">${b.tag}</span>
      <img src="${b.cover}" alt="Sampul buku ${b.title} karya Dr. Izza Rohman" loading="lazy" width="330" height="451">
    </div>
    <p class="bfor">${b.forWho}</p>
    <h3>${b.title}</h3>
    <p class="sub">${b.sub}</p>
    <div class="bmeta"><span>${b.pages} halaman</span><span>${b.dim}</span><span>Terbit ${b.year}</span></div>
    <div class="bprice"><span class="price">${rupiah(b.price)}</span></div>
    <div class="bacts">
      <a class="btn btn-wa btn-sm" href="${waLink(`Halo Zah Bookstore, saya mau pesan buku "${b.title}" (${rupiah(b.price)}). Mohon info total + ongkir ya.`)}" target="_blank" rel="noopener">Pesan via WhatsApp</a>
      <button class="btn btn-ghost btn-sm" data-open="${i}">Detail</button>
    </div>
  </article>`;
}
grid.innerHTML = BOOKS.map(cardHTML).join('');
observeAll();

// filters
$$('.filters button').forEach(btn => btn.onclick = () => applyFilter(btn.dataset.filter));
$$('[data-filter]').forEach(b => { if (!b.closest('.filters')) b.onclick = () => applyFilter('all'); });
function applyFilter(f) {
  $$('.filters button').forEach(b => b.setAttribute('aria-pressed', b.dataset.filter === f));
  let shown = 0;
  $$('.bcard').forEach(c => {
    const on = f === 'all' || c.dataset.cat === f;
    c.style.display = on ? '' : 'none';
    if (on) shown++;
  });
  $('#noRes').style.display = shown ? 'none' : 'block';
}

// tilt + glare
$$('.bcard').forEach(card => {
  if (RM || matchMedia('(hover:none)').matches) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    card.style.transform = `perspective(1000px) rotateY(${(px - .5) * 7}deg) rotateX(${(.5 - py) * 7}deg) translateY(-5px)`;
    card.style.setProperty('--mx', px * 100 + '%');
    card.style.setProperty('--my', py * 100 + '%');
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ---------- BUNDLE ---------- */
const single = BOOKS.reduce((a, b) => a + b.price, 0);
$('#bundleBox').innerHTML = `
  <img src="${BUNDLE.cover}" alt="Foto paket 5 buku karya Dr. Izza Rohman" loading="lazy" width="460" height="460">
  <div>
    <span class="kicker">Paling Hemat</span>
    <h2 style="font-size:clamp(1.7rem,3.2vw,2.6rem)">${BUNDLE.title}</h2>
    <ul>${BUNDLE.items.map(i => `<li>${i}</li>`).join('')}</ul>
    <p style="color:var(--gold);font-size:.9rem;margin:0 0 18px">✦ ${BUNDLE.bonus}</p>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;flex-wrap:wrap">
      <span class="price" style="font-size:2.1rem">${rupiah(BUNDLE.price)}</span>
      <span class="oldp">${rupiah(single)}</span>
      <span class="save">Hemat ${rupiah(single - BUNDLE.price)}</span>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn btn-wa" href="${waLink(`Halo Zah Bookstore, saya mau pesan ${BUNDLE.title} (${rupiah(BUNDLE.price)}). Mohon info total + ongkir ya.`)}" target="_blank" rel="noopener">Pesan Paket via WhatsApp</a>
      <a href="#pesan" class="btn btn-ghost">Tanya dulu</a>
    </div>
  </div>`;

/* ---------- footer + form select ---------- */
$('#fcat').innerHTML = BOOKS.map(b => `<li><a href="#katalog">${b.title}</a></li>`).join('');
$('#bk').innerHTML = ['Belum tahu — mohon direkomendasikan', ...BOOKS.map(b => b.title), BUNDLE.title]
  .map(t => `<option>${t}</option>`).join('');
$('#waDirect').href = waLink('Halo Zah Bookstore, saya mau tanya soal buku Dr. Izza Rohman.');

/* ---------- FAQ ---------- */
const FAQ = [
  ['Berapa harga bukunya?', 'Satuan mulai Rp45.000 (Memahami Surah Al-Fatihah &amp; Al-Ma’un) hingga Rp54.000 (Tafsir Bacaan Shalat, Rizqan Wasi’an Thayyiban). Paket 5 buku Rp247.500 sudah termasuk bonus satu judul.'],
  ['Bukunya asli atau cetakan bajakan?', '100% cetakan resmi Penerbit Qaf, lengkap dengan ISBN yang tercantum di setiap halaman detail. Jika kamu menerima buku cacat cetak, kami ganti baru.'],
  ['Kirim ke mana saja dan berapa lama?', 'Ke seluruh Indonesia lewat JNE, J&amp;T, dan SiCepat. Jabodetabek 1–2 hari, Jawa 2–3 hari, luar Jawa 3–6 hari. Instan tersedia untuk Jabodetabek.'],
  ['Bagaimana cara pesannya?', 'Tiga langkah: klik “Pesan via WhatsApp” di buku pilihanmu (atau isi form), kami balas dengan total + ongkir dalam 24 jam, lalu transfer/COD. Resi dikirim hari itu juga. Tidak perlu bikin akun.'],
  ['Cocok untuk pemula yang belum pernah belajar tafsir?', 'Sangat cocok. Bahasanya membumi dan tersusun runtut. Untuk pemula kami biasanya menyarankan Tafsir Bacaan Shalat atau Memahami Surah Al-Fatihah.'],
  ['Ada diskon untuk komunitas atau pengajian?', 'Ada. Mulai 10 eksemplar berlaku harga grosir, lengkap dengan faktur dan surat jalan. Sebutkan jumlahnya saat mengisi form atau chat WhatsApp.']
];
$('#faqBox').innerHTML = FAQ.map(([q, a], i) => `
  <div class="fitem rv">
    <h3><button class="fq" aria-expanded="false" aria-controls="fa${i}" id="fq${i}">${q}<i aria-hidden="true">+</i></button></h3>
    <div class="fa" id="fa${i}" role="region" aria-labelledby="fq${i}"><p>${a}</p></div>
  </div>`).join('');
observeAll();
$$('.fitem').forEach(it => {
  const btn = $('.fq', it), panel = $('.fa', it);
  btn.onclick = () => {
    const wasOpen = it.classList.contains('open');
    $$('.fitem').forEach(o => {
      o.classList.remove('open'); $('.fa', o).style.maxHeight = 0;
      $('.fq', o).setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      it.classList.add('open'); panel.style.maxHeight = panel.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  };
});

/* ---------- DETAIL MODAL ---------- */
const modal = $('#modal'), v3d = $('#v3d');
let rot = -18, vel = 0, lastFocus = null;
function openModal(i) {
  const b = BOOKS[i];
  lastFocus = document.activeElement;
  $('#vimg').src = b.cover; $('#vimg').alt = 'Sampul ' + b.title;
  $('#vbkImg').src = b.cover; $('#vbkImg').alt = 'Sampul ' + b.title;
  $('#mdet').innerHTML = `
    <span class="kicker">${b.tag}</span>
    <h2 id="mtitle" style="font-size:clamp(1.5rem,2.8vw,2.1rem)">${b.title}</h2>
    <p style="color:var(--muted);margin:8px 0 6px">${b.sub}</p>
    <p style="color:var(--teal);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600">${b.forWho}</p>
    <p style="color:#ded9d0;font-size:.94rem;margin-top:14px">${b.blurb}</p>
    <ul class="mspec">
      <li><b>ISBN</b> · ${b.isbn}</li>
      <li><b>Tebal</b> · ${b.pages} halaman, bookpaper, softcover</li>
      <li><b>Dimensi</b> · ${b.dim}</li>
      <li><b>Terbit</b> · ${b.year}</li>
    </ul>
    <p class="price" style="font-size:1.8rem;margin-bottom:14px">${rupiah(b.price)}</p>
    <div class="macts">
      <a class="btn btn-wa" href="${waLink(`Halo Zah Bookstore, saya mau pesan buku "${b.title}" (${rupiah(b.price)}). Mohon info total + ongkir ya.`)}" target="_blank" rel="noopener">Pesan via WhatsApp</a>
      <a href="#pesan" class="btn btn-ghost" id="mcta">Isi form saja</a>
    </div>
    <p style="color:var(--faint);font-size:.74rem;margin-top:16px">Sumber data: <a href="${b.src}" target="_blank" rel="noopener" style="color:var(--gold)">Penerbit Qaf</a></p>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  $('#mx').focus();
  $('#mcta').onclick = closeModal;
}
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open]');
  if (t) openModal(+t.dataset.open);
});
$('#mx').onclick = closeModal;
modal.onclick = e => { if (e.target === modal) closeModal(); };
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (modal.classList.contains('open')) closeModal();
  else if (mob.classList.contains('open')) setMenu(false);
  else if (chat.classList.contains('open')) toggleChat(false);
});
const viewer = $('#viewer');
/* gentle cursor-track: move cursor left/right over the book to spin it — no click/pull.
   The further the cursor is from center, the faster it turns; it eases smoothly (lerp). */
let targetVel = 0;
function trackMove(e) {
  const r = viewer.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  let dx = (e.clientX - cx) / (r.width / 2);     // -1 (far left) .. 1 (far right)
  dx = Math.max(-1, Math.min(1, dx));
  targetVel = dx * 2.4;                           // soft top speed
}
viewer.addEventListener('pointermove', trackMove);
viewer.addEventListener('pointerleave', () => { targetVel = 0; });
(function spinLoop() {
  const modalOpen = modal.classList.contains('open') && !RM;
  // when idle (not hovering) and modal open, keep a slow living drift
  const idle = modalOpen ? .35 : 0;
  vel = lerp(vel, targetVel !== 0 ? targetVel : idle, .06);
  rot += vel;
  v3d.style.transform = `rotateY(${rot}deg) rotateX(-4deg)`;
  requestAnimationFrame(spinLoop);
})();

/* hero 3D book — same gentle cursor-track as the modal viewer (calm idle drift) */
const heroStage = document.querySelector('.stage');
const heroBook = heroStage && heroStage.querySelector('.book3d');
if (heroBook) {
  let hRot = 0, hVel = 0, hTarget = 0;
  heroStage.addEventListener('pointermove', e => {
    const r = heroStage.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    dx = Math.max(-1, Math.min(1, dx));
    hTarget = dx * 2.2;
  });
  heroStage.addEventListener('pointerleave', () => { hTarget = 0; });
  (function heroLoop() {
    const idle = RM ? 0 : .15;            // calm living drift; respects reduced-motion
    hVel = lerp(hVel, hTarget !== 0 ? hTarget : idle, .06);
    hRot += hVel;
    heroBook.style.transform = `rotateY(${hRot}deg)`;
    requestAnimationFrame(heroLoop);
  })();
}

/* ---------- FORM ---------- */
const form = $('#leadForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  let firstBad = null;
  [['nm', v => v.trim().length > 1], ['wa', v => /\d{8,}/.test(v.replace(/\D/g, ''))], ['kt', v => v.trim().length > 1]]
    .forEach(([id, ok]) => {
      const el = $('#' + id), f = el.closest('.field'), good = ok(el.value);
      f.classList.toggle('bad', !good);
      el.setAttribute('aria-invalid', !good);
      if (!good && !firstBad) firstBad = el;
    });
  if (firstBad) { firstBad.focus(); return; }
  $('#ok').classList.add('show');
  $('#ok').scrollIntoView({ block: 'center', behavior: RM ? 'auto' : 'smooth' });
  form.reset();
  setTimeout(() => $('#ok').classList.remove('show'), 10000);
});
$$('#leadForm input').forEach(el => el.addEventListener('input', () => {
  el.closest('.field').classList.remove('bad'); el.removeAttribute('aria-invalid');
}));

/* ================= CHATBOT ================= */
const chat = $('#chat'), cbody = $('#cbody'), quick = $('#quick'), chatBtn = $('#chatBtn');
function toggleChat(on) {
  chat.classList.toggle('open', on);
  chatBtn.setAttribute('aria-expanded', on);
  if (on) { if (!cbody.children.length) boot(); setTimeout(() => $('#cin').focus(), 300); }
}
chatBtn.onclick = () => toggleChat(!chat.classList.contains('open'));
$('#cx').onclick = () => { toggleChat(false); chatBtn.focus(); };

const QUICKS = ['Harga semua buku', 'Rekomendasi untuk saya', 'Ongkir & pengiriman', 'Cara pesan', 'Jam operasional', 'Kontak'];
function renderQuick(list = QUICKS) {
  quick.innerHTML = list.map(q => `<button>${q}</button>`).join('');
  $$('#quick button').forEach(b => b.onclick = () => send(b.textContent));
}
function bubble(html, who = 'bot') {
  const d = document.createElement('div');
  d.className = 'msg ' + who; d.innerHTML = html;
  cbody.appendChild(d); cbody.scrollTop = cbody.scrollHeight;
}
function typing() {
  const d = document.createElement('div');
  d.className = 'typing'; d.innerHTML = '<i></i><i></i><i></i>';
  cbody.appendChild(d); cbody.scrollTop = cbody.scrollHeight; return d;
}
function botSay(html, delay = 650) {
  const t = typing();
  setTimeout(() => { t.remove(); bubble(html); }, RM ? 100 : delay);
}
function boot() {
  botSay('Assalamu’alaikum 👋 Saya <b>Asisten Zah</b>. Saya bisa bantu soal harga, ongkir, cara pesan, sampai memilih buku yang paling pas untukmu.', 450);
  setTimeout(() => { botSay('Mau mulai dari mana?', 450); renderQuick(); }, 800);
}
const PRICE_LIST = () => BOOKS.map(b => `• ${b.title} — <b>${rupiah(b.price)}</b>`).join('<br>');
const waCTA = 'Kalau sudah mantap, <a href="' + waLink('Halo Zah Bookstore, saya mau pesan buku.') + '" target="_blank" rel="noopener">chat WhatsApp di sini</a> atau <a href="#pesan">isi form</a>.';

const RULES = [
  { k: ['harga', 'berapa', 'price', 'katalog', 'biaya', 'tarif', 'semua buku'], a: () => `Daftar harga resminya:<br><br>${PRICE_LIST()}<br>• <b>Paket 5 Buku</b> — <b>${rupiah(BUNDLE.price)}</b> (bonus Memahami Surah Yasin)<br><br>${waCTA}` },
  { k: ['jam', 'buka', 'operasional', 'libur'], a: () => 'Jam operasional: <b>Senin–Sabtu, 08.00–20.00 WIB</b>. Minggu &amp; libur nasional tutup, tapi pesan yang masuk tetap kami balas maksimal 24 jam.' },
  { k: ['kirim', 'ongkir', 'area', 'jangkauan', 'ekspedisi', 'cod', 'luar', 'pengiriman'], a: () => 'Kami kirim ke <b>seluruh Indonesia</b> lewat JNE, J&amp;T, dan SiCepat.<br><br>• Jabodetabek: 1–2 hari (instan tersedia)<br>• Jawa: 2–3 hari<br>• Luar Jawa: 3–6 hari<br><br>Bayar bisa transfer bank atau COD. Sebutkan kotamu lewat <a href="' + '#pesan">form</a> — kami hitungkan ongkirnya.' },
  { k: ['pesan', 'order', 'beli', 'cara', 'booking', 'checkout', 'akun'], a: () => 'Gampang, 3 langkah dan tanpa bikin akun:<br><br><b>1.</b> Klik “Pesan via WhatsApp” di buku pilihanmu, atau <a href="#pesan">isi form</a><br><b>2.</b> Kami balas total + ongkir &lt;24 jam<br><b>3.</b> Transfer atau COD — resi dikirim hari itu juga' },
  { k: ['rekomendasi', 'pemula', 'mulai', 'cocok', 'bingung', 'saran', 'pilih', 'untuk saya'], a: () => 'Pilih yang paling terasa dekat denganmu:<br><br>' + BOOKS.map(b => `• ${b.forWho.replace('Untuk ', '')} → <b>${b.title}</b>`).join('<br>') + '<br><br>Ketik nama bukunya kalau mau detail lengkap.' },
  { k: ['kontak', 'wa', 'whatsapp', 'telepon', 'email', 'hubungi', 'alamat'], a: () => `Hubungi kami:<br><br>☎ WhatsApp <b>0823-9544-0020</b> — <a href="${waLink('Halo Zah Bookstore!')}" target="_blank" rel="noopener">chat langsung</a><br>✉ <b>halo@zahbookstore.id</b><br>⏱ Senin–Sabtu 08.00–20.00 WIB<br><br><small>(kontak demo — diganti data asli saat live)</small>` },
  { k: ['penulis', 'izza', 'siapa', 'profil'], a: () => '<b>Dr. Izza Rohman</b> adalah penulis dan pengkaji tafsir. Karyanya konsisten memakai metode <i>Tafsirul-Qur’an bil-Qur’an</i> — menafsirkan Qur’an dengan Qur’an — dengan bahasa yang tetap membumi. Ada <b>6 judul aktif</b> di katalog kami.' },
  { k: ['asli', 'ori', 'original', 'bajakan', 'garansi', 'rusak'], a: () => 'Semua buku <b>100% cetakan resmi Penerbit Qaf</b>, ISBN tercantum di halaman detail. Kalau rusak saat pengiriman, kami <b>ganti baru</b> — tanpa drama, tanpa sungkan.' },
  { k: ['diskon', 'grosir', 'komunitas', 'banyak', 'pengajian', 'wakaf', 'kampus'], a: () => 'Untuk pengajian, DKM, kampus, atau komunitas: <b>harga grosir mulai 10 eksemplar</b>, lengkap faktur dan surat jalan. Ada juga skema <b>wakaf buku</b> untuk musala &amp; TPQ. Sebutkan jumlahnya di <a href="#pesan">form</a>.' },
  { k: ['paket', 'bundle', 'hemat'], a: () => `<b>${BUNDLE.title}</b> — <b>${rupiah(BUNDLE.price)}</b> (dari ${rupiah(single)}, hemat ${rupiah(single - BUNDLE.price)}).<br>Isi: ${BUNDLE.items.join(', ')}.<br>✦ ${BUNDLE.bonus}<br><br>${waCTA}` },
  { k: ['terima kasih', 'makasih', 'thanks', 'oke', 'sip'], a: () => 'Sama-sama 🙏 Kalau sudah siap, tinggal <a href="#pesan">isi form</a> atau chat WhatsApp — kami balas &lt;24 jam.' },
  { k: ['salam', 'halo', 'hai', 'assalamu', 'pagi', 'siang', 'malam'], a: () => 'Wa’alaikumussalam 👋 Ada yang bisa saya bantu soal buku-buku Dr. Izza Rohman?' }
];
function bookMatch(s) {
  return BOOKS.find(b => {
    const t = b.title.toLowerCase().replace(/['’-]/g, '');
    const q = s.replace(/['’-]/g, '');
    return q.includes(t) || t.split(' ').filter(w => w.length > 4).some(w => q.includes(w));
  });
}
function answer(q) {
  const s = q.toLowerCase();
  const b = bookMatch(s);
  if (b && !/harga semua|katalog|semua buku/.test(s)) {
    return `<b>${b.title}</b> — <i>${b.sub}</i><br><br>${b.blurb}<br><br>📖 ${b.pages} halaman · ${b.dim} · terbit ${b.year}<br>🔖 ISBN ${b.isbn}<br>💰 <b>${rupiah(b.price)}</b><br><br><a href="${waLink(`Halo Zah Bookstore, saya mau pesan buku "${b.title}" (${rupiah(b.price)}).`)}" target="_blank" rel="noopener">Pesan via WhatsApp →</a>`;
  }
  for (const r of RULES) if (r.k.some(k => s.includes(k))) return r.a();
  return 'Maaf, itu di luar yang saya tahu 🙏 Saya bisa bantu soal <b>harga, ongkir, cara pesan, rekomendasi buku, jam operasional,</b> dan <b>kontak</b>. Atau langsung <a href="#pesan">isi form</a> — tim kami balas &lt;24 jam.';
}
function send(text) {
  const q = (text || $('#cin').value).trim();
  if (!q) return;
  bubble(q, 'me'); $('#cin').value = '';
  const t = typing();
  setTimeout(() => {
    t.remove(); bubble(answer(q));
    renderQuick(['Cara pesan', 'Ongkir & pengiriman', 'Rekomendasi untuk saya', 'Paket hemat']);
  }, RM ? 100 : 560 + Math.random() * 380);
}
$('#csend').onclick = () => send();
$('#cin').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

})();
