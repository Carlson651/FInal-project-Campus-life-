// src/api.js
const BASE = 'https://dummyjson.com';

export async function fetchProducts(q = '') {
  const url = q ? `${BASE}/products/search?q=${encodeURIComponent(q)}` : `${BASE}/products`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    // network-level error
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
    }
    const json = await res.json();
    // dummyjson returns { products: [...] } for search/list
    return json.products || [];
  } catch (err) {
    // bubble error to caller
    throw new Error(`Fetch failed: ${err.message}`);
  }
}
