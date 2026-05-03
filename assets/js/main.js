/* =============================================
   electriciansnewyork.com — main.js v3
   BULLETPROOF: uses element.style.display directly.
   No CSS class toggling for show/hide.
   ============================================= */

/* ── Mobile Menu ────────────────────────────── */
(function () {
  var menuBtn    = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.style.display = 'block';
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.style.display = 'none';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileMenu.style.display === 'block' ? closeMenu() : openMenu();
  });

  // Close when any nav link inside is tapped
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (!mobileMenu.contains(e.target) && e.target !== menuBtn) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Always close on desktop resize
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) closeMenu();
  });
})();

/* ── Sticky Nav Shadow ──────────────────────── */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 1px 3px rgba(0,0,0,0.06)';
  }, { passive: true });
})();

/* ── Smooth Scroll ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

/* ── FAQ Accordion ──────────────────────────── */
/*
  All .faq-answer divs have style="display:none" in HTML.
  JS directly sets style.display — no class dependency.
*/
document.querySelectorAll('.faq-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var answer = this.nextElementSibling;
    var icon   = this.querySelector('.faq-icon');
    var isOpen = answer.style.display === 'block';

    // Close all
    document.querySelectorAll('.faq-answer').forEach(function (a) {
      a.style.display = 'none';
    });
    document.querySelectorAll('.faq-icon').forEach(function (i) {
      i.textContent = '+';
    });

    // Open this one if it was closed
    if (!isOpen) {
      answer.style.display = 'block';
      if (icon) icon.textContent = '\u2212';
    }
  });
});

/* ── Lead Form Handling ─────────────────────── */
document.querySelectorAll('.lead-form').forEach(function (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var btn        = this.querySelector('button[type="submit"]');
    var successMsg = this.querySelector('.success-msg');
    var origHTML   = btn.innerHTML;

    btn.disabled  = true;
    btn.innerHTML = 'Sending&hellip;';

    try {
      var res = await fetch(this.action, {
        method:  'POST',
        body:    new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML         = '&#10003; Sent!';
        btn.style.background  = '#16a34a';
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        this.reset();
      } else {
        throw new Error('server');
      }
    } catch (err) {
      alert('Something went wrong. Please call us at (212) 555-0198.');
      btn.innerHTML = origHTML;
      btn.disabled  = false;
    }
  });
});

/* ── Floating Call Button (mobile only) ────── */
(function () {
  var floatBtn = document.getElementById('float-call');
  if (!floatBtn) return;

  window.addEventListener('scroll', function () {
    if (window.innerWidth >= 768) {
      floatBtn.style.opacity        = '0';
      floatBtn.style.pointerEvents  = 'none';
      return;
    }
    if (window.scrollY > 280) {
      floatBtn.style.opacity        = '1';
      floatBtn.style.transform      = 'scale(1)';
      floatBtn.style.pointerEvents  = 'auto';
    } else {
      floatBtn.style.opacity        = '0';
      floatBtn.style.transform      = 'scale(0.85)';
      floatBtn.style.pointerEvents  = 'none';
    }
  }, { passive: true });
})();

/* ── Fade-in on Scroll ──────────────────────── */
(function () {
  var fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();

/* ── Live Availability Counter ─────────────── */
(function () {
  var counter = document.getElementById('available-count');
  if (!counter) return;
  var pool = [7, 9, 11, 8, 12, 6, 10];
  var i = 0;
  setInterval(function () {
    i = (i + 1) % pool.length;
    counter.textContent = pool[i];
  }, 7000);
})();

/* ── Phone Input Auto-Format ────────────────── */
document.querySelectorAll('input[name="phone"]').forEach(function (input) {
  input.addEventListener('input', function () {
    var d = this.value.replace(/\D/g, '').slice(0, 10);
    if (d.length >= 6)      this.value = '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
    else if (d.length >= 3) this.value = '(' + d.slice(0,3) + ') ' + d.slice(3);
    else                    this.value = d;
  });
});
