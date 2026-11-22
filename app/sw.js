/* Arcani: funziona anche senza rete dopo la prima apertura.
   Pagine e codice: prima la rete (così gli aggiornamenti arrivano subito), poi la copia salvata.
   Immagini e caratteri: prima la copia salvata. Cambiare VERSION a ogni pubblicazione. */
var VERSION = 'arcani-v4';
var PRECACHE = [
 "./",
 "index.html",
 "app.css?v=4",
 "app.js?v=4",
 "data.js?v=3",
 "manifest.webmanifest",
 "icons/icon-192.png",
 "icons/apple-180.png",
 "../fonts/cinzel-latin-400-normal.woff2",
 "../fonts/cinzel-latin-500-normal.woff2",
 "../fonts/cormorant-garamond-latin-400-normal.woff2",
 "../fonts/cormorant-garamond-latin-500-normal.woff2",
 "../fonts/cormorant-garamond-latin-400-italic.woff2",
 "../fonts/montserrat-latin-400-normal.woff2",
 "../fonts/montserrat-latin-500-normal.woff2",
 "img/01-s.webp",
 "img/02-s.webp",
 "img/03-s.webp",
 "img/04-s.webp",
 "img/05-s.webp",
 "img/06-s.webp",
 "img/07-s.webp",
 "img/08-s.webp",
 "img/09-s.webp",
 "img/10-s.webp",
 "img/11-s.webp",
 "img/12-s.webp",
 "img/13-s.webp",
 "img/14-s.webp",
 "img/15-s.webp",
 "img/16-s.webp",
 "img/17-s.webp",
 "img/18-s.webp",
 "img/19-s.webp",
 "img/20-s.webp",
 "img/21-s.webp",
 "img/22-s.webp"
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(PRECACHE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('arcani-') === 0 && k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  var isAsset = /\.(webp|png|jpe?g|woff2)(\?|$)/.test(req.url);
  if (isAsset) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
        return res;
      });
    }));
    return;
  }
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(function (hit) { return hit || caches.match('index.html'); });
  }));
});
