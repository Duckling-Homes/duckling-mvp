// Dexie (IndexedDB wrapper module declaration)
import Dexie, { Table } from 'dexie';

export interface _Object {
    id: string;
    type: string;
    json: unknown;
}

export interface _Request {
  id?: number;
  params: {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    headers: unknown,
    body: string,
  }
  added: number;
  processed: boolean;
}

export class DucklingDexie extends Dexie {
    objects!: Table<_Object, string>
    requests!: Table<_Request, number>

    constructor() {
        super('DucklingDexie');
        this.version(1).stores({
            objects: 'id, type',
            requests: '++id, added, processed'
        })
    }

    putObject = async (obj: _Object) => {
        return this.objects.put(obj, obj.id);
    }

    removeObject = async (objID: string) => {
        return this.objects.delete(objID);
    }

    enqueueRequest = async (req: _Request) => {
        return this.requests.put(req);
    }

    peekNextRequest = async () => {
        return this.requests.orderBy('added').first();
    }

    dequeueRequest = async (reqID: number) => {
        return this.requests.delete(reqID);
    }

}

export const db = new DucklingDexie();