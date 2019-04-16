self.addEventListener(`install`, (evt) => {
  const openCache = caches.open(`STATIC_V1.0`).then((cache) => {
    return cache.addAll([
      `/`,
      `/index.html`,
      `/bundle.js`,
      `../css/main.css`,
      `../css/normalize.css`,
      `../css`
    ]);
  });
  evt.waitUntil(openCache);
});


self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches
      .match(evt.request)
      .then((response) => response ? response : fetch(evt.request))
  );
});
