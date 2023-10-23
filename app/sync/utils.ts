import { db } from './db';
import debounce from 'lodash/debounce';

export const isOnline = () => {
    return navigator?.onLine;
};

// Returns true/false indicating if new changes published
export const publishChanges = debounce(async () => {
    if (!isOnline()) return false;

    let nextReq;
    let didChange = false;
    do {
        try {
            nextReq = await db.peekNextRequest();
            if (nextReq) {
                await fetch(nextReq!.url, nextReq!.options);
                await db.dequeueRequest(nextReq.id!);
                console.log("Dequeued", nextReq.options?.method, nextReq.url, nextReq.id);
                didChange = true;
            }
        } catch (err) {
            console.error("REQUEST FAILED TO PUSH...", { nextReq, err });
        }
    } while (nextReq);
    return didChange;
}, 200);

export const synchronizedFetch = async (url: string, options?: RequestInit) => {
    await publishChanges();
    return fetch(url, options);
};
