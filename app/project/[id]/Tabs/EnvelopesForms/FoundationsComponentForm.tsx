'use client'

import { SelectInput, TextInput } from '@/components/Inputs'
import { ProjectEnvelopeComponent } from '@/types/types'

interface FoundationsComponentFormProps {
  onChange: (inputName: string, value: string) => void
  onUpdate: (inputName: string) => void
  currentEnvelopeComponent: ProjectEnvelopeComponent
}

const CONDITIONS = [
  { name: 'None', value: 'none' },
  { name: 'Good', value: 'good' },
  { name: 'Fair', value: 'fair' },
  { name: 'Poor', value: 'poor' },
]

const FoundationsComponentForm: React.FC<FoundationsComponentFormProps> = ({
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
        label="Insulation Condition"
        value={currentEnvelopeComponent?.insulationCondition || ''}
        onChange={(value) => onChange('insulationCondition', value)}
        onBlur={() => onUpdate('insulationCondition')}
        options={CONDITIONS}
      />
      <SelectInput
        label="Air Sealing Condition"
        value={currentEnvelopeComponent?.airSealingCondition || ''}
        onChange={(value) => onChange('airSealingCondition', value)}
        onBlur={() => onUpdate('airSealingCondition')}
        options={CONDITIONS}
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

export default FoundationsComponentForm
