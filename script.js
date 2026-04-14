// ============================================
// SURVIVAL SYSTEMS INDIA – SCRIPTS
// ============================================

// ----- Navbar scroll effect -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ----- Mobile nav toggle -----
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ----- Carousel -----
const track = document.getElementById('carouselTrack');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
let currentSlide = 0;

function goToSlide(index) {
  if (slides.length === 0) return;
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto-advance carousel
setInterval(() => goToSlide(currentSlide + 1), 5000);

// ----- Contact form -----
function handleForm(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Thank you! We will get back to you within one business day.';
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 6000);
}

// ----- Animate stats on scroll -----
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = target >= 1000
      ? Math.floor(current).toLocaleString('en-IN')
      : Math.floor(current);
    el.setAttribute('data-display', display);
  }, 16);
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;
const statNumbers = document.querySelectorAll('.stat-number');
const statTargets = [138000, 400, 35000, 750];

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach((el, i) => {
        const target = statTargets[i];
        const sup = el.querySelector('sup');
        const supText = sup ? sup.outerHTML : '';
        const original = el.textContent;
        let count = 0;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          const formatted = Math.floor(count).toLocaleString('en-IN');
          el.innerHTML = formatted + '<sup>+</sup>';
        }, duration / steps);
      });
    }
  });
}, { threshold: 0.3 });

if (statsSection) statsObserver.observe(statsSection);

// ----- Fade-in on scroll -----
const fadeEls = document.querySelectorAll('.course-card, .facility-card, .stat-item, .logo-item');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});
