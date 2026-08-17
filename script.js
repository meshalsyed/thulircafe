/* =========================================================
   THULIR CAFE — SCRIPT.JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- Scroll-triggered fade-in reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Smooth in-page anchor scrolling (with header offset) ---------- */
  var navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerHeight = header.offsetHeight;
          var top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

});
