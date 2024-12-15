self.addEventListener('install', (event) => {
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim())
})

// Cache API responses for drugs data
self.addEventListener('fetch-drugs', (event) => {
	const url = 'https://ingeso-backend.onrender.com/drugs' // Replace with your API endpoint

	if (event.request.url.startsWith(url)) {
		event.respondWith(
			caches.open('drugs-data-cache').then(async (cache) => {
				const cachedResponse = await cache.match(event.request)
				if (cachedResponse) {
					// Serve from cache
					return cachedResponse
				}
				// Fetch from network and cache it
				const networkResponse = await fetch(event.request)
				cache.put(event.request, networkResponse.clone())
				return networkResponse
			})
		)
	}
})
