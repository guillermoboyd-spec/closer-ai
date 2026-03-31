const CACHE_NAME = 'gb-closer-v1';
const ASSETS = [
    'index.html',
    'app.css',
    'app.js',
    'logo_gold.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
