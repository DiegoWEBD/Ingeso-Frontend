/// <reference lib="webworker" />
import { setCacheNameDetails } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { NetworkFirst } from 'workbox-strategies'
import { registerRoute } from 'workbox-routing'

declare const self: ServiceWorkerGlobalScope

// Set custom cache names
setCacheNameDetails({
	prefix: 'my-app',
	suffix: 'v1',
	precache: 'precache',
	runtime: 'runtime',
})

// Precache and route assets
precacheAndRoute(self.__WB_MANIFEST || [])

// Take control of uncontrolled clients as soon as the service worker is active
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim())
})

// Optional: Skip waiting phase
self.addEventListener('install', (event) => {
	event.waitUntil(self.skipWaiting())
})

registerRoute(
	({ url }) =>
		url.pathname.startsWith('https://ingeso-backend.onrender.com/drugs'),
	new NetworkFirst({
		cacheName: 'api-drugs-cache',
	})
)

// Example: Cache API data (e.g., drug data)
self.addEventListener('fetch', (event) => {
	const fetchEvent = event as FetchEvent
	fetchEvent.respondWith(
		(async function () {
			const cache = await caches.open('my-app-cache')
			const cachedResponse = await cache.match(fetchEvent.request)

			if (cachedResponse !== undefined) return cachedResponse
			return fetch(event.request)
		})()
	)
})
