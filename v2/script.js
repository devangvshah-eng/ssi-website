// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
  });
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ===== CAROUSEL =====
function initCarousel(trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  let cur = 0;
  const dots = document.querySelectorAll('.carousel-dot');

  function go(i) {
    cur = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === cur));
  }

  document.getElementById('prevBtn')?.addEventListener('click', () => go(cur - 1));
  document.getElementById('nextBtn')?.addEventListener('click', () => go(cur + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

  // Auto-advance
  setInterval(() => go(cur + 1), 5000);
  go(0);
}
initCarousel('carouselTrack');

// ===== STATS COUNTER =====
const statsSection = document.querySelector('.stats-bar') || document.querySelector('.tc-stats');
const counters = document.querySelectorAll('[data-count]');
let counted = false;

if (statsSection && counters.length) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach(el => {
        const target = parseInt(el.dataset.count.replace(/,/g, ''));
        const suffix = el.dataset.suffix || '';
        const isLarge = target >= 1000;
        let start = 0;
        const steps = 50;
        const inc = target / steps;
        const timer = setInterval(() => {
          start += inc;
          if (start >= target) { start = target; clearInterval(timer); }
          const val = Math.floor(start);
          el.textContent = isLarge ? val.toLocaleString('en-IN') : val;
        }, 35);
      });
    }
  }, { threshold: 0.4 }).observe(statsSection);
}

// ===== FADE IN ON SCROLL =====
const faders = document.querySelectorAll('.fade-in');
if (faders.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  faders.forEach(f => obs.observe(f));
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('formSuccess');
    if (msg) {
      msg.textContent = 'Your message has been submitted. We will get back to you within 24–48 hours.';
      contactForm.reset();
      setTimeout(() => msg.textContent = '', 7000);
    }
  });
}
