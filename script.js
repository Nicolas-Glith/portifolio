// ===== DARK/LIGHT MODE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verifica preferência salva
if (localStorage.getItem('theme') === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// ===== MENU MOBILE =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== ANIMAÇÃO AO SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Aplica animação em seções
document.querySelectorAll('.section, .project-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simula envio
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;
  
  setTimeout(() => {
    alert('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.');
    contactForm.reset();
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 1500);
});

// ===== ANO DINÂMICO NO FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== EFEITO PARALLAX SUAVE NO HERO =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.profile-placeholder');
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});