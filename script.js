/**
 * Portfólio Profissional - Nicolas GCK
 * Funcionalidades: Dark Mode, Filtro de Projetos, Animações, Modal, Toast, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // ===== DARK/LIGHT MODE AVANÇADO =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');
  
  // Detectar preferência do sistema
  const getSystemTheme = () => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  // Carregar tema salvo ou do sistema
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || getSystemTheme();
  
  if (initialTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
  }
  
  // Alternar tema com animação
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    // Animação de transição
    document.startViewTransition?.(() => {
      if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'fas fa-moon';
        showToast('success', 'Modo claro ativado', '🌞');
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        showToast('success', 'Modo escuro ativado', '🌙');
      }
    });
  });
  
  // Escutar mudanças no sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      themeIcon.className = e.matches ? 'fas fa-sun' : 'fas fa-moon';
    }
  });

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  });

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== MENU MOBILE =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    const icon = mobileToggle.querySelector('i');
    icon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
  });
  
  // Fechar menu ao clicar em link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.querySelector('i').className = 'fas fa-bars';
    });
  });

  // ===== ACTIVE LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');
  
  const observerOptions = {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => sectionObserver.observe(section));

  // ===== TYPEWRITER EFFECT =====
  const typewriter = document.getElementById('typewriter');
  const phrases = [
    'Desenvolvedor Full Stack',
    'Especialista em React & Node.js',
    'Criador de Experiências Digitais',
    'Apaixonado por Código Limpo'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pausa no final da frase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Iniciar typewriter após preloader
  setTimeout(type, 1000);

  // ===== ANIMAÇÃO AO SCROLL (Intersection Observer) =====
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (el, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    function update() {
      start += increment;
      if (start < target) {
        el.textContent = Math.floor(start) + (el.dataset.suffix || '');
        requestAnimationFrame(update);
      } else {
        el.textContent = target + (el.dataset.suffix || '');
      }
    }
    update();
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => statsObserver.observe(stat));

  // ===== SKILL BARS ANIMATION =====
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.dataset.progress;
        bar.style.width = `${progress}%`;
        skillsObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => skillsObserver.observe(bar));

  // ===== SKILLS TABS =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillTabs = document.querySelectorAll('.skill-tab');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover active de todos
      tabBtns.forEach(b => b.classList.remove('active'));
      skillTabs.forEach(t => t.classList.remove('active'));
      
      // Adicionar active ao clicado
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      document.getElementById(tabId).classList.add('active');
    });
  });

  // ===== FILTRO DE PROJETOS =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar botões
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filtrar projetos com animação
      projectCards.forEach(card => {
        const techs = card.dataset.tech.split(' ');
        
        if (filter === 'all' || techs.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
      
      // Toast feedback
      const filterName = btn.textContent.trim();
      showToast('info', 'Filtro aplicado', `Mostrando: ${filterName}`);
    });
  });

  // ===== MODAL DE PROJETOS =====
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  
  const projectData = {
    1: {
      title: 'E-commerce Platform',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      description: 'Plataforma completa de e-commerce desenvolvida com arquitetura moderna e escalável. Inclui sistema de autenticação, carrinho de compras, processamento de pagamentos com Stripe, painel administrativo e integração com APIs de frete.',
      features: [
        'Autenticação JWT com refresh token',
        'Carrinho persistente e wishlists',
        'Pagamentos com Stripe e PIX',
        'Painel admin com gráficos em tempo real',
        'SEO otimizado com Next.js SSR',
        'Deploy automatizado com CI/CD'
      ],
      links: {
        github: '#',
        demo: '#'
      }
    },
    2: {
      title: 'TaskFlow - Gestão de Tarefas',
      tags: ['Vue.js', 'Python', 'Firebase', 'WebSockets'],
      description: 'Aplicativo colaborativo de gestão de tarefas com foco em produtividade e experiência do usuário. Permite criação de projetos, atribuição de tarefas, prazos e acompanhamento em tempo real.',
      features: [
        'Drag-and-drop intuitivo para organização',
        'Notificações push em tempo real',
        'Comentários e anexos em tarefas',
        'Relatórios de produtividade',
        'Modo offline com sincronização',
        'Integração com Google Calendar'
      ],
      links: {
        github: '#',
        demo: '#'
      }
    },
    3: {
      title: 'Analytics Dashboard',
      tags: ['Next.js', 'Express', 'D3.js', 'PostgreSQL'],
      description: 'Painel analítico interativo para visualização de dados empresariais. Oferece gráficos dinâmicos, filtros avançados, exportação de relatórios e alertas personalizados baseados em thresholds.',
      features: [
        'Gráficos interativos com D3.js e Chart.js',
        'Filtros dinâmicos e drill-down',
        'Exportação para PDF, Excel e CSV',
        'Alertas configuráveis por email/Slack',
        'Autenticação SSO com Google/Microsoft',
        'Cache inteligente com Redis'
      ],
      links: {
        github: '#',
        demo: '#'
      }
    },
    4: {
      title: 'HealthTrack - App de Saúde',
      tags: ['React Native', 'Firebase', 'HealthKit', 'TensorFlow Lite'],
      description: 'Aplicativo mobile para monitoramento completo de saúde e bem-estar. Integra com wearables, oferece planos personalizados e utiliza machine learning para insights preditivos.',
      features: [
        'Sincronização com Apple Health e Google Fit',
        'Monitoramento de sono, atividades e nutrição',
        'Planos personalizados com IA',
        'Lembretes inteligentes de medicação',
        'Compartilhamento seguro com profissionais',
        'Modo escuro e acessibilidade completa'
      ],
      links: {
        github: '#',
        demo: 'https://apps.apple.com/app/healthtrack'
      }
    },
    5: {
      title: 'AI Chatbot Assistant',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'Rasa'],
      description: 'Assistente virtual inteligente com processamento de linguagem natural avançado. Capaz de entender contexto, aprender com interações e integrar-se a múltiplos canais de atendimento.',
      features: [
        'NLP com BERT e modelos customizados',
        'Aprendizado contínuo com feedback',
        'Integração com WhatsApp, Telegram e Web',
        'Análise de sentimento em tempo real',
        'Fallback humano inteligente',
        'Dashboard de métricas de atendimento'
      ],
      links: {
        github: '#',
        demo: '#'
      }
    },
    6: {
      title: 'EduPlatform - LMS',
      tags: ['Nuxt.js', 'Strapi', 'AWS', 'WebRTC'],
      description: 'Plataforma de ensino online completa com videoaulas, quizzes interativos, certificados automáticos e gamificação. Projetada para escalabilidade e experiência de aprendizado envolvente.',
      features: [
        'Videoaulas com streaming adaptativo',
        'Quizzes com feedback imediato',
        'Certificados automáticos com verificação',
        'Sistema de gamificação com badges',
        'Salas de aula virtuais com WebRTC',
        'Analytics de engajamento dos alunos'
      ],
      links: {
        github: '#',
        demo: '#'
      }
    }
  };
  
  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;
    
    modalBody.innerHTML = `
      <h3>${data.title}</h3>
      <div class="project-tags">
        ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <p>${data.description}</p>
      
      <div class="modal-features">
        <h4><i class="fas fa-check-circle"></i> Funcionalidades Principais</h4>
        <ul>
          ${data.features.map(feature => `<li><i class="fas fa-chevron-right"></i> ${feature}</li>`).join('')}
        </ul>
      </div>
      
      <div class="modal-links">
        <a href="${data.links.github}" target="_blank" class="btn btn-outline">
          <i class="fab fa-github"></i> Ver Código
        </a>
        <a href="${data.links.demo}" target="_blank" class="btn btn-primary">
          <i class="fas fa-external-link-alt"></i> Ver Demo
        </a>
      </div>
    `;
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Foco no botão fechar para acessibilidade
    modalClose.focus();
  }
  
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Abrir modal pelos botões
  document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.dataset.project;
      openModal(projectId);
    });
  });
  
  // Fechar modal
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ===== CAROUSEL DE DEPOIMENTOS =====
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.dot');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  
  let currentSlide = 0;
  let carouselInterval;
  
  function goToSlide(index) {
    // Validar índice
    if (index < 0) index = testimonialSlides.length - 1;
    if (index >= testimonialSlides.length) index = 0;
    
    // Atualizar slides
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  // Event listeners
  testimonialNext.addEventListener('click', nextSlide);
  testimonialPrev.addEventListener('click', prevSlide);
  
  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      resetCarousel();
    });
  });
  
  // Auto-play
  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 6000);
  }
  
  function resetCarousel() {
    clearInterval(carouselInterval);
    startCarousel();
  }
  
  // Pausar ao hover
  const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
  testimonialsWrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  testimonialsWrapper.addEventListener('mouseleave', startCarousel);
  
  startCarousel();

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const charCount = document.getElementById('charCount');
  const messageInput = document.getElementById('message');
  
  // Contador de caracteres
  messageInput?.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCount.textContent = count;
    
    if (count > 450) {
      charCount.style.color = 'var(--warning)';
    } else if (count > 480) {
      charCount.style.color = 'var(--error)';
    } else {
      charCount.style.color = 'var(--text-muted)';
    }
  });
  
  // Validação em tempo real
  const formInputs = contactForm?.querySelectorAll('input, textarea, select');
  formInputs?.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  function validateField(field) {
    const formGroup = field.closest('.form-group');
    const isValid = field.checkValidity() && field.value.trim() !== '';
    
    if (!isValid) {
      field.classList.add('error');
      formGroup?.classList.add('error');
      return false;
    } else {
      field.classList.remove('error');
      formGroup?.classList.remove('error');
      return true;
    }
  }
  
  // Submit do formulário
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar todos os campos
    let isValid = true;
    formInputs.forEach(input => {
      if (!validateField(input)) isValid = false;
    });
    
    if (!isValid) {
      showToast('error', 'Erro de validação', 'Por favor, corrija os campos destacados');
      return;
    }
    
    // Estado de loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simular envio (substituir por API real)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sucesso
      showToast('success', 'Mensagem enviada!', 'Entrarei em contato em breve.');
      contactForm.reset();
      charCount.textContent = '0';
      
    } catch (error) {
      showToast('error', 'Erro ao enviar', 'Tente novamente mais tarde.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // ===== COPIAR EMAIL =====
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactEmail = document.getElementById('contactEmail')?.textContent;
  
  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      
      // Feedback visual
      copyEmailBtn.classList.add('copied');
      copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
      
      showToast('success', 'Email copiado!', 'Pronto para colar.');
      
      // Resetar após 2s
      setTimeout(() => {
        copyEmailBtn.classList.remove('copied');
        copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
      }, 2000);
      
    } catch (err) {
      showToast('error', 'Erro ao copiar', 'Selecione e copie manualmente.');
    }
  });

  // ===== DOWNLOAD CV =====
  const downloadButtons = document.querySelectorAll('[id^="downloadCV"]');
  downloadButtons.forEach(btn => {
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('info', 'Preparando download...', 'Seu CV será baixado em instantes.');
      
      // Simular preparação do arquivo
      setTimeout(() => {
        // Em produção: window.location.href = '/cv-nicolas-gck.pdf';
        showToast('success', 'Download iniciado!', 'Verifique sua pasta de downloads.');
      }, 1000);
    });
  });

  // ===== TOAST NOTIFICATIONS =====
  function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type]}"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Fechar">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Fechar ao clicar no X
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });
    
    container.appendChild(toast);
    
    // Remover automaticamente após 3s
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // Expor showToast globalmente para uso em outros lugares
  window.showToast = showToast;

  // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        // Fechar menu mobile se estiver aberto
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
        
        // Scroll suave
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== LAZY LOADING PARA IMAGENS (futuro) =====
  // if ('loading' in HTMLImageElement.prototype) {
  //   document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  //     img.src = img.dataset.src;
  //   });
  // }

  // ===== PERFORMANCE: Debounce para scroll =====
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // ===== INICIALIZAÇÃO FINAL =====
  console.log('🚀 Portfólio carregado com sucesso!');
  console.log('💡 Dica: Pressione "d" para alternar o tema rapidamente');
  
  // Atalho de teclado para tema
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      themeToggle.click();
    }
  });
  
  // Ano dinâmico no footer
  document.getElementById('year').textContent = new Date().getFullYear();
});