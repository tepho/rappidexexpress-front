import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST || []);
// Clean up old cache
cleanupOutdatedCaches();

// Install and activate service worker
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('push', function(event) {
    const body = event.data?.text() ?? ''
    event.waitUntil(
        self.registration.showNotification('Rappidex Express', {
            body
        })
    )
})