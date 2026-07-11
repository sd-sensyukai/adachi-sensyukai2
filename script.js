(function () {
  'use strict';

  // ===== Viewport & slideshow size lock (mobile swipe fix) =====
  const slideshow = document.querySelector('.slideshow');
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  function lockViewportSize() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    document.documentElement.style.setProperty('--vh', height * 0.01 + 'px');

    if (!slideshow) return;

    if (mobileQuery.matches) {
      slideshow.style.width = width + 'px';
      slideshow.style.height = height + 'px';
    } else {
      slideshow.style.width = '';
      slideshow.style.height = '';
    }
  }

  lockViewportSize();
  window.addEventListener('orientationchange', function () {
    setTimeout(lockViewportSize, 150);
  });

  // ===== Slideshow =====
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const slideInterval = 5000;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  if (slides.length > 1) {
    setInterval(nextSlide, slideInterval);
  }

  // ===== Header scroll effect =====
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile navigation =====
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  navToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ===== Google Form placeholder =====
  const googleFormBtn = document.getElementById('googleFormBtn');

  googleFormBtn.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
      alert('申込フォームは現在準備中です。お電話でのご予約をお願いいたします。');
    }
  });

  // ===== Smooth scroll offset for fixed header =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      window.scrollTo({
        top: targetPosition,
        behavior: isMobile ? 'auto' : 'smooth'
      });
    });
  });
})();
