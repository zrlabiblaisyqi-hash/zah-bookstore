/* ===== FlowState-style JS — part 2: fluid wave, countdown, stock, sticky CTA ===== */
(() => {
'use strict';
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = s => document.querySelector(s);

/* --- interactive fluid particle wave (mouse-reactive, gravity-aware) --- */
const cv = $('#wavefx');
if (cv) {
  const x = cv.getContext('2d');
  let W, H, parts = [], mx = -999, my = -999, raf;
  const size = () => {
    const r = cv.getBoundingClientRect();
    W = cv.width = r.width * devicePixelRatio;
    H = cv.height = r.height * devicePixelRatio;
    x.scale(1, 1);
    build();
  };
  function build() {
    parts = [];
    const gap = 26 * devicePixelRatio;
    for (let i = gap / 2; i < W; i += gap)
      for (let j = gap / 2; j < H; j += gap)
        parts.push({ ox: i, oy: j, x: i, y: j, vx: 0, vy: 0 });
  }
  cv.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect();
    mx = (e.clientX - r.left) * devicePixelRatio;
    my = (e.clientY - r.top) * devicePixelRatio;
  });
  cv.addEventListener('pointerleave', () => { mx = my = -999; });
  let t = 0;
  function frame() {
    t += .012;
    x.clearRect(0, 0, W, H);
    const R = 130 * devicePixelRatio;
    for (const p of parts) {
      // wave motion
      const wy = Math.sin(p.ox * .008 + t) * 9 * devicePixelRatio
               + Math.cos(p.oy * .01 + t * .8) * 6 * devicePixelRatio;
      // cursor repulsion
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
      if (d < R && d > 0) { const f = (1 - d / R) * 3.4; p.vx += dx / d * f; p.vy += dy / d * f; }
      // spring back (gravity-aware)
      p.vx += (p.ox - p.x) * .045; p.vy += (p.oy + wy - p.y) * .045;
      p.vx *= .87; p.vy *= .87;
      p.x += p.vx; p.y += p.vy;
      const disp = Math.min(1, Math.hypot(p.x - p.ox, p.y - p.oy - wy) / 34);
      const r2 = (1.1 + disp * 2.3) * devicePixelRatio;
      x.beginPath(); x.arc(p.x, p.y, r2, 0, 7);
      x.fillStyle = disp > .06
        ? `rgba(212,175,97,${.28 + disp * .6})`
        : `rgba(150,150,175,${.14 + disp * .3})`;
      x.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  size(); addEventListener('resize', size);
  const wio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && !RM) { if (!raf) raf = requestAnimationFrame(frame); }
    else { cancelAnimationFrame(raf); raf = null; }
  }), { threshold: .05 });
  wio.observe(cv);
  if (RM) { frame(); cancelAnimationFrame(raf); raf = null; }
}

/* --- countdown (resets daily at midnight WIB) --- */
function tick() {
  const now = new Date();
  const end = new Date(now); end.setHours(24, 0, 0, 0);
  let s = Math.max(0, Math.floor((end - now) / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor(s % 3600 / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  const H = $('#cdh'), M = $('#cdm'), S = $('#cds');
  if (H) { H.textContent = h; M.textContent = m; S.textContent = sec; }
}
tick(); setInterval(tick, 1000);

/* --- stock bar --- */
const sb = $('#stockbar');
if (sb) new IntersectionObserver((es, o) => es.forEach(e => {
  if (e.isIntersecting) { sb.style.width = '78%'; o.disconnect(); }
}), { threshold: .5 }).observe(sb);

/* --- sticky bottom CTA --- */
const bar = $('#stickyCta');
if (bar) {
  document.body.classList.add('has-sticky');
  const hero = $('.hero'), pesan = $('#pesan');
  addEventListener('scroll', () => {
    const past = scrollY > hero.offsetHeight * .9;
    const atForm = pesan.getBoundingClientRect().top < innerHeight * .8;
    bar.classList.toggle('show', past && !atForm);
  }, { passive: true });
}
})();
