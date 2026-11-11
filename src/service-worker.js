import { build, files, prerendered, version } from '$service-worker'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

const precache_list = [...build, ...files, ...prerendered].filter(
	s => s.split('/').reverse()[0] !== '.nojekyll'
).map((s) => ({
	url: s,
	revision: version,
}))

// Activate new deploys immediately instead of waiting for every open tab /
// installed-app window to close; otherwise users keep seeing stale data
// (e.g. old conference memberships) indefinitely.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

// cleanupOutdatedCaches()
precacheAndRoute(precache_list)

// Cache images with the StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images-cache',
  })
);
