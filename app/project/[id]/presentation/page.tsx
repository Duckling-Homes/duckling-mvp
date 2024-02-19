'use client'

import { useEffect, useState } from 'react'
import ModelStore from '@/app/stores/modelStore'
import { Organization, PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import TabHolder from './Tabs/TabHolder'
import LinkCopier from './Components/LinkCopier'
import './style.scss'
import { useUser } from '@clerk/nextjs'

const Presentation = observer(() => {
  const { user } = useUser()
  const [photos, setPhotos] = useState<PhotoDetails[]>([])
  const project = ModelStore.currentProject as Project
  const organization = ModelStore.organization as Organization

  const baseUrl = `${window.location.protocol}//${window.location.host}`

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

  return (
    <>
      <TabHolder
        project={project}
        photos={photos}
        organization={organization}
      ></TabHolder>
      <div className="summary">
        <div className="summary__header">
          <LinkCopier
            link={`${baseUrl}/presentation/${user?.publicMetadata?.organization_id}/projects/${project.id}`}
          ></LinkCopier>
        </div>
      </div>
    </>
  )
})

export default Presentation
