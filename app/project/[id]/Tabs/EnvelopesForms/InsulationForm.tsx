'use client'

import { TextInput } from '@/components/Inputs';
import { ProjectEnvelope } from '@/types/types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
      <TextInput
        label="Name"
        placeholder="Name"
        value={currentEnvelope?.name || ''}
        onChange={(value) => onChange('name', value)}
        onBlur={() => onUpdate()}
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
      <TextInput
        label="User Notes"
        placeholder="User Notes"
        value={currentEnvelope?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={() => onUpdate()}
        multiline={true}
      />
    </>
  )
}

export default InsulationForm
