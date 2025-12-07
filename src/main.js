// src/main.js
import { appStore } from './store.js';
import { initRouter } from './router.js';
import { fetchProducts } from './api.js';
import { saveProducts, getAllProducts } from './idb.js';

const YEAR_EL = document.getElementById('year');
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

window.addEventListener('DOMContentLoaded', () => {
  // Router init
  if (typeof initRouter === 'function') initRouter();

  // menu toggle (existing)
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
        menuToggle.focus();
      }
    });
  }

  // UI elements
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('q');
  const resultsEl = document.getElementById('results');
  const statusElId = 'fetch-status'; // element id we'll create for status

  function renderStatus(message, type = 'info') {
    // create or update status node
    let s = document.getElementById(statusElId);
    if (!s) {
      s = document.createElement('div');
      s.id = statusElId;
      s.setAttribute('role', 'status');
      s.style.margin = '12px 0';
      resultsEl.parentNode.insertBefore(s, resultsEl);
    }
    s.textContent = message;
    s.className = `fetch-status ${type}`;
  }

  function clearStatus() {
    const s = document.getElementById(statusElId);
    if (s) s.remove();
  }

  function renderItems(items = []) {
    resultsEl.innerHTML = '';
    if (!items || items.length === 0) {
      resultsEl.innerHTML = `<p class="muted">No results</p>`;
      return;
    }
    const container = document.createElement('div');
    container.className = 'main-cards';
    items.forEach(it => {
      const card = document.createElement('article');
      card.className = 'card';
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="thumb" aria-hidden="true"></div>
        <div class="meta"><h3>${escapeHtml(it.title || it.name || '')}</h3>
        <p>${escapeHtml(it.description || it.brand || '')}</p></div>
      `;
      container.appendChild(card);
    });
    resultsEl.appendChild(container);
  }

  function escapeHtml(s = '') {
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  // Debounce helper
  function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  // Core search flow (debounced)
  async function doSearch(q = '') {
    clearStatus();
    renderStatus('Loading…', 'loading');
    try {
      const items = await fetchProducts(q); // real network call
      renderItems(items);
      clearStatus();
      // persist to IndexedDB (non-blocking)
      saveProducts(items).catch(err => console.warn('IDB save failed', err));
    } catch (err) {
      // show failure UI & message
      renderItems([]); // clear results
      renderStatus(`Could not fetch results: ${err.message}`, 'error');
    }
  }

  const debouncedSearch = debounce((val) => doSearch(val), 350);

  // wire up form
  if (searchForm && searchInput) {
    // initial load: try to show cached items first
    getAllProducts().then(cached => {
      if (cached && cached.length) {
        renderStatus('Loaded from local cache', 'info');
        renderItems(cached);
      } else {
        // load default dataset (first page)
        doSearch('');
      }
    }).catch(() => {
      // ignore idb errors, still perform network fetch
      doSearch('');
    });

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput.value.trim();
      debouncedSearch(q);
      appStore.setState({ query: q });
    });

    // Also respond to input for live (debounced) search
    searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value.trim());
    });
  }

  // expose helper for debugging
  window._doSearch = doSearch;
});

