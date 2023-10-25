import debounce from 'lodash/debounce'
import { _Request, db } from './db'

export const isOnline = () => {
  return navigator?.onLine
}

export const publishChanges = debounce(async () => {
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
      console.log(
        '==== Publishing',
        change.options?.method,
        change.url,
        change.id,
        JSON.parse(change.options?.body?.toString() || '{}')
      )
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

export const synchronizedFetch = async (url: string, options?: RequestInit) => {
  await publishChanges()
  return fetch(url, options)
}
