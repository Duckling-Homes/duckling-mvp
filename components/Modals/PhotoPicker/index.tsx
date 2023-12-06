import { Close } from '@mui/icons-material'
import { Button, IconButton, Modal } from '@mui/material'
import { PhotoDetails } from '@/types/types'
import { useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ModelStore from '@/app/stores/modelStore'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const PhotoPickerModal: React.FC<{
  open: boolean
  onClose: () => void
  photoUpdates: PhotoDetails
}> = ({ open, onClose, photoUpdates }) => {
  const [photos, setPhotos] = useState<PhotoDetails[]>([])
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set())
  const currentProject = ModelStore.currentProject

  useEffect(() => {
    if (!currentProject) return

    if (currentProject?.images && currentProject.images.length > 0) {
      const filteredImages = currentProject.images.filter(
        (image: PhotoDetails) => {
          return !Object.entries(photoUpdates).every(([key, value]) => {
            const property = key as keyof PhotoDetails
            return image[property] === value
          })
        }
      )
      const downloadPromises = filteredImages.map((image: PhotoDetails) => {
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
    } else if (currentProject.images?.length === 0) {
      setPhotos([])
    }
  }, [currentProject?.images?.length])

  const handlePhotoClick = async (photoId: string) => {
    const newSelectedPhotos = new Set(selectedPhotos)
    if (newSelectedPhotos.has(photoId)) {
      newSelectedPhotos.delete(photoId)
    } else {
      newSelectedPhotos.add(photoId)
    }
    setSelectedPhotos(newSelectedPhotos)
  }

  const exitModal = () => {
    setSelectedPhotos(new Set())
    onClose()
  }

  const handleFinishSelect = () => {
    if (currentProject) {
      const updatePromises = Array.from(selectedPhotos).map(
        (imageId: string) => {
          return ModelStore.patchPhotoDetails(currentProject.id!, {
            ...photoUpdates,
            id: imageId,
          })
        }
      )

      Promise.all(updatePromises)
    }
    exitModal()
  }

  return (
    <Modal
      open={open}
      className="createModal"
      onClose={exitModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="createModal__content">
        <div className="createModal__header">
          <p>Select Photos</p>
          <IconButton
            sx={{
              borderRadius: '4px',
              border: '1px solid #2196F3',
              color: '#2196F3',
              padding: '4px 10px',
            }}
            onClick={exitModal}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </div>
        <form
          className="createModal__form"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
        >
          {photos.length === 0 && <p>No additional photos to select</p>}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '10px',
              columnGap: '10px',
              padding: '32px',
            }}
          >
            {photos.map((image, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  backgroundColor: 'white',
                  borderRadius: '0px',
                  overflow: 'hidden',
                }}
              >
                <Button onClick={() => handlePhotoClick(image.id!)}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={image.photoUrl}
                      alt={`Image ${i + 1}`}
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        border: selectedPhotos.has(image.id!)
                          ? '3px solid limegreen'
                          : '3px solid transparent',
                      }}
                    />
                    {selectedPhotos.has(image.id!) ? (
                      <CheckIcon
                        style={{
                          position: 'absolute',
                          bottom: '15px',
                          right: '15px',
                          fontSize: '24px',
                          minWidth: '0',
                          padding: '6px',
                          lineHeight: '1',
                          backgroundColor: 'limegreen',
                          borderRadius: '50%',
                        }}
                      />
                    ) : (
                      <AddCircleOutlineIcon
                        style={{
                          position: 'absolute',
                          bottom: '15px',
                          right: '15px',
                          fontSize: '24px',
                          minWidth: '0',
                          padding: '6px',
                          lineHeight: '1',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </form>
        <div className="createModal__footer">
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleFinishSelect}
            size="small"
            sx={{
              marginLeft: 'auto',
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default PhotoPickerModal
