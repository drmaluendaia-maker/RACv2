self.addEventListener('push', event => {
    const data = event.data.json();
    let body = data.body;
    // --- ACTUALIZADO: Lógica de notificación para 5 niveles ---
    if (data.level === 'rojo' || data.level === 'naranja' || data.isEmergency) {
        body = `¡URGENTE! ${data.body}`;
    }
    const options = {
        body: body,
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [300, 100, 400]
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientsArr => {
            const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url.includes('/medico.html') ? (windowClient.focus(), true) : false);
            if (!hadWindowToFocus) clients.openWindow('/medico.html').then(windowClient => windowClient ? windowClient.focus() : null);
        })
    );
});

