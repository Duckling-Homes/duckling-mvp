import { Close } from '@mui/icons-material'
import { IconButton, Modal } from '@mui/material'
import { PhotoDetails, Project } from '@/types/types'
import { useState } from 'react'
import PhotoCapture from './PhotoForms/PhotoCapture'
import PhotoForm from './PhotoForms/PhotoForm'
import { useEffect } from "react";

const PhotoCaptureModal: React.FC<{
  open: boolean
  onClose: () => void
  project: Project
  photo?: PhotoDetails
}> = ({ open, onClose, project, photo }) => {
  const [currentPhoto, setCurrentPhoto] = useState<PhotoDetails>(photo ?? {})
  const handleOnClose = () => {
    setCurrentPhoto({})
    onClose()
  }

  useEffect(() => {
    setCurrentPhoto(prevPhoto => ({
      ...prevPhoto,
      ...(photo ?? {})
    }));
  }, [photo]);

  function handlePhotoChange(valuesToSet: {
    [key: string]: string | number | boolean | undefined
  }) {
    if (currentPhoto) {
      const updatedValues = Object.fromEntries(
        Object.entries(valuesToSet).map(([key, value]) => [
          key,
          value === undefined ? null : value,
        ])
      );
      const updatedPhoto = { ...currentPhoto, ...updatedValues }
      setCurrentPhoto(JSON.parse(JSON.stringify(updatedPhoto)))
    }
  }

  return (
    <Modal
      open={open}
      className="createModal"
      onClose={handleOnClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="createModal__content"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="createModal__header">
          <IconButton
            sx={{
              borderRadius: '4px',
              border: '1px solid #2196F3',
              backgroundColor: '#2196F3',
              color: '#fff',
              padding: '4px 10px',
              position: 'absolute',
              top: '15px',
              right: '15px',
              zIndex: 2,
            }}
            onClick={handleOnClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          {!currentPhoto.photoUrl && (
            <PhotoCapture
              project={project}
              onChange={handlePhotoChange}
              photo={currentPhoto}
            ></PhotoCapture>
          )}
          {currentPhoto.photoUrl && (
            <PhotoForm
              onClose={handleOnClose}
              currentPhoto={currentPhoto}
              setCurrentPhoto={setCurrentPhoto}
              project={project}
              onChange={handlePhotoChange}
            ></PhotoForm>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PhotoCaptureModal
