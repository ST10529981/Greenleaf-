// Shared header + footer (injected so every page stays consistent)
const pages = [['index.html','Home'],['about.html','About us'],['services.html','Services'],['fees.html','Calculate fees'],['contact.html','Contact us']];
const serviceLinks = [['services.html','All services (summary)'],['maintenance.html','Garden maintenance'],['lawn.html','Lawn care'],['landscaping.html','Landscaping']];
const current = location.pathname.split('/').pop() || 'index.html';

function buildHeader() {
  let items = '';
  pages.forEach(([href, label]) => {
    if (href === 'services.html') {
      const active = serviceLinks.some(s => s[0] === current) ? 'active' : '';
      items += `<li class="has-sub"><a href="${href}" class="${active}" aria-haspopup="true">Services ▾</a>
        <ul class="sub">${serviceLinks.map(s => `<li><a href="${s[0]}">${s[1]}</a></li>`).join('')}</ul></li>`;
    } else {
      items += `<li><a href="${href}" class="${href === current ? 'active' : ''}">${label}</a></li>`;
    }
  });
  document.getElementById('site-header').innerHTML = `<div class="wrap bar">
    <a class="logo" href="index.html">🌿 Greenleaf Garden Services</a>
    <button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
    <nav aria-label="Main"><ul>${items}</ul></nav></div>`;
  const btn = document.querySelector('.menu-btn'), nav = document.querySelector('nav');
  btn.addEventListener('click', () => btn.setAttribute('aria-expanded', nav.classList.toggle('open')));
}

function buildFooter() {
  document.getElementById('site-footer').innerHTML = `<div class="wrap">
    <strong>🌿 Greenleaf Garden Services</strong>
    <p>📞 011 555 0123 · ✉️ info@greenleaf.example · Mon–Fri 07:30–17:00</p>
    <p><a href="contact.html">Contact us</a> · <a href="fees.html">Calculate fees</a> · <a href="about.html">About us</a></p>
    <small>© 2026 Greenleaf Garden Services</small></div>`;
}

// ---------- Contact form validation ----------
function setError(field, msg) {
  field.classList.toggle('invalid', !!msg);
  field.parentElement.querySelector('.error').textContent = msg;
  return !msg;
}
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = form.elements;
    const checks = [
      setError(f.name, f.name.value.trim().length < 2 ? 'Enter your full name (at least 2 characters).' : ''),
      setError(f.email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()) ? 'Enter a valid email address, e.g. name@example.com.' : ''),
      setError(f.phone, !/^(\+27|0)\d{9}$/.test(f.phone.value.replace(/\s/g, '')) ? 'Enter a South African number, e.g. 082 555 0123.' : ''),
      setError(f.topic, f.topic.value === '' ? 'Choose what your message is about.' : ''),
      setError(f.message, f.message.value.trim().length < 10 ? 'Write at least 10 characters.' : '')
    ];
    const box = document.getElementById('form-result');
    if (checks.every(Boolean)) {
      box.innerHTML = `<div class="success" role="status">Thank you, ${f.name.value.trim()}. We will reply within one working day.</div>`;
      form.reset();
    } else box.innerHTML = '';
  });
}

buildHeader(); buildFooter(); initContactForm();
