import { db } from './db'

export const isOnline = () => {
  return navigator?.onLine
}

export const synchronizedFetch = async (url: string, options?: RequestInit) => {
  await db.publishChanges()
  return fetch(url, options)
}
