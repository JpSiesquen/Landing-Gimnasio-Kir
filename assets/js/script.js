// ========================================
// IRON CORE - Gimnasio Moderno
// ========================================

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen);
  
  // Animación del botón hamburguesa
  navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Ajuste por navbar fijo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== INTERSECTION OBSERVER - ANIMACIONES ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Opcional: dejar de observar después de animar
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos los elementos con clase animate-on-scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// ========== FORMULARIO CTA ==========
const ctaForm = document.querySelector('.cta-final__form');

if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Validación básica
    if (!nombre || !email) {
      alert('Por favor completa todos los campos.');
      return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }
    
    // Simulación de envío exitoso
    alert(`¡Gracias ${nombre}! Te contactaremos pronto a ${email} para tu semana gratis.`);
    
    // Limpiar formulario
    ctaForm.reset();
    
    // Aquí iría la integración con backend/API
    // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ nombre, email }) })
  });
}

// ========== HOVER DINÁMICO EN CARDS ==========
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.setProperty('--glow-intensity', '1');
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.setProperty('--glow-intensity', '0');
  });
});

// ========== PARALLAX SUAVE EN HERO ==========
// El parallax se maneja via background-position en CSS para evitar
// que el hero se superponga con secciones siguientes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');

  if (hero && scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
  }
});

// ========== CONTADOR DE STATS (OPCIONAL) ==========
// Si quisieras agregar contadores animados en el futuro
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ========== LAZY LOADING MEJORADO ==========
// Mejora adicional para imágenes (aunque ya usamos loading="lazy" en HTML)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  // Si usaras data-src en lugar de src
  // document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== ACCESIBILIDAD - FOCUS TRAP EN MENÚ MÓVIL ==========
const focusableElements = navMenu.querySelectorAll(
  'a[href], button:not([disabled]), input:not([disabled])'
);

if (focusableElements.length > 0) {
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && navMenu.classList.contains('active')) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    
    // Cerrar con Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

// ========== PERFORMANCE - DEBOUNCE PARA SCROLL ==========
function debounce(func, wait = 10) {
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

// Aplicar debounce a eventos de scroll si es necesario
const debouncedScroll = debounce(() => {
  // Funciones adicionales de scroll aquí
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========== INICIALIZACIÓN ==========
console.log('🏋️ IRON CORE - Sistema cargado correctamente');
console.log('💪 Disciplina. Energía. Transformación.');
