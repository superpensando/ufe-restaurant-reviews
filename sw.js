let cacheStaticName = 'restaurant-offline-v1';

const cacheResources =[
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/leaflet.js',
    '/data/restaurants.json',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/js/sw_r.js',
    '/js/main.js',  
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
]

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheStaticName).then(function(cache) {
			return cache.addAll(cacheResources);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != cacheStaticName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
		})
	);
});

