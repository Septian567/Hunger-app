if(!self.define){let e,a={};const i=(i,r)=>(i=new URL(i+".js",r).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(a[d])return;let n={};const c=e=>i(e,d),o={module:{uri:d},exports:n,require:c};a[d]=Promise.all(r.map((e=>o[e]||c(e)))).then((e=>(s(...e),n)))}}define(["./workbox-3bd9af45"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"39.bundle.js",revision:"cc95075a1dccee270761d7426c7540c7"},{url:"608.bundle.js",revision:"a2117e7ab4a5c3a55cea81634964e5c2"},{url:"app~9af0ee1e.bundle.js",revision:"2aca04bed5752ba139b045317d8c3249"},{url:"app~a51fa3f5.bundle.js",revision:"7a5fe478ad12d8776a27a26dea76cc23"},{url:"app~a51fa3f5.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app~ca0940c6.bundle.js",revision:"fea543beac77290cdde8897a541301d9"},{url:"app~ca0940c6.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"favicon.ico",revision:"88f49576d1bdfac5ca799d444d0fc25a"},{url:"icons/128x128.png",revision:"3693b99c806a11c5814f7b2f68a68b58"},{url:"icons/24x24.png",revision:"bf49511638024c957c0d87f0ced1fc68"},{url:"icons/256x256.png",revision:"1f9f30052fc89efcaf51e0feeb967b54"},{url:"icons/32x32.png",revision:"cf69a256780dda92ac645703d4dd5d81"},{url:"icons/512x512.png",revision:"88f49576d1bdfac5ca799d444d0fc25a"},{url:"icons/64x64.png",revision:"a4d79d7e10baa0f6f8e796ee7bcc0e93"},{url:"images/heros/hero-image_4-large.jpg",revision:"ad37d938d2cf3b095e6bfd21de274612"},{url:"images/heros/hero-image_4-medium.jpg",revision:"fff38be55a0018f4ea802d55d0a95934"},{url:"images/heros/hero-image_4-small.jpg",revision:"529fc044352d0e2e6a050f8ab2d557a5"},{url:"images/heros/hero-image_4.jpg",revision:"4ea98fe648a0b853ab379c928b5fd0bf"},{url:"index.html",revision:"65d291866d5bba74fc46565df005c97e"},{url:"manifest.json",revision:"408e309baa38acbea5448cd2401eaa23"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/")),new e.StaleWhileRevalidate({cacheName:"restoran-api",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/images/medium/")),new e.StaleWhileRevalidate({cacheName:"restoran-image-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
