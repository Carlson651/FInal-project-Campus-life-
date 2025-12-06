// Upload 2 imports — must be at top of module
import { appStore } from "./store.js";
import { initRouter } from "./router.js";

/* minimal accessibility + demo JS
   All DOM interaction runs after DOMContentLoaded so module imports work safely
*/
window.addEventListener('DOMContentLoaded', () => {
  // ===== init router (Upload 2) =====
  if (typeof initRouter === 'function') {
    initRouter();
  }

  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  // simple search handler (demo only) — keeps original behavior AND updates store
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('q');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const q = searchInput.value.trim();

      // Update app store (Upload 2)
      try {
        if (appStore && typeof appStore.setState ===


