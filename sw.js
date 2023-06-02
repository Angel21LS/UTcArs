const STATIC_CACHE  = "static";

const APP_SHELL =[
    "/",
    "index.html"
];

self.addEventListener("install", (e) => {
    console.log("entrando a instalar");
    const cacheStatic = caches
                        .open(STATIC_CACHE)
                        .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e)=>{
    console.log("fectch!", e.request);

    e.respondWith(
        caches
                .match(e.request)
                .then(res => res || fetch(e.request))
                .catch(console.log)
    );
});