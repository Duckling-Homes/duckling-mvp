'use client'

import ModelStore from '@/app/stores/modelStore'
import { Organization, PhotoDetails, Project } from '@/types/types'
import { useUser } from '@clerk/nextjs'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import LinkCopier from './Components/LinkCopier'
import { Signature } from './Components/Signature'
import TabHolder from './Tabs/TabHolder'
import './style.scss'

const Presentation = observer(() => {
  const { user } = useUser()
  const [photos, setPhotos] = useState<PhotoDetails[]>([])
  const project = ModelStore.currentProject as Project
  const organization = ModelStore.organization as Organization
  const [tab, setTab] = useState<string>('Home Summary')

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
        onTabChange={setTab}
      ></TabHolder>
      <div>
        {/* Signature is here instead of PlansPresentation because something about how that component is rendered makes this impossible to use there... to investigate */}
        {tab === 'Plans' && process.env["SIGNATURES"] &&  <Signature signatureID={project.id!} />}
      </div>
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
