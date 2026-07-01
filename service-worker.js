const CACHE='finger-flick-soccer-v17-goal-scoring-fix';
const ASSETS=[
 './','./index.html','./manifest.webmanifest',
 './assets/classic_board.png','./assets/city_board.png','./assets/ball.png',
 './assets/icon-192.png','./assets/icon-512.png'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>caches.match('./index.html'))));
});
