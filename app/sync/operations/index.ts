import { SyncAPI } from "..";

/** Every mutating operation should use this wrapper! */
export const syncAPImutation = <T extends Array<any>, U> (_op: (...args: T) => U) => {

    const wrapperThatAlwaysPushesChanges = async (...args: T) => {
        const result = await _op(...args);
        SyncAPI.pushChanges();
        return result;
    }

    return wrapperThatAlwaysPushesChanges;
}