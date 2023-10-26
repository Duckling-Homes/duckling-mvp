'use client'

import { SelectInput, TextInput } from '@/components/Inputs';
import { ProjectEnvelope } from '@/types/types';

const LEAKINESS = [
  { name: 'Very Tight', value: 'veryTight' },
  { name: 'Tight', value: 'tight' },
  { name: 'Average', value: 'average' },
  { name: 'Leaky', value: 'leaky' },
  { name: 'Very Leaky', value: 'veryLeaky' },
]
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
          onBlur={onUpdate}
        />
        <SelectInput
          label="Leakiness Description"
          value={currentEnvelope?.leakinessDescription || ''}
          onChange={(value) => onChange('leakinessDescription', value)}
          onBlur={onUpdate}
          options={LEAKINESS}
        />
        <TextInput
          label="User Notes"
          placeholder="User Notes"
          value={currentEnvelope?.notes || ''}
          onChange={(value) => onChange('notes', value)}
          onBlur={onUpdate}
          multiline={true}
        />
      </div>
    </>
  )
}

export default AirSealingForm
