# Upload 3 — Async, Storage & UX

## 1. Basic information
1.1 Team: Carlson Wachira (Frontend & A11y), Nessrellah Achebi (JS and Testing)
1.2 Upload number: 3
1.3 Self-assessment: Done (Debounced search, fetch flows, IDB persistence)
1.4 Summary: Implemented API integration against dummyjson.com, added robust error handling, debounced search UX, and IndexedDB persistence for offline/fast access. Initial cache is loaded on startup if present.

## 2. Evidence

### 2.1 Network panel
- Filename: `screenshots/network_panel.png`  
- Caption: Network panel showing GET request to `https://dummyjson.com/products/search?q=phone` with status 200 and JSON response.

### 2.2 Failure mode
- Filename: `screenshots/failure_mode.png`  
- Caption: UI showing graceful error message when the network is offline or fetch fails.

### 2.3 IndexedDB viewer
- Filename: `screenshots/indexeddb_viewer.png`  
- Caption: Chrome DevTools Application → IndexedDB → `campusData` → `products` showing stored items persisted after successful fetch.

## 3. Code excerpts
- `src/api.js` — fetchProducts() with try/catch and res.ok handling.
- `src/idb.js` — openDB(), saveProducts(), getAllProducts() helpers.
- `src/main.js` — debounced search, renderStatus(), renderItems(), and IDB persistence call.

## 4. Commands & tests
- Manual test steps:
  1. Open site in Chrome.
  2. Open DevTools → Network.
  3. Perform a search for "phone" → observe GET request and response.
  4. Switch DevTools Network to **Offline**, perform search → observe error UI.
  5. Re-enable network, perform search again → open Application → IndexedDB → confirm records.
- Files committed: `src/api.js`, `src/idb.js`, `src/main.js`, `styles/styles.css` (status styles), `logbooks/upload3.md`

## 5. Notes & caveats
- IndexedDB writes are performed asynchronously and non-blocking — failures are logged in console but do not block UI.
- Debounce reduces request volume; server errors are surfaced to the user with a descriptive message.
