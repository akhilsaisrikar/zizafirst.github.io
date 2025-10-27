document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      mobileMenu.style.display = open ? 'none' : 'flex';
    });
  }

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.innerWidth <= 640 && mobileMenu)
            mobileMenu.style.display = 'none';
        }
      }
    });
  });

  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.from('.eyebrow', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' });
  gsap.from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15 });
  gsap.from('.hero-sub', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.25 });
  gsap.from('.hero-ctas .btn', { y: 18, opacity: 0, duration: 0.8, stagger: 0.08, delay: 0.4 });

  // full-screen hero subtle glow motion
  gsap.to('.glow-orb', {
    scale: 1.1,
    rotate: 10,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Scroll reveals
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: i * 0.05,
      scrollTrigger: {
        trigger: card,
        start: 'top 90%'
      }
    });

    // zoom + glow on hover (all elements inside)
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.07,
        boxShadow: '0 0 25px rgba(0,198,255,0.4)',
        duration: 0.3,
        ease: 'power2.out'
      });
      card.style.transition = 'color 0.3s ease';
      card.style.color = '#fff';
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 0 0 rgba(0,198,255,0)',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    });
  });

  // About image
  gsap.from('.about-image', {
    x: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 85%' }
  });

  // Contact CTA
  gsap.from('.cta', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '#contact', start: 'top 90%' }
  });
});
