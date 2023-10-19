'use client'

import { ProjectEnvelope } from '@/types/types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

interface InsulationFormProps {
  onChange: (inputName: string, value: string) => void;
  currentEnvelope: ProjectEnvelope;
}

const InsulationForm: React.FC<InsulationFormProps> = ({ onChange, currentEnvelope }) => {

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Name"
        value={currentEnvelope?.name}
        onChange={(e) => onChange('name', e.target.value)}
        variant="outlined"
        placeholder="Name"
        fullWidth
        inputLabelProps={{shrink: true}}
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
        placeholder="User Notes"
        fullWidth
        multiline
        inputLabelProps={{shrink: true}}
      />
    </> 
  )
}

export default InsulationForm
