'use client'

import ModelStore from '@/app/stores/modelStore'
import { Organization, PhotoDetails, Project } from '@/types/types'
import { useUser } from '@clerk/nextjs'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import LinkCopier from './Components/LinkCopier'
import TabHolder from './Tabs/TabHolder'
import './style.scss'
import { Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { PrintHidden } from '@/components/Print/PrintHidden'

interface PresentationProps {
  changeBack: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Presentation: React.FC<PresentationProps> = observer(({ changeBack }) => {
  const { user } = useUser()
  const [photos, setPhotos] = useState<PhotoDetails[]>([])
  const project = ModelStore.currentProject as Project
  const organization = ModelStore.organization as Organization
  const [, setTab] = useState<string>('Home Summary')

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
      <PrintHidden>
        <div className="section">
          <div className="section__row">
            <Button
              startIcon={<ArrowBack />}
              variant="contained"
              color="warning"
              size="small"
              onClick={changeBack}
            >
              Go back
            </Button>
            <LinkCopier
              link={`${baseUrl}/presentation/${user?.publicMetadata?.organization_id}/projects/${project.id}`}
            ></LinkCopier>
          </div>
        </div>
      </PrintHidden>
    </>
  )
})

export default Presentation
