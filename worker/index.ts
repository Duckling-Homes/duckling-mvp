console.log("CUSTOM WORKER REGISTERED")
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

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


// --------- GLOBALS ------------
const globalContextRoute = new Route(({ request}) => {
    console.log("HIT A MATCH FOR ALL PROJECTS");
    return (request.method === 'GET' && request.url.endsWith('/api/projects/'))
},
    new StaleWhileRevalidate({
        cacheName: 'globalContext'
    })
);

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);
registerRoute(globalContextRoute);