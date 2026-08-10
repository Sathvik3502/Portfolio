const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) heroVisual.insertAdjacentHTML('beforeend', '<a class="scroll-cue" href="#about" aria-label="Scroll to About">⌄</a>');

const profileOrb = document.querySelector('.profile-orb');
if (profileOrb) {
  const initials = profileOrb.querySelector('span');
  if (initials) initials.insertAdjacentHTML('afterend', '<img class="profile-photo" src="assets/sathvik-profile.jpg" alt="Sathvik Chavata" />');
}

const roleHeading = document.querySelector('.hero h2');
const roles = ['AI/ML Engineer', 'GenAI Engineer', 'Agentic AI Engineer', 'RAG Systems Builder'];
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;
function typeRole() {
  const role = roles[roleIndex];
  const current = deleting ? role.slice(0, characterIndex--) : role.slice(0, characterIndex++);
  roleHeading.innerHTML = `<span id="role-typing">${current}</span>`;
  let delay = deleting ? 38 : 72;
  if (!deleting && characterIndex > role.length) { deleting = true; delay = 1500; }
  if (deleting && characterIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; characterIndex = 0; delay = 260; }
  window.setTimeout(typeRole, delay);
}
if (roleHeading && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeRole();

const experienceSection = document.querySelector('#experience');
if (experienceSection) {
  experienceSection.insertAdjacentHTML('afterend', `<section id="education" class="section education"><div class="wrap"><div class="section-title centered reveal"><p>03 — EDUCATION</p><h2>Academic <span>Foundation</span></h2><small>The computer science foundation behind my engineering practice</small></div><article class="education-card reveal"><div class="education-icon">🎓</div><div><h3>B.Tech in Computer Science</h3><p>VIT Amaravati · 2019 — 2023</p></div><div class="education-score"><strong>8.42</strong><span>/ 10 CGPA</span></div></article></div></section>`);
  const educationLink = document.createElement('a');
  educationLink.href = '#education';
  educationLink.textContent = 'Education';
  const projectsLink = navLinks.querySelector('a[href="#projects"]');
  navLinks.insertBefore(educationLink, projectsLink);
}

const sectionLinks = [...document.querySelectorAll('.nav-links a')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.5] });
sections.forEach(section => navObserver.observe(section));
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.textContent = '☰';
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const resumeButton = document.querySelector('.hero-actions .primary');
if (resumeButton) {
  resumeButton.classList.add('download-button');
  resumeButton.innerHTML = '<b><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg></b> Download CV';
}

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('header-scrolled', window.scrollY > 18);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelector('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(data.get('subject'));
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  document.querySelector('.form-status').textContent = 'Opening your email app…';
  window.location.href = `mailto:sathvikch03@gmail.com?subject=${subject}&body=${body}`;
});
