import { db } from './db'

export const isOnline = () => {
  return navigator?.onLine
}

export const synchronizedFetch = async (url: string, options?: RequestInit) => {
  await db.publicDeDupedChanges()
  return fetch(url, options)
}
