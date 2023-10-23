import { db } from './db';
import debounce from 'lodash/debounce';

export const isOnline = () => {
    return navigator?.onLine;
};

export const publishChanges = debounce(async () => {
    if (!isOnline()) return;

    let nextReq;
    do {
        try {
            nextReq = await db.peekNextRequest();
            if (nextReq) {
                await fetch(nextReq!.url, nextReq!.options);
                await db.dequeueRequest(nextReq.id!);
                console.log("Dequeued", nextReq.options?.method, nextReq.url, nextReq.id);
            }
        } catch (err) {
            console.error("REQUEST FAILED TO PUSH...", { nextReq, err });
        }
    } while (nextReq);
}, 200);

export const synchronizedFetch = async (url: string, options?: RequestInit) => {
    await publishChanges();
    return fetch(url, options);
};
