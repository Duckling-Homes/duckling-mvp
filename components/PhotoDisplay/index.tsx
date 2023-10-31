import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { PhotoDetails, Project } from '@/types/types'
import ModelStore from '@/app/stores/modelStore'
import PhotoCaptureModal from '../Modals/PhotoModal'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { observer } from 'mobx-react-lite'

const PhotoDisplay: React.FC<{
  currentProject: Project
  filterCriteria: { [key: string]: string }
}> = observer(({ currentProject, filterCriteria }) => {
  const [editPhoto, setEditPhoto] = useState<PhotoDetails>({})
  const [photos, setPhotos] = useState<PhotoDetails[]>([])
  const [photoToDelete, setPhotoToDelete] = React.useState<PhotoDetails>({});

  useEffect(() => {
    if (!currentProject) return;

    if (currentProject?.images && currentProject.images.length > 0) {
      const downloadPromises = currentProject.images.map(
        (image: PhotoDetails) => {
          return ModelStore.downloadPhoto(image.id!).then((response) => {
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
    // Images were deleted
    else if (currentProject.images?.length === 0) {
      setPhotos([]);
    }
  }, [currentProject, currentProject?.images])

  const handleOpenDeleteModal = (image: PhotoDetails) => {
    setPhotoToDelete(image);
  };

  const handlCloseDeleteModal = () => {
    setPhotoToDelete({});
  };

  const handleDeleteImage = async (imageId: string) => {
    await ModelStore.deletePhoto(currentProject.id!, imageId)
    setPhotoToDelete({});
  }

  return (
    <>
      {editPhoto.photoUrl && (
        <PhotoCaptureModal
          open={editPhoto.photoUrl}
          project={currentProject}
          onClose={() => setEditPhoto({})}
          photo={editPhoto}
        />
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          padding: '32px',
        }}
      >
        {photos
          .filter((image: PhotoDetails) =>
            Object.entries(filterCriteria).every(
              ([key, value]) => image[key as keyof PhotoDetails] === value
            )
          )
          .map((image, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <Button
                onClick={() => {
                  setEditPhoto(image)
                }}
              >
                <img
                  src={image.photoUrl}
                  alt={`Image ${i + 1}`}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'fill',
                  }}
                />
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleOpenDeleteModal(image)
                }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  fontSize: '12px',
                  minWidth: '0',
                  padding: '6px',
                  lineHeight: '1',
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </div>
          ))}
          <Dialog
            open={!!photoToDelete?.id}
            onClose={handlCloseDeleteModal}
          >
            <DialogTitle>
              Confirm Deletion
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete this image?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDeleteImage(photoToDelete.id!)} color="primary">
                Yes
              </Button>
              <Button onClick={handlCloseDeleteModal} color="primary">
                No
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    </>
  )
})

export default PhotoDisplay
