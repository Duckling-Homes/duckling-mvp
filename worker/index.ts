console.log("CUSTOM WORKER REGISTERED")
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

// Handle images:
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image'
}, new StaleWhileRevalidate({
  cacheName: 'images'
}));

// Handle scripts:
const scriptsRoute = new Route(({ request }) => {
  return request.destination === 'script';
}, new CacheFirst({
  cacheName: 'scripts'
}));

// Handle styles:
const stylesRoute = new Route(({ request }) => {
  return request.destination === 'style';
}, new CacheFirst({
  cacheName: 'styles'
}));

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);

// Offline Caching  - require server response served back with X-Is-Cacheable: 'true'
// TODO: Add expiry?
registerRoute(
  ({url, request}) => request.method === 'GET' && url.pathname.startsWith('/api'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        headers: {
          'X-Is-Cacheable': 'true',
        },
      })
    ],
  })
);