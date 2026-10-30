/* ═══════════════════════════════════════════════════════════════
   MALZAN MEDIAWORKS — SITE JS
   Shared across all pages
   ═══════════════════════════════════════════════════════════════ */

/* ── THEME ──────────────────────────────────────────────────── */
const stored = localStorage.getItem('mm-theme');
if (stored) document.documentElement.setAttribute('data-theme', stored);

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('mm-theme', next);
  const icon = document.querySelector('.theme-toggle .t-icon');
  if (icon) icon.textContent = next === 'dark' ? '☀' : '◑';
}

/* ── MOBILE MENU ─────────────────────────────────────────────── */
function toggleMob() {
  const m = document.getElementById('mobMenu');
  if (m) m.classList.toggle('open');
}

/* ── ACTIVE NAV LINK ─────────────────────────────────────────── */
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === current);
  });
}

/* ── SCROLL: SMOOTH ANCHOR ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();

  // Init theme icon
  const icon = document.querySelector('.theme-toggle .t-icon');
  if (icon) {
    const cur = document.documentElement.getAttribute('data-theme');
    icon.textContent = cur === 'dark' ? '☀' : '◑';
  }

  // Scroll-based nav highlight — only on pages with [data-section] nav links
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a[data-section]');
  if (sections.length && navAs.length) {
    function updateScrollNav() {
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
      navAs.forEach(a => a.classList.toggle('active', a.dataset.section === cur));
    }
    window.addEventListener('scroll', updateScrollNav, { passive: true });
    updateScrollNav();
  }
});

/* ── DYNAMIC BRACKET CONTENT-BINDING ENGINE ──────────────────── */
const bracketObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const height = entry.borderBoxSize
      ? entry.borderBoxSize[0].blockSize
      : entry.contentRect.height;
    entry.target.style.setProperty('--section-height', `${height}px`);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section, .content-block, main > div, .syntax-encapsulate').forEach(el => {
    bracketObserver.observe(el);
  });
});
