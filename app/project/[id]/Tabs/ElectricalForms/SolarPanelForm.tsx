'use client'

import { ProjectElectrical } from '@/types/types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

const LOCATIONS = ['Roof', 'Ground', 'Other']

const OWNERSHIPS = ['Owned', 'Leased', 'PPA', 'Utility Owned', 'Other']

const MODULE_TYPES = ['Thin Film', 'Premium', 'Standard']

const TRACKINGS = ['Fixed', '2-Axis', '1-Axis Backtracked', '1-Axis']

const ORIENTATIONS = [
  'East',
  'West',
  'North',
  'Northeast',
  'Northwest',
  'South',
  'Southeast',
  'Southwest',
]

interface SolarPanelFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: () => void
}

const SolarPanelForm: React.FC<SolarPanelFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Location */}
      <FormControl fullWidth>
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          id="location-select"
          label="Location"
          value={currentElectrical?.location}
          onChange={(e) => onChange('location', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {LOCATIONS.map((location, i) => (
            <MenuItem key={i} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Ownership */}
      <FormControl fullWidth>
        <InputLabel id="ownership-label">Ownership</InputLabel>
        <Select
          labelId="ownership-label"
          id="ownership-select"
          label="Ownership"
          value={currentElectrical?.ownership}
          onChange={(e) => onChange('ownership', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {OWNERSHIPS.map((ownership, i) => (
            <MenuItem key={i} value={ownership}>
              {ownership}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Module Type */}
      <FormControl fullWidth>
        <InputLabel id="module-type-label">Module Type</InputLabel>
        <Select
          labelId="module-type-label"
          id="module-type-select"
          label="Module Type"
          value={currentElectrical?.moduleType}
          onChange={(e) => onChange('moduleType', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {MODULE_TYPES.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Tracking */}
      <FormControl fullWidth>
        <InputLabel id="tracking-label">Tracking</InputLabel>
        <Select
          labelId="tracking-label"
          id="tracking-select"
          label="Tracking"
          value={currentElectrical?.tracking}
          onChange={(e) => onChange('tracking', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {TRACKINGS.map((tracking, i) => (
            <MenuItem key={i} value={tracking}>
              {tracking}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Orientation */}
      <FormControl fullWidth>
        <InputLabel id="orientation-label">Orientation</InputLabel>
        <Select
          labelId="orientation-label"
          id="orientation-select"
          label="Orientation"
          value={currentElectrical?.arrayOrientation}
          onChange={(e) => onChange('arrayOrientation', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {ORIENTATIONS.map((orientation, i) => (
            <MenuItem key={i} value={orientation}>
              {orientation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Tilt */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Tilt"
          variant="outlined"
          placeholder="Tilt"
          type="number"
          value={currentElectrical?.arrayTilt}
          onChange={(e) => onChange('arrayTilt', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Max Output */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Max Output"
          variant="outlined"
          placeholder="Max Output"
          type="number"
          value={currentElectrical?.maxPowerOutput}
          onChange={(e) => onChange('maxPowerOutput', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Number of Panels */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Number of Panels"
          variant="outlined"
          placeholder="Number of Panels"
          type="text"
          value={currentElectrical?.numberOfPanels}
          onChange={(e) => onChange('numberOfPanels', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Year Installed */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Year Installed"
          variant="outlined"
          placeholder="Year Installed"
          type="text"
          value={currentElectrical?.yearInstalled}
          onChange={(e) => onChange('yearInstalled', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Annual Output */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Annual Output"
          variant="outlined"
          placeholder="Annual Output"
          type="number"
          value={currentElectrical?.annualOutput}
          onChange={(e) => onChange('annualOutput', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Notes */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          placeholder="Notes"
          type="text"
          value={currentElectrical?.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
    </>
  )
}

export default SolarPanelForm
