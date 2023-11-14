'use client'

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Button,
} from '@mui/material'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { PhotoDetails, Project } from '@/types/types'
import ModelStore from '@/app/stores/modelStore'
import { TextInput } from '@/components/Inputs'
import { observer } from 'mobx-react-lite'
import MarkupVisualizer from '../MarkupVisualizer'

interface PhotoFormProps {
  onClose: () => void
  currentPhoto?: PhotoDetails
  setCurrentPhoto: (photo: PhotoDetails) => void
  project: Project
  onChange: (values: {
    [key: string]: string | number | boolean | undefined
  }) => void
}

const PhotoForm: React.FC<PhotoFormProps> = observer(
  ({ onClose, currentPhoto, setCurrentPhoto, project, onChange }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showVisualizer, setShowVisualizer] = useState<boolean>(false)

    const rooms = project.rooms ?? []
    const envelopes = project.envelopes ?? []
    const appliances = project.appliances ?? []
    const electrical = project.electrical ?? []

    async function patchPhotoDetails(updatedPhoto = currentPhoto) {
      if (updatedPhoto) {
        await ModelStore.patchPhotoDetails(project.id!, updatedPhoto)
      }
    }

    async function deletePhoto() {
      if (currentPhoto?.id) {
        await ModelStore.deletePhoto(project.id!, currentPhoto.id)
      }
      onClose()
    }

    async function duplicatePhoto() {
      if (currentPhoto) {
        setIsLoading(true)
        const duplicate = {
          ...currentPhoto,
          id: undefined,
          isHeroPhoto: undefined,
          duplicatedFromId: currentPhoto.id,
          name: `${currentPhoto.name} (copy)`,
        }

        try {
          await ModelStore.createPhotoEntry(
            project.id!,
            currentPhoto.photoUrl,
            duplicate
          )
          setCurrentPhoto(duplicate)
        } catch (error) {
          console.error('Error duplicating photo', error)
        }
        setIsLoading(false)
      }
    }

    return (
      <>
        {showVisualizer && (
          <MarkupVisualizer
            setShowVisualizer={setShowVisualizer}
            currentPhoto={currentPhoto}
            project={project}
            onChange={onChange}
          />
        )}
        {!showVisualizer && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              overflowY: 'auto',
              maxHeight: '600px',
              padding: '20px',
            }}
          >
            {/* top button display */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  duplicatePhoto()
                  setShowVisualizer(true)
                }}
                disabled={isLoading}
                startIcon={<ContentCopyOutlinedIcon />}
              >
                Create Markup Copy
              </Button>
              <Button variant="contained" onClick={deletePhoto}>
                <DeleteOutlineOutlinedIcon />
              </Button>
            </div>
            {/* photo */}
            <img
              src={currentPhoto?.photoUrl}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                width: 'auto',
                height: 'auto',
              }}
              alt="Preview"
            />
            {/* photo name */}
            <FormControl fullWidth>
              <TextInput
                label="Photo Name"
                placeholder="Photo Name"
                onChange={(value) => onChange({ name: value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.name || ''}
              />
            </FormControl>
            {/* notes for homeowner */}
            <FormControl fullWidth>
              <TextInput
                label="Notes for Homeowner"
                placeholder="Enter notes for homeowner"
                onChange={(value) => onChange({ homeownerNotes: value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.homeownerNotes || ''}
              />
            </FormControl>
            {/* internal notes */}
            <FormControl fullWidth>
              <TextInput
                label="Internal Notes"
                placeholder="Enter internal notes"
                onChange={(value) => onChange({ internalNotes: value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.internalNotes || ''}
              />
            </FormControl>
            {/* room */}
            <FormControl fullWidth>
              <InputLabel id="room-label">Room</InputLabel>
              <Select
                labelId="room-label"
                id="room-select"
                label="Room"
                onChange={(e) => onChange({ roomId: e.target.value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.roomId}
              >
                <MenuItem value={undefined}>None</MenuItem>
                {rooms.map((room, i) => (
                  <MenuItem key={i} value={room.id}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* envelope */}
            <FormControl fullWidth>
              <InputLabel id="envelope-label">Envelope</InputLabel>
              <Select
                labelId="envelope-label"
                id="envelope-select"
                label="Envelope"
                onChange={(e) => onChange({ envelopeId: e.target.value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.envelopeId}
              >
                <MenuItem value={undefined}>None</MenuItem>
                {envelopes.map((envelope, i) => (
                  <MenuItem key={i} value={envelope.id}>
                    {envelope.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* appliance */}
            <FormControl fullWidth>
              <InputLabel id="appliance-label">Appliance</InputLabel>
              <Select
                labelId="appliance-label"
                id="appliance-select"
                label="Appliance"
                onChange={(e) => onChange({ applianceId: e.target.value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.applianceId}
              >
                <MenuItem value={undefined}>None</MenuItem>
                {appliances.map((appliance, i) => (
                  <MenuItem key={i} value={appliance.id}>
                    {appliance.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* electrical */}
            <FormControl fullWidth>
              <InputLabel id="electrical-label">Electrical</InputLabel>
              <Select
                labelId="electrical-label"
                id="electrical-select"
                label="Electrical"
                onChange={(e) => onChange({ electricalId: e.target.value })}
                onBlur={() => patchPhotoDetails()}
                value={currentPhoto?.electricalId}
              >
                <MenuItem value={undefined}>None</MenuItem>
                {electrical.map((electrical_val, i) => (
                  <MenuItem key={i} value={electrical_val.id}>
                    {electrical_val.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* hero photo */}
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={currentPhoto?.id === project?.heroImageId}
                  onChange={(e) => {
                    patchPhotoDetails({
                      ...currentPhoto,
                      isHeroPhoto: e.target.checked,
                    })
                  }}
                />
              }
              label="Hero Photo for Project"
              style={{ marginTop: '10px', paddingLeft: '10px' }}
            />
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              onClick={onClose}
            >
              Finished
            </Button>
          </div>
        )}
      </>
    )
  }
)

export default PhotoForm
