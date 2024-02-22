import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener('push', function(event) {
    const body = event.data?.text() ?? ''
    event.waitUntil(
        self.registration.showNotification('Rappidex Express', {
            body
        })
    )
})