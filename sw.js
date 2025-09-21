   // got the help of chatgpt to get my pwd right :)

const CACHE = 'greenbite-v1';
const ASSETS = [
  'index.html','recipes.html','calculator.html','workout.html','mindfulness.html','contact.html',
  'css/styles.css','js/utils.js','js/main.js','js/recipes.js','js/calculator.js','js/workout.js','js/mindfulness.js','js/contact.js',
  'data/recipes.js','data/workouts.js',
  'assets/icon-192.png','assets/icon-512.png','assets/favicon.ico','manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE && caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('index.html')))
  );
});
