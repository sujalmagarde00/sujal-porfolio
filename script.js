
  // SCROLL ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  document.querySelectorAll('.skill-fill').forEach(bar => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          bar.style.width = bar.dataset.width + '%';
        }
      });
    }, { threshold: 0.5 });
    sectionObserver.observe(bar);
  });

  // CERT SLIDER
  let certIndex = 0;
const slidesPerView = window.innerWidth < 768 ? 1 : 3;
const totalSlides = 5;
const maxIndex = Math.max(0, totalSlides - slidesPerView);

function updateSlider() {
  const slider = document.getElementById('certSlider');
  const slideWidth = slider.children[0].offsetWidth + 24;

  slider.style.transform = `translateX(-${certIndex * slideWidth}px)`;

  document.querySelectorAll('.cert-dot').forEach((d, i) => {
    d.classList.toggle(
      'active',
      i === Math.min(certIndex, document.querySelectorAll('.cert-dot').length - 1)
    );
  });
}

function slideCert(dir) {
  certIndex = Math.max(0, Math.min(certIndex + dir, maxIndex));
  updateSlider();
}

function goToCert(i) {
  certIndex = Math.min(i, maxIndex);
  updateSlider();
}
  // PROJECT FILTER
  function filterProjects(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
    });
  }

  // CONTACT FORM
  function sendMessage() {
    const btn = document.querySelector('.form-submit');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'var(--accent3)';
    btn.style.color = '#000';
    setTimeout(() => {
      btn.innerHTML = 'Send Message ✈';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  }
