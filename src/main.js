// minimal accessibility + demo JS
document.getElementById('year').textContent = new Date().getFullYear();

// Menu toggle accessible behavior
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  // close on Escape and return focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
        menuToggle.focus();
      }
    }
  });
}

// simple search handler (demo only)
document.getElementById('searchForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = document.getElementById('q').value.trim();
  // simple client-side filter of demo cards (for local testing)
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!q) {
    cards.forEach(c => c.style.display = '');
    return;
  }
  const term = q.toLowerCase();
  cards.forEach(c => {
    const text = c.innerText.toLowerCase();
    c.style.display = text.includes(term) ? '' : 'none';
  });
});

