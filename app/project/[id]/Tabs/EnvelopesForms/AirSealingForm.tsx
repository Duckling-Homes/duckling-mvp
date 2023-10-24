'use client'

import { TextInput } from '@/components/Inputs';
import { ProjectEnvelope } from '@/types/types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

interface AirSealingFormProps {
  onChange: (inputName: string, value: string) => void
  onUpdate: () => void
  currentEnvelope: ProjectEnvelope
}

const AirSealingForm: React.FC<AirSealingFormProps> = ({
  onChange,
  currentEnvelope,
  onUpdate,
}) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <TextInput
          label="Name"
          placeholder="Name"
          value={currentEnvelope?.name || ''}
          onChange={(value) => onChange('name', value)}
          onBlur={() => onUpdate()}
        />
        <FormControl fullWidth>
          <InputLabel id="leakiness-description-label">
            Leakiness Description
          </InputLabel>
          <Select
            labelId="leakiness-description-label"
            id="leakiness-description-select"
            label="Leakiness Description"
            value={currentEnvelope?.leakinessDescription}
            onChange={(e) => {
              onChange('leakinessDescription', e.target.value)
              onUpdate()
            }}
          >
            <MenuItem value={'veryTight'}>Very Tight</MenuItem>
            <MenuItem value={'tight'}>Tight</MenuItem>
            <MenuItem value={'average'}>Average</MenuItem>
            <MenuItem value={'leaky'}>Leaky</MenuItem>
            <MenuItem value={'veryLeaky'}>Very Leaky</MenuItem>
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
      </div>
    </>
  )
}

export default AirSealingForm
