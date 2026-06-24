// Minimal service worker: enables installability and basic offline access.
const CACHE = 'tradeops-v1';
const ASSETS = ['./', './index.html', './manifest.json', './config/icon-192.png', './config/icon-512.png', './config/icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for the API (AI insights), cache-first for app shell.
  const url = e.request.url;
  if (url.includes('api.anthropic.com')) return; // never cache API calls
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      // cache successful same-origin GETs
      if (e.request.method === 'GET' && resp.ok && url.startsWith(self.location.origin)) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => cached))
  );
});
