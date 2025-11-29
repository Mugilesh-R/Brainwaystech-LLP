// ------------------------------
// Active Navigation Highlight
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('header .nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || currentPath.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
});

// ------------------------------
// Smooth scroll for anchor links
// ------------------------------
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ------------------------------
// Optional: Glass hover animation
// ------------------------------
const glassCards = document.querySelectorAll('.glass');
glassCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-6px)';
    card.style.transition = '0.3s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// ------------------------------
// Contact Form Submission (fallback if needed)
// ------------------------------
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if(contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone')?.value.trim() || '',
      message: document.getElementById('message').value.trim(),
    };

    formStatus.style.color = 'white';
    formStatus.textContent = 'Sending...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        formStatus.style.color = '#00ff88';
        formStatus.textContent = 'Message sent successfully!';
        contactForm.reset();
      } else {
        throw new Error();
      }

    } catch (error) {
      formStatus.style.color = '#FF4444';
      formStatus.textContent = 'Something went wrong. Please try again.';
    }
  });
}
