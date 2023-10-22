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


const API_ROUTE_REGEX = /\/api\/.*\/*./;

// // Offline Caching  - require server response served back with X-Is-Cacheable: 'true'
// // TODO: Add expiry?
// registerRoute(
//   API_ROUTE_REGEX,
//   new NetworkFirst({
//     cacheName: 'api-cache',
//     plugins: [
//       new CacheableResponsePlugin({
//         headers: {
//           'X-Is-Cacheable': 'true',
//         },
//       })
//     ],
//   }),
//   'GET'
// );

// Simple background sync

// const bgSyncPlugin = new BackgroundSyncPlugin('pendingUpdates', {
//   onSync: ({queue}) => {
//     return queue.replayRequests()
//     .then(() => {
//       console.log("DID replay requests");
//     });
//   },
//   maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
// });

// const statusPlugin : WorkboxPlugin = {
//   fetchDidSucceed: async ({response}) => {
//     if (response.status >= 500) {
//       // Throwing anything here will trigger fetchDidFail.
//       console.log("ServiceWorker Plugin: Got an error from server");
//       throw new Error('Status Plugin: Server error.');
//     }
//     // If it's not 5xx, use the response as-is.
//     return response;
//   },
// };

// registerRoute(
//   API_ROUTE_REGEX,
//   new NetworkOnly({
//     plugins: [bgSyncPlugin, statusPlugin]
//   }),
//   'POST'
// );

// registerRoute(
//   API_ROUTE_REGEX,
//   new NetworkOnly({
//     plugins: [bgSyncPlugin, statusPlugin]
//   }),
//   'PATCH'
// );

// registerRoute(
//   API_ROUTE_REGEX,
//   new NetworkOnly({
//     plugins: [bgSyncPlugin, statusPlugin]
//   }),
//   'DELETE'
// );