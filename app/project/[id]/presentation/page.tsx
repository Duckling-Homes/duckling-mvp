'use client'

import { useEffect, useState } from 'react'
import ModelStore from '@/app/stores/modelStore'
import { PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import TabHolder from './Tabs/TabHolder'

const Presentation = observer(() => {
  const [photos, setPhotos] = useState<PhotoDetails[]>([])
  const project = ModelStore.currentProject as Project

  useEffect(() => {
    if (project.images && project.images.length > 0) {
      const downloadPromises = project.images.map((image: PhotoDetails) => {
        return ModelStore.downloadPhoto(image.id!).then((response) => {
          return { ...image, photoUrl: response }
        })
      })

      Promise.all(downloadPromises)
        .then((photos) => {
          setPhotos(photos)
        })
        .catch((error) => {
          console.error('Failed to download photos:', error)
        })
    }
  }, [project.images?.length])

  return <TabHolder project={project} photos={photos}></TabHolder>
})

export default Presentation
