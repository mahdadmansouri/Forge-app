/* FORGE Service Worker
   Provides offline support and enables the Chrome "Install app" prompt.
   Strategy: cache-first for the main HTML, fall back to network. */

const CACHE_NAME = 'forge-v1';
const APP_URL = './';

self.addEventListener('install', (event) => {
  // Activate this SW immediately on install
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache the main page
      return cache.add(new Request(APP_URL, { cache: 'reload' })).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  // Take control of all clients immediately
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      ),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  // For navigation requests (loading the app HTML): network-first, fall back to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Save fresh copy to cache
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(APP_URL, copy)).catch(() => {});
          return response;
        })
        .catch(() => {
          // Offline: serve cached app
          return caches.match(APP_URL).then((r) => r || caches.match(event.request));
        })
    );
    return;
  }

  // For other GETs (images, fonts, etc.): cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Cache 200 responses from same origin
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => undefined);
    })
  );
});

/* Notification click — when user taps a notification, focus or open the app */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      // Try to focus an existing window
      for (const client of clientsArr) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(APP_URL);
      }
    })
  );
});

/* Allow the page to message the SW to skip waiting */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
