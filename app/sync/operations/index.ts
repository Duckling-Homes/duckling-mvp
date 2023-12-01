import { SyncAPI } from "..";

/** Every mutating operation should use this wrapper! */
// @ts-expect-error es-lint doesnt accept any so this is my workaround 
export const syncAPImutation = <TArgs extends Array<T> , U> (_op: (...args: TArgs) => U) => {

    const wrapperThatAlwaysPushesChanges = async (...args: TArgs) => {
        const result = await _op(...args);
        SyncAPI.pushChanges();
        return result;
    }

    return wrapperThatAlwaysPushesChanges;
}