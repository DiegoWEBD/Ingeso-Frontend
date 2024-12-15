export {}

declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', (_) => {
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim())
})

// Cache API responses for drugs data
self.addEventListener('fetch-drugs', (event) => {
	const fetchEvent = event as FetchEvent
	const url = 'https://ingeso-backend.onrender.com/drugs' // Replace with your API endpoint

	if (fetchEvent.request.url.startsWith(url)) {
		fetchEvent.respondWith(
			caches.open('drugs-data-cache').then(async (cache) => {
				const cachedResponse = await cache.match(fetchEvent.request)
				if (cachedResponse) {
					// Serve from cache
					return cachedResponse
				}
				// Fetch from network and cache it
				const networkResponse = await fetch(fetchEvent.request)
				cache.put(fetchEvent.request, networkResponse.clone())
				return networkResponse
			})
		)
	}
})
