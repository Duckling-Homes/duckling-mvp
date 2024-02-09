'use client'

import ProjectDetails from '@/app/project/[id]/Tabs/ProjectDetailsView'
import TabHolder from '@/app/project/[id]/presentation/Tabs/TabHolder'
import ModelStore from '@/app/stores/modelStore'
import { Container } from '@/components/Container'
import { PhotoDetails, PresentationDetails } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import './style.scss'

const ShareablePresentation = observer(() => {
  const { orgId, id } = useParams()
  const [photos, setPhotos] = useState<PhotoDetails[]>([])

  const currentPresentation =
    ModelStore.currentPresentation as PresentationDetails

  useEffect(() => {
    if (typeof orgId === 'string' && typeof id == 'string') {
      ModelStore.setCurrentPresentation(orgId, id)
    }

    return () => {
      ModelStore.clearCurrentPresentation()
    }
  }, [orgId, id])

  useEffect(() => {
    if (
      currentPresentation?.projectDetails?.images &&
      currentPresentation?.projectDetails?.images?.length > 0 &&
      typeof orgId === 'string' &&
      typeof id == 'string'
    ) {
      const downloadPromises = currentPresentation.projectDetails.images.map(
        (image: PhotoDetails) => {
          return ModelStore.unauthedDownloadPhotoForProject(
            orgId,
            id,
            image.id!
          ).then((response) => {
            return { ...image, photoUrl: response }
          })
        }
      )

      Promise.all(downloadPromises)
        .then((photos) => {
          setPhotos(photos)
        })
        .catch((error) => {
          console.error('Failed to download photos:', error)
        })
    }
  }, [currentPresentation?.projectDetails.images?.length])

  const getHeroImage = () => {
    if (!currentPresentation?.projectDetails?.heroImageId) {
      return {}
    }
    if (photos.length == 0) {
      return {}
    }

    return (
      photos.find(
        (photo) => photo.id === currentPresentation.projectDetails.heroImageId
      ) || {}
    )
  }

  return (
    <>
      {currentPresentation && (
        <Container
          publicRoute={true}
          orgName={currentPresentation.organization?.name}
        >
          <div className="dataCollection">
            <div className="dataCollection__header">
              <ProjectDetails
                project={currentPresentation.projectDetails}
                heroPhoto={getHeroImage()}
              ></ProjectDetails>
            </div>
          </div>
          <TabHolder
            project={currentPresentation.projectDetails}
            organization={currentPresentation.organization}
            photos={photos}
          ></TabHolder>
        </Container>
      )}
    </>
  )
})

export default ShareablePresentation
