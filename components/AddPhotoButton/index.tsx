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

    const buttonRef = useRef<HTMLButtonElement>(null)
    const currentProject = ModelStore.currentProject

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorOptions(event.currentTarget)
    }
    
    const handleClose = () => {
      setAnchorOptions(null)
    }

    const buttonWidth = buttonRef.current?.clientWidth


  return (
    <>
      {currentProject && <PhotoCaptureModal
        open={openCamera}
        project={currentProject}
        onClose={() => {
            setOpenCamera(false)
            handleClose()
        }}
        photo={{}}
      />}
      {photoUpdates && <PhotoPickerModal
        open={openPhotoPicker}
        onClose={() => {
            setOpenPhotoPicker(false)
            handleClose()
        }}
        photoUpdates={photoUpdates}
      />}
      <Button
        variant="contained"
        startIcon={<CameraAltOutlinedIcon />}
        onClick={handleClick}
        ref={buttonRef}
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
        <MenuItem 
          onClick={() => setOpenCamera(true)}
        >
          Take new photo
        </MenuItem>
        <MenuItem onClick={handleClose}>Upload from device</MenuItem>
        {photoUpdates && <MenuItem
          onClick={() => setOpenPhotoPicker(true)}
        >
          Choose from project
        </MenuItem>}
      </Menu>
    </>
  )
})

export default AddPhotoButton
