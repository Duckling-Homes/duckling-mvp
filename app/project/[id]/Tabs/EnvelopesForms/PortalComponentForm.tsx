'use client'

import { SelectInput, TextInput } from '@/components/Inputs'
import { ProjectEnvelopeComponent } from '@/types/types'

interface PortalComponentFormProps {
  onChange: (inputName: string, value: string) => void
  onUpdate: (inputName: string) => void
  currentEnvelopeComponent: ProjectEnvelopeComponent
}

const CONDITIONS = [
  { name: 'Good', value: 'good' },
  { name: 'Fair', value: 'fair' },
  { name: 'Poor', value: 'poor' },
]

const PortalComponentForm: React.FC<PortalComponentFormProps> = ({
  onChange,
  currentEnvelopeComponent,
  onUpdate,
}) => {
  return (
    <>
      <TextInput
        label="Name"
        placeholder="Name"
        value={currentEnvelopeComponent?.name || ''}
        onChange={(value) => onChange('name', value)}
        onBlur={() => onUpdate('name')}
      />
      <SelectInput
        label="Condition"
        value={currentEnvelopeComponent?.condition || ''}
        onChange={(value) => onChange('condition', value)}
        onBlur={() => onUpdate('condition')}
        options={CONDITIONS}
      />
      <TextInput
        label="Location"
        placeholder="Location"
        value={currentEnvelopeComponent?.location || ''}
        onChange={(value) => onChange('location', value)}
        onBlur={() => onUpdate('location')}
        multiline={true}
      />
      <TextInput
        label="Notes"
        placeholder="Notes"
        value={currentEnvelopeComponent?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={() => onUpdate('notes')}
        multiline={true}
      />
    </>
  )
}

export default PortalComponentForm
