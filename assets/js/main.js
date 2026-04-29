/* ============================================
   electriciansnewyork.com — main.js
   ============================================ */

// ── Smooth Scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Sticky Nav Shadow ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('shadow-xl', window.scrollY > 10);
  });
}

// ── Mobile Menu Toggle ─────────────────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ── FAQ Accordion ──────────────────────────────────────────────
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

    if (!isOpen) {
      answer.classList.remove('hidden');
      if (icon) icon.textContent = '−';
    }
  });
});

// ── Lead Form Handling ─────────────────────────────────────────
document.querySelectorAll('.lead-form').forEach(form => {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const successMsg = this.querySelector('.success-msg');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        if (successMsg) {
          successMsg.classList.remove('hidden');
          this.reset();
        }
        btn.textContent = '✓ Sent!';
        btn.classList.add('bg-green-600');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
      alert('There was a problem submitting. Please call us at (212) 555-0198.');
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.remove('bg-green-600');
    }, 5000);
  });
});

// ── Floating Call Button (mobile) ─────────────────────────────
const floatBtn = document.getElementById('float-call');
if (floatBtn) {
  window.addEventListener('scroll', () => {
    floatBtn.classList.toggle('opacity-0', window.scrollY < 300);
    floatBtn.classList.toggle('pointer-events-none', window.scrollY < 300);
  });
}

// ── Animate on Scroll ──────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// ── Urgency Counter (fake "electricians available now") ────────
const counter = document.getElementById('available-count');
if (counter) {
  const counts = [7, 9, 11, 8, 12, 6];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % counts.length;
    counter.textContent = counts[i];
  }, 8000);
}
