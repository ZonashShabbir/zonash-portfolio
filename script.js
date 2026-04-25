// ================================
//  PORTFOLIO  —  script.js
//  Zonash Shabbir | Air University
// ================================

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// --- ACTIVE NAV ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active-link');
  });
});

// --- TYPED TEXT ---
const roles = [
  'CS Student @ Air University',
  'Web Developer',
  'Frontend Enthusiast',
  'C++ Programmer',
  'Problem Solver',
  'Future Software Engineer'
];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const role = roles[rIdx];
  typedEl.textContent = deleting ? role.slice(0, cIdx--) : role.slice(0, cIdx++);
  let speed = deleting ? 55 : 95;
  if (!deleting && cIdx === role.length + 1) { deleting = true; speed = 1600; }
  else if (deleting && cIdx < 0)  { deleting = false; cIdx = 0; rIdx = (rIdx + 1) % roles.length; speed = 400; }
  setTimeout(typeEffect, speed);
}
typeEffect();

// --- REVEAL ON SCROLL ---
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 90);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- SKILL BAR ANIMATION ---
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.width = entry.target.getAttribute('data-width') + '%';
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));

// --- STAT COUNTER ---
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = parseInt(entry.target.getAttribute('data-target'));
    let count = 0;
    const inc = target / 50;
    const timer = setInterval(() => {
      count += inc;
      if (count >= target) { entry.target.textContent = target; clearInterval(timer); }
      else entry.target.textContent = Math.floor(count);
    }, 30);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(n => counterObserver.observe(n));

// --- PROJECT FILTER ---
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('hidden', !match);
      if (match) card.style.animation = 'fadeIn 0.4s ease forwards';
    });
  });
});

// --- CONTACT FORM ---
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Sent!';
    successMsg.style.display = 'flex';
    form.reset();
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled = false;
      successMsg.style.display = 'none';
    }, 4000);
  }, 1500);
});

// --- BACK TO TOP ---
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 400));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// --- INJECT STYLES ---
const style = document.createElement('style');
style.textContent = `
  .nav-link.active-link { color: var(--gold) !important; }
  @keyframes fadeIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
`;
document.head.appendChild(style);