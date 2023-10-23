/// <reference lib="webworker" />
import { WorkboxPlugin } from 'workbox-core';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly, NetworkFirst } from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {BackgroundSyncPlugin, Queue} from 'workbox-background-sync';

console.log("CUSTOM WORKER REGISTERED");
declare var self: ServiceWorkerGlobalScope;


// Implement communication
self.addEventListener('message', (event) => {
  console.log("Got Message", event);
  if (event.data.type === "") {
  }
});

// Handle images:
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image'
}, new StaleWhileRevalidate({
  cacheName: 'images'
}));
registerRoute(imageRoute);