/* =============================================
   electriciansnewyork.com — main.js v3 (fixed)
   ============================================= */

/* ── Mobile Menu ────────────────────────────── */
(function () {
  const menuBtn    = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  function open()  { mobileMenu.classList.add('open');    menuBtn.setAttribute('aria-expanded','true'); }
  function close() { mobileMenu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); }

  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? close() : open();
  });

  // Close when a nav link is clicked
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && e.target !== menuBtn) close();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });

  // Close on resize to desktop width
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) close();
  });
})();

/* ── Sticky Nav Shadow ──────────────────────── */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 1px 3px rgba(0,0,0,0.08)';
  }, { passive: true });
})();

/* ── Smooth Scroll ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
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
  Uses .faq-open class (not Tailwind 'hidden') to avoid !important conflict.
  The .faq-answer elements must NOT have class="hidden" in HTML.
*/
document.querySelectorAll('.faq-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var answer = this.nextElementSibling;
    var icon   = this.querySelector('.faq-icon');
    var isOpen = answer.classList.contains('faq-open');

    // Close all open answers
    document.querySelectorAll('.faq-answer').forEach(function(a) {
      a.classList.remove('faq-open');
    });
    document.querySelectorAll('.faq-icon').forEach(function(i) {
      i.textContent = '+';
    });

    // Open clicked one if it was closed
    if (!isOpen) {
      answer.classList.add('faq-open');
      if (icon) icon.textContent = '\u2212'; // − character
    }
  });
});

/* ── Lead Form Handling ─────────────────────── */
document.querySelectorAll('.lead-form').forEach(function(form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn        = this.querySelector('button[type="submit"]');
    var successMsg = this.querySelector('.success-msg');
    var origText   = btn.innerHTML;

    btn.disabled  = true;
    btn.innerHTML = 'Sending&hellip;';

    try {
      var res = await fetch(this.action, {
        method:  'POST',
        body:    new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML = '&#10003; Sent!';
        btn.style.background = '#16a34a';
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        this.reset();
      } else {
        throw new Error('server error');
      }
    } catch (err) {
      alert('Something went wrong. Please call us at (212) 555-0198.');
      btn.innerHTML = origText;
      btn.disabled  = false;
    }
  });
});

/* ── Floating Call Button (mobile) ─────────── */
(function () {
  var floatBtn = document.getElementById('float-call');
  if (!floatBtn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 280) {
      floatBtn.classList.add('visible');
    } else {
      floatBtn.classList.remove('visible');
    }
  }, { passive: true });
})();

/* ── Fade-in on Scroll ──────────────────────── */
(function () {
  var fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately for older browsers
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }
})();

/* ── Live Availability Counter ─────────────── */
(function () {
  var counter = document.getElementById('available-count');
  if (!counter) return;
  var counts = [7, 9, 11, 8, 12, 6, 10];
  var i = 0;
  setInterval(function() {
    i = (i + 1) % counts.length;
    counter.textContent = counts[i];
  }, 7000);
})();

/* ── Phone Input Auto-Format ────────────────── */
document.querySelectorAll('input[name="phone"]').forEach(function(input) {
  input.addEventListener('input', function() {
    var digits = this.value.replace(/\D/g, '').slice(0, 10);
    if (digits.length >= 6) {
      this.value = '(' + digits.slice(0,3) + ') ' + digits.slice(3,6) + '-' + digits.slice(6);
    } else if (digits.length >= 3) {
      this.value = '(' + digits.slice(0,3) + ') ' + digits.slice(3);
    } else {
      this.value = digits;
    }
  });
});
