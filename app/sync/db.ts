// Dexie (IndexedDB wrapper module declaration)
// Table definitions
import Dexie, { Table } from 'dexie'
import debounce from 'lodash/debounce'
import { isOnline } from './utils'

export interface _Object {
  id: string
  type: string
  json: unknown
  added?: number
}

export interface _Request {
  id?: number
  url: string
  options?: RequestInit
  added: number
}

export class DucklingDexie extends Dexie {
  objects!: Table<_Object, string>
  requests!: Table<_Request, number>
  onNewChanges?: () => void

  constructor() {
    super('DucklingDexie')
    this.version(1).stores({
      objects: 'id, type',
      requests: '++id, added',
    })
  }

  putObject = async (obj: _Object) => {
    obj.added = Date.now()
    obj.json = JSON.parse(JSON.stringify(obj.json))
    return this.objects.put(obj, obj.id)
  }

  removeObject = async (objID: string) => {
    return this.objects.delete(objID)
  }

  enqueueRequest = async (url: string, options?: RequestInit) => {
    const req = {
      url,
      options,
      added: Date.now(),
    }
    return this.requests.put(req)
  }

  peekNextRequest = async () => {
    return this.requests.orderBy('added').first()
  }

  dequeueRequest = async (reqID: number) => {
    return this.requests.delete(reqID)
  }

  publicDeDupedChanges = debounce(async () => {
    if (!isOnline()) return false
    const allChanges = await db.requests.orderBy('added').toArray()

    const changesByURL: Map<string, _Request> = new Map()

    allChanges.forEach((curr) => {
      const key = curr.options?.method + curr.url
      changesByURL.set(key, curr)
    })

    const changes = Array.from(changesByURL.values())

    for (const change of changes) {
      try {
        await fetch(change.url, change.options)
      } catch (err) {
        console.error('==== REQUEST FAILED TO PUSH...', { change, err })
      }
    }

    for (const change of allChanges) {
      await db.dequeueRequest(change.id!)
    }

    return true
  }, 200)

  publishChanges = debounce(async () => {
    if (!isOnline()) return false

    let nextReq
    let didChange = false
    do {
      try {
        nextReq = await db.peekNextRequest()
        if (nextReq) {
          await fetch(nextReq!.url, nextReq!.options)
          await db.dequeueRequest(nextReq.id!)
          console.log(
            'Dequeued',
            nextReq.options?.method,
            nextReq.url,
            nextReq.id
          )
          didChange = true
        }
      } catch (err) {
        console.error('REQUEST FAILED TO PUSH...', { nextReq, err })
      }
    } while (nextReq)

    if (didChange) {
      this.onNewChanges && this.onNewChanges()
    }

    return didChange
  }, 200)
}

export const db = new DucklingDexie()
