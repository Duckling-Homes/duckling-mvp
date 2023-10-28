import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { ProjectRoom, Project, PhotoDetails } from '@/types/types'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import PhotoCaptureModal from '@/components/Modals/PhotoModal'
import ModelStore from '@/app/stores/modelStore'

interface PhotosTabProps {
  currentProject: Project
}

const Photos: React.FC<PhotosTabProps> = ({ currentProject }) => {
  const [rooms, setRooms] = useState<ProjectRoom[]>([])
  const [roomFilter, setRoomFilter] = useState<string>('UNSELECTED')
  const [editPhoto, setEditPhoto] = useState<PhotoDetails>({})
  const [photos, setPhotos] = useState<PhotoDetails[]>([])

  useEffect(() => {
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
  }, [currentProject?.images])

  useEffect(() => {
    if (currentProject && currentProject.rooms) {
      setRooms(currentProject.rooms)
    }
  }, [currentProject])

  const handleDeleteImage = async (imageId: string) => {
    await ModelStore.deletePhoto(currentProject.id!, imageId)
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
      <div>
        <div
          style={{
            display: 'flex',
            padding: '32px',
            gap: '32px',
            justifyContent: 'flex-start',
            width: '300px',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="photo-filter-label">Photos Filter</InputLabel>
            <Select
              labelId="photo-filter-label"
              id="photo-filter-select"
              label="Photos Filter"
              onChange={(e) => {
                setRoomFilter(e.target.value as string)
              }}
              value={roomFilter}
            >
              {[{ id: 'UNSELECTED', name: 'All Rooms' }, ...rooms].map(
                (room, i) => (
                  <MenuItem key={i} value={room.id}>
                    {room.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            padding: '32px',
          }}
        >
          {photos
            .filter(
              (image) =>
                roomFilter == 'UNSELECTED' || image.roomId == roomFilter
            )
            .map((image, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <Button
                  onClick={() => {
                    setEditPhoto(image)
                  }}
                >
                  <img
                    src={image.photoUrl}
                    alt={`Image ${i + 1}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDeleteImage(image.id!)
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    fontSize: '12px',
                    margin: '10px',
                  }}
                >
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Photos
