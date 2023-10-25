'use client'

import { ProjectEnvelope } from '@/types/types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

interface InsulationFormProps {
  onChange: (inputName: string, value: string) => void
  onUpdate: () => void
  currentEnvelope: ProjectEnvelope
}

const InsulationForm: React.FC<InsulationFormProps> = ({
  onChange,
  currentEnvelope,
  onUpdate,
}) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Name"
        value={currentEnvelope?.name}
        onChange={(e) => onChange('name', e.target.value)}
        onBlur={() => onUpdate()}
        variant="outlined"
        placeholder="Name"
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="insolation-location-label">
          Insulation Location
        </InputLabel>
        <Select
          labelId="insolation-location-label"
          id="insolation-location-select"
          label="Insulation Location"
          value={currentEnvelope?.insulationLocation}
          onChange={(e) => onChange('insulationLocation', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value={'attic'}>Attic</MenuItem>
          <MenuItem value={'basement'}>Basement</MenuItem>
          <MenuItem value={'crawlspace'}>Crawlspace</MenuItem>
          <MenuItem value={'wall'}>Wall</MenuItem>
          <MenuItem value={'floor'}>Floor</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="leakiness-description-label">
          Insulation Condition
        </InputLabel>
        <Select
          labelId="insulation-condition-label"
          id="insulatiom-condition-select"
          label="Insulation Condition"
          value={currentEnvelope?.insulationCondition}
          onChange={(e) => onChange('insulationCondition', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value={'none'}>None</MenuItem>
          <MenuItem value={'good'}>Good</MenuItem>
          <MenuItem value={'fair'}>Fair</MenuItem>
          <MenuItem value={'poor'}>Poor</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="User Notes"
        variant="outlined"
        value={currentEnvelope?.notes}
        onChange={(e) => onChange('notes', e.target.value)}
        onBlur={() => onUpdate()}
        placeholder="User Notes"
        fullWidth
        multiline
      />
    </>
  )
}

export default InsulationForm
