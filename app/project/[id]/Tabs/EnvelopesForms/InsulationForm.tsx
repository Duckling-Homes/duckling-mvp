'use client'

import { SelectInput, TextInput } from '@/components/Inputs';
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

const LOCATIONS = [
  { name: 'Attic', value: 'attic' },
  { name: 'Basement', value: 'basement' },
  { name: 'Crawlspace', value: 'crawlspace' },
  { name: 'Wall', value: 'wall' },
  { name: 'Floor', value: 'floor' },
  { name: 'Other', value: 'other' },
]

const CONDITIONS = [
  { name: 'None', value: 'none' },
  { name: 'Good', value: 'good' },
  { name: 'Fair', value: 'fair' },
  { name: 'Poor', value: 'poor' },
]

const InsulationForm: React.FC<InsulationFormProps> = ({ onChange, currentEnvelope, onUpdate }) => {

  return (
    <>
      <TextInput
        label="Name"
        placeholder="Name"
        value={currentEnvelope?.name || ''}
        onChange={(value) => onChange('name', value)}
        onBlur={onUpdate}
      />
      <SelectInput
        label="Insulation Location"
        value={currentEnvelope?.insulationLocation || ''}
        onChange={(value) => onChange('insulationLocation', value)}
        onBlur={onUpdate}
        options={LOCATIONS}
      />
      <SelectInput
        label="Insulation Condition"
        value={currentEnvelope?.insulationCondition || ''}
        onChange={(value) => onChange('insulationCondition', value)}
        onBlur={onUpdate}
        options={CONDITIONS}
      />
      <TextInput
        label="User Notes"
        placeholder="User Notes"
        value={currentEnvelope?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={onUpdate}
        multiline={true}
      />
    </>
  )
}

export default InsulationForm
