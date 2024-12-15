/// <reference lib="webworker" />
import { setCacheNameDetails } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'

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

// Example: Cache API data (e.g., drug data)
registerRoute(
	({ url }) =>
		url.pathname.startsWith('https://ingeso-backend.onrender.com/drugs'),
	new NetworkFirst({
		cacheName: 'api-drugs-cache',
		plugins: [
			// Add plugins here if needed, like expiration or request integrity
		],
	})
)

// Example: Cache static assets
registerRoute(
	({ request }) =>
		request.destination === 'script' || request.destination === 'style',
	new CacheFirst({
		cacheName: 'static-resources-cache',
	})
)

// Listen for messages from the app (e.g., manual cache updates)
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting()
	}
})
