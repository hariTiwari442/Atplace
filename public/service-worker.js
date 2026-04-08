const CACHE_NAME = 'atplace-v' + self.registration.scope;

// Install — only cache index.html, not hashed JS files (CRA handles those)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add('/index.html'))
  );
  // Immediately take over — don't wait for old SW to die
  self.skipWaiting();
});

// Activate — delete ALL old caches so users always get fresh code
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch — network first for everything, fallback to index.html for navigation
self.addEventListener('fetch', (event) => {
  // Skip API calls — always fetch live
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('supabase') ||
    event.request.url.includes('localhost:5000') ||
    event.request.url.includes('run.app')
  ) {
    return;
  }

  // For navigation requests (page loads), serve index.html from cache as fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Everything else — network first, no caching of hashed assets needed
  event.respondWith(fetch(event.request));
});
