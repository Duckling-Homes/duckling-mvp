import React, { useState, useRef } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { PhotoDetails } from '@/types/types'
import ModelStore from '@/app/stores/modelStore'
import PhotoCaptureModal from '../Modals/PhotoModal'
import { observer } from 'mobx-react-lite'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import PhotoPickerModal from '../Modals/PhotoPicker'

const AddPhotoButton: React.FC<{
  photoUpdates?: PhotoDetails
}> = observer(({ photoUpdates }) => {
  const [anchorOptions, setAnchorOptions] = useState<null | HTMLElement>(null)
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [openPhotoPicker, setOpenPhotoPicker] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentProject = ModelStore.currentProject

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorOptions(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorOptions(null)
  }

  const filterPhotos = (photos: PhotoDetails[]) => {
    return photos.filter((image: PhotoDetails) => {
      return !Object.entries(photoUpdates ?? {}).every(([key, value]) => {
        const property = key as keyof PhotoDetails
        return image[property] === value
      })
    })
  }

  const handleFinishSelect = async (selectedPhotos: Set<string>) => {
    if (currentProject) {
      const updatePromises = Array.from(selectedPhotos).map(
        (imageId: string) => {
          return ModelStore.patchPhotoDetails(currentProject.id!, {
            ...photoUpdates,
            id: imageId,
          })
        }
      )

      await Promise.all(updatePromises)
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file && currentProject) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onloadend = async () => {
        const photoUrl = reader.result as string
        await ModelStore.createPhotoEntry(currentProject.id!, photoUrl, {
          ...photoUpdates,
        })
        setIsUploading(false)
      }

      reader.onerror = () => {
        console.error('There was an error reading the file!')
        setIsUploading(false)
        reader.abort()
      }

      reader.readAsDataURL(file)
    }
    handleClose()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
    handleClose()
  }

  const buttonWidth = buttonRef.current?.clientWidth

  return (
    <>
      {currentProject && (
        <PhotoCaptureModal
          open={openCamera}
          project={currentProject}
          onClose={() => {
            setOpenCamera(false)
            handleClose()
          }}
          photo={photoUpdates}
        />
      )}
      {photoUpdates && (
        <PhotoPickerModal
          open={openPhotoPicker}
          onClose={() => {
            setOpenPhotoPicker(false)
            handleClose()
          }}
          filterPhotos={filterPhotos}
          handleFinishSelect={handleFinishSelect}
        />
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <Button
        variant="contained"
        startIcon={<CameraAltOutlinedIcon />}
        onClick={handleClick}
        ref={buttonRef}
        disabled={isUploading}
        style={{
          minWidth: '200px',
        }}
      >
        Add Photo
      </Button>
      <Menu
        anchorEl={anchorOptions}
        open={Boolean(anchorOptions)}
        onClose={handleClose}
        sx={{
          '.MuiPaper-root': {
            minWidth: buttonWidth,
          },
        }}
      >
        <MenuItem onClick={() => setOpenCamera(true)}>Take new photo</MenuItem>
        <MenuItem onClick={handleUploadClick}>Upload from device</MenuItem>
        {photoUpdates && (
          <MenuItem onClick={() => setOpenPhotoPicker(true)}>
            Choose from project
          </MenuItem>
        )}
      </Menu>
    </>
  )
})

export default AddPhotoButton
