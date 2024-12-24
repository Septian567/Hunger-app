import "regenerator-runtime";
import CacheHelper from "./utils/1cache-helper";

// Daftar asset yang akan dicaching
const assetsToCache = [
  "./",
  "./icons/24x24.png",
  "./icons/32x32.png",
  "./icons/64x64.png",
  "./icons/128-128.png",
  "./icons/256x256.png",
  "./icons/512x512.png",
  "./index.html",
  "./favicon.ico",
  "./app.bundle.js",
  "./webmanifest",
  "./sw.bundle.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
