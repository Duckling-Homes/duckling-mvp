import { PhotoDetails } from '@/types/types'

export function defaultPhotoFilter(filterCriteria: { [key: string]: string }) {
  const filterFunc = (photos: PhotoDetails[]) => {
    return photos.filter((image: PhotoDetails) =>
      Object.entries(filterCriteria).every(
        ([key, value]) => image[key as keyof PhotoDetails] === value
      )
    )
  }

  return filterFunc
}
