'use client'

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

  return (
    <>
      {currentPresentation && (
        <Container
          publicRoute={true}
          orgName={currentPresentation.organization?.name}
        >
          <div
            style={{
              paddingBottom: '20px',
            }}
          >
            <TabHolder
              project={currentPresentation.projectDetails}
              organization={currentPresentation.organization}
              photos={photos}
            ></TabHolder>
          </div>
        </Container>
      )}
    </>
  )
})

export default ShareablePresentation
