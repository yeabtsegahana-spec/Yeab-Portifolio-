const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('main section[id]');

if (navLinks.length && sections.length) {
  const activateLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry) {
      activateLink(visibleEntry.target.id);
    }
  }, {
    threshold: [0.35, 0.6, 0.8],
    rootMargin: '-10% 0px -30% 0px'
  });

  sections.forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your message has been submitted.');
    contactForm.reset();
  });
}

const loginForm = document.querySelector('.login-form');

if (loginForm) {
  const message = loginForm.querySelector('.form-message');
  const submitButton = loginForm.querySelector('button[type="submit"]');
  const emailInput = loginForm.querySelector('input[type="email"]');
  const passwordInput = loginForm.querySelector('input[type="password"]');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      message.textContent = 'Please enter both your email and password.';
      message.classList.remove('success');
      message.classList.add('error');
      return;
    }

    message.textContent = `Welcome back, ${email}! Redirecting to your portfolio...`;
    message.classList.remove('error');
    message.classList.add('success');
    submitButton.disabled = true;

    setTimeout(() => {
      window.location.href = 'Index.html';
    }, 1200);
  });
}
