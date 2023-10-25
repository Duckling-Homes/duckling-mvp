'use client'

import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Button,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { PhotoDetails, Project } from '@/types/types'

interface PhotoFormProps {
  onClose: () => void
  currentPhoto?: PhotoDetails
  project: Project
  onChange: (key: string, value: string | number | boolean | undefined) => void
}

const PhotoForm: React.FC<PhotoFormProps> = ({
  onClose,
  currentPhoto,
  project,
  onChange,
}) => {
  const rooms = project.rooms ?? []
  const envelopes = project.envelopes ?? []
  const appliances = project.appliances ?? []
  const electrical = project.electrical ?? []

  async function patchPhotoDetails(updatedPhoto = currentPhoto) {
    // TODO: Add patch API call
    console.log('Making a call to patch the photo details')
    console.log(updatedPhoto)
  }

  function deletePhoto() {
    // TODO: Add in API call to delete image and its details
    console.log('deleteing the photo')
    onChange('photoUrl', undefined)
  }

  return (
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
        <Button variant="contained" startIcon={<EditOutlinedIcon />}>
          Edit
        </Button>
        <Button variant="contained" startIcon={<ContentCopyOutlinedIcon />}>
          Duplicate
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
        <TextField
          id="outlined-basic"
          label="Photo Name"
          variant="outlined"
          placeholder="Photo Name"
          type="text"
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.name}
        />
      </FormControl>
      {/* notes for homeowner */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Notes for Homeowner"
          variant="outlined"
          placeholder="Enter notes for homeowner"
          type="text"
          onChange={(e) => onChange('homeownerNotes', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.homeownerNotes}
        />
      </FormControl>
      {/* internal notes */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Internal Notes"
          variant="outlined"
          placeholder="Enter internal notes"
          type="text"
          onChange={(e) => onChange('internalNotes', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.internalNotes}
        />
      </FormControl>
      {/* room */}
      <FormControl fullWidth>
        <InputLabel id="room-label">Room</InputLabel>
        <Select
          labelId="room-label"
          id="room-select"
          label="Room"
          onChange={(e) => onChange('room', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.room}
        >
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
          onChange={(e) => onChange('envelope', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.envelope}
        >
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
          onChange={(e) => onChange('appliance', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.appliance}
        >
          {appliances.map((appliance, i) => (
            <MenuItem key={i} value={appliance.id}>
              {appliance.name}
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
          onChange={(e) => onChange('electrical', e.target.value)}
          onBlur={() => patchPhotoDetails()}
          value={currentPhoto?.electrical}
        >
          {electrical.map((electrical_val, i) => (
            <MenuItem key={i} value={electrical_val.id}>
              {electrical_val.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* hero photo */}
      <FormControlLabel
        control={
          <Checkbox
            checked={currentPhoto?.isHeroPhoto}
            onChange={(e) => onChange('isHeroPhoto', e.target.value)}
            onBlur={() => patchPhotoDetails()}
          />
        }
        label="Hero Photo for Project"
        style={{ marginTop: '10px', paddingLeft: '10px' }}
      />
      <Button variant="contained" startIcon={<CheckIcon />} onClick={onClose}>
        Finished
      </Button>
    </div>
  )
}

export default PhotoForm
