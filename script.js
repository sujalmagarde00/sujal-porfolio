 /* ================= THEME TOGGLE (in-memory, no storage APIs) ================= */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
let currentTheme = 'dark';
function applyTheme(t){
  root.setAttribute('data-theme', t);
  themeToggle.innerHTML = t === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});
applyTheme(currentTheme);

/* ================= MOBILE NAV ================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ================= TYPING ANIMATION (tagline) ================= */
const typeTarget = document.getElementById('typeText');
const phrases = ['Full-Stack Developer', 'Backend Engineer', 'CS Undergraduate — RGPV', 'Problem Solver'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let pIndex = 0, cIndex = 0, deleting = false;
function typeLoop(){
  if(reduceMotion){ typeTarget.textContent = phrases[0]; return; }
  const current = phrases[pIndex];
  if(!deleting){
    cIndex++;
    typeTarget.textContent = current.slice(0, cIndex);
    if(cIndex === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    cIndex--;
    typeTarget.textContent = current.slice(0, cIndex);
    if(cIndex === 0){ deleting = false; pIndex = (pIndex + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
typeLoop();

/* ================= TERMINAL SCRIPT TYPING ================= */
const termBody = document.getElementById('termBody');
const termScript = [
  {type:'cmd', prompt:'sujal@portfolio', text:'who am i'},
  {type:'out', text:'Sujal Magarde — B.Tech CSE, RGPV Bhopal (2027)'},
  {type:'cmd', prompt:'sujal@portfolio', text:' skills'},
  {type:'out2', text:'Java · Spring Boot · React · Node.js · MySQL'},
  {type:'cmd', prompt:'sujal@portfolio', text:'experience'},
  {type:'out', text:'✔ JPMorganChase Software Engineering Simulation'},
  {type:'cmd', prompt:'sujal@portfolio', text:'status availability'},
  {type:'out2', text:'open to entry-level Software Engineer roles'},
];
let termIdx = 0;
function typeTerminalLine(){
  if(termIdx >= termScript.length){ return; }
  const item = termScript[termIdx];
  const div = document.createElement('div');
  div.className = 'line';
  termBody.appendChild(div);
  if(item.type === 'cmd'){
    const promptSpan = `<span class="prompt">${item.prompt}:~$</span> `;
    let i = 0;
    const full = item.text;
    const interval = setInterval(() => {
      i++;
      div.innerHTML = promptSpan + `<span class="cmd">${full.slice(0,i)}</span>`;
      if(i >= full.length){
        clearInterval(interval);
        termIdx++;
        setTimeout(typeTerminalLine, 260);
      }
    }, reduceMotion ? 0 : 32);
  } else {
    div.innerHTML = `<span class="${item.type === 'out2' ? 'out2' : 'out'}">${item.text}</span>`;
    termIdx++;
    setTimeout(typeTerminalLine, 320);
  }
}
typeTerminalLine();

/* ================= SCROLL REVEAL ================= */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

/* ================= SKILL BARS ================= */
const bars = document.querySelectorAll('.bar-fill');
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.width = entry.target.dataset.w + '%';
      barIo.unobserve(entry.target);
    }
  });
}, {threshold:0.3});
bars.forEach(b => barIo.observe(b));

/* ================= BACK TO TOP ================= */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior: reduceMotion ? 'auto' : 'smooth'}));

/* ================= CONTACT FORM (client-side only) ================= */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg = document.getElementById('cf-msg').value.trim();
  if(!name || !email || !msg){
    status.textContent = 'Please fill in every field.';
    status.style.color = '#FF5F57';
    return;
  }
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:magardesujal00@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app to send this message…';
  status.style.color = 'var(--accent-3)';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

/* ================= CERTIFICATE LIGHTBOX ================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.src;
    const title = card.dataset.title;
    const sub = card.dataset.sub;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxCaption.textContent = `${title} — ${sub}`;
    lightbox.classList.add('open');
    lightboxImg.onerror = () => { lightboxCaption.textContent = `${title} — image not found. Add "${src}" to the site folder.`; };
  });
});
function closeLightbox(){ lightbox.classList.remove('open'); lightboxImg.src = ''; }
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });

/* ================= PARTICLE NETWORK BACKGROUND ================= */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animId;
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
}
function getAccentColor(){
  return getComputedStyle(root).getPropertyValue('--accent').trim() || '#7C6FF0';
}
function initParticles(){
  const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
  particles = Array.from({length: count}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }));
}
function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const num = parseInt(hex,16);
  return `${(num>>16)&255},${(num>>8)&255},${num&255}`;
}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const rgb = hexToRgb(getAccentColor());
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 140){
        ctx.strokeStyle = `rgba(${rgb}, ${0.12 * (1 - dist/140)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  particles.forEach(p => {
    ctx.fillStyle = `rgba(${rgb}, 0.6)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI*2);
    ctx.fill();
  });
  animId = requestAnimationFrame(drawParticles);
}
function startParticles(){
  resizeCanvas();
  initParticles();
  cancelAnimationFrame(animId);
  drawParticles();
}
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
startParticles();
