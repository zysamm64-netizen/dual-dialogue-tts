self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('dual-dialogue-cache').then(cache => cache.addAll([
      '/',
      '/index.html',
      '/style.css',
      '/main.js',
      '/js/i18n.js',
      '/js/parser.js',
      '/js/voices.js',
      '/js/sfx.js',
      '/js/tts.js',
      '/js/recorder.js'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
