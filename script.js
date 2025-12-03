// Smooth scroll for nav links
document.querySelectorAll('.main-nav a, .hero a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const offset = document.querySelector('.main-header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - (offset + 10);

    window.scrollTo({ top, behavior: 'smooth' });

    // Close mobile menu
    document.querySelector('.main-nav').classList.remove('open');
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// Vacancies accordion
document.querySelectorAll('.vacancy-card').forEach(card => {
  const header = card.querySelector('.vacancy-header');
  const body = card.querySelector('.vacancy-body');

  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');

    // Close others
    document.querySelectorAll('.vacancy-card.open').forEach(openCard => {
      if (openCard !== card) {
        openCard.classList.remove('open');
        const openBody = openCard.querySelector('.vacancy-body');
        openBody.style.maxHeight = null;
      }
    });

    // Toggle current
    card.classList.toggle('open');
    if (!isOpen) {
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      body.style.maxHeight = null;
    }
  });
});

// Contact form simple validation (front-end only)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    let valid = true;

    const setError = (field, msg) => {
      const span = document.querySelector(`.error-message[data-for="${field}"]`);
      if (span) span.textContent = msg || '';
    };

    setError('name', '');
    setError('email', '');
    setError('message', '');
    formStatus.textContent = '';

    if (!name) {
      setError('name', 'Please enter your name.');
      valid = false;
    }

    if (!email) {
      setError('email', 'Please enter your email.');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!message) {
      setError('message', 'Please enter a message.');
      valid = false;
    }

    if (!valid) return;

    // Simulate successful submission
    contactForm.reset();
    formStatus.textContent =
      'Thank you for your enquiry. A member of the Trafford Security team will contact you shortly.';
  });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (!backToTop) return;
  const shouldShow = window.scrollY > 350;
  backToTop.classList.toggle('show', shouldShow);
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Dynamic year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
