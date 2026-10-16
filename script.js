// ===== Mobile menu toggle =====
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');

if (burger && mainNav) {
  burger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const q = i.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Scroll reveal animation =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ===== Before/After lightbox =====
const modal = document.getElementById('baModal');
const modalClose = document.getElementById('modalClose');
const modalLabel = document.getElementById('modalLabel');
const modalPhoto = document.getElementById('modalPhoto');

if (modal && modalClose && modalLabel && modalPhoto) {
  document.querySelectorAll('.ba-item').forEach(item => {
    item.addEventListener('click', () => {
      const label = item.dataset.label || '';
      modalLabel.textContent = label;
      modalPhoto.src = item.dataset.img || '';
      modalPhoto.alt = label;
      modal.classList.add('open');
    });
  });

  function closeModal() { modal.classList.remove('open'); }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ===== Analytics goals: WhatsApp and phone clicks (Metrika + GA4) =====
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  const goal = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : null;
  if (!goal) return;
  if (typeof window.ym === 'function') window.ym(113211714, 'reachGoal', goal);
  if (typeof window.gtag === 'function') window.gtag('event', goal + '_click', { method: goal });
});

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
