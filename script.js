/* ============================================
   Gautam Dodiya Portfolio — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Glass Navigation ---
  const nav = document.getElementById('main-nav');
  const scrollThreshold = 50;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Check on load

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      // Handle scroll to top
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      // Handle normal sections
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Image Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  if (lightbox && lightboxImg && lightboxClose) {
    // Open Lightbox
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt || 'Fullscreen Image';
        
        lightbox.classList.remove('hidden');
        // Small delay to allow display:flex to apply before animating opacity
        setTimeout(() => {
          lightbox.classList.remove('opacity-0');
          lightboxImg.classList.remove('scale-95');
          lightboxImg.classList.add('scale-100');
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Close Lightbox
    const closeLightbox = () => {
      lightbox.classList.add('opacity-0');
      lightboxImg.classList.remove('scale-100');
      lightboxImg.classList.add('scale-95');
      
      setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = ''; 
        document.body.style.overflow = ''; 
      }, 300);
    };

    lightbox.addEventListener('click', (e) => {
      // Close if clicking outside the image, on the close button, or on the image itself (zoom out effect)
      if (e.target === lightbox || e.target === lightboxClose || e.target.closest('#lightbox-close') || e.target === lightboxImg) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  }

});
