'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";

interface ElectricalPanelFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: () => void
}

const ElectricalPanelForm: React.FC<ElectricalPanelFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Panel Type */}
      <SelectInput
        label="Panel Type"
        value={currentElectrical?.panelType || ''}
        onChange={(value) => onChange('panelType', value)}
        onBlur={onUpdate}
        options={['Main Panel', 'Sub-Panel']}
      />
      {/* Amperage Rating */}
      <TextInput
        label="Amperage Rating"
        placeholder="Amperage Rating"
        type="tel"
        value={currentElectrical?.panelAmperageRating || ''}
        onChange={(value) => onChange('panelAmperageRating', parseInt(value))}
        onBlur={onUpdate}
        endAdornment='Amps'
      />
      {/* Available Slot for New Circuits */}
        <TextInput
          label="Available Slot for New Circuits"
          placeholder="Available Slot for New Circuits"
          type="tel"
          value={currentElectrical?.availableNewCircuits || ''}
          onChange={
            (value) => onChange('availableNewCircuits', parseInt(value))
          }
          onBlur={onUpdate}
        />
      {/* Total 15 Amp Circuits */}
      <TextInput
        label="Total 15 Amp Circuits"
        placeholder="Total 15 Amp Circuits"
        type="tel"
        value={currentElectrical?.total15AmpCircuits || ''}
        onChange={
          (value) => onChange('total15AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Total 20 Amp Circuits */}
      <TextInput
        label="Total 20 Amp Circuits"
        placeholder="Total 20 Amp Circuits"
        type="tel"
        value={currentElectrical?.total20AmpCircuits || ''}
        onChange={
          (value) => onChange('total20AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Total 30 Amp Circuits */}
      <TextInput
        label="Total 30 Amp Circuits"
        placeholder="Total 30 Amp Circuits"
        type="tel"
        value={currentElectrical?.total30AmpCircuits || ''}
        onChange={
          (value) => onChange('total30AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Total 40 Amp Circuits */}
      <TextInput
        label="Total 40 Amp Circuits"
        placeholder="Total 40 Amp Circuits"
        type="tel"
        value={currentElectrical?.total40AmpCircuits || ''}
        onChange={
          (value) => onChange('total40AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Total 50 Amp Circuits */}
      <TextInput
        label="Total 50 Amp Circuits"
        placeholder="Total 50 Amp Circuits"
        type="tel"
        value={currentElectrical?.total50AmpCircuits || ''}
        onChange={
          (value) => onChange('total50AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Total 60 Amp Circuits */}
      <TextInput
        label="Total 60 Amp Circuits"
        placeholder="Total 60 Amp Circuits"
        type="tel"
        value={currentElectrical?.total60AmpCircuits || ''}
        onChange={
          (value) => onChange('total60AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Total 70 Amp Circuits */}
      <TextInput
        label="Total 70 Amp Circuits"
        placeholder="Total 70 Amp Circuits"
        type="tel"
        value={currentElectrical?.total70AmpCircuits || ''}
        onChange={
          (value) => onChange('total70AmpCircuits', parseInt(value))
        }
        onBlur={onUpdate}
      />
      {/* Location */}
      <TextInput
        label="Location"
        placeholder="Location"
        value={currentElectrical?.location || ''}
        onChange={
          (value) => onChange('location', value)
        }
        onBlur={onUpdate}
      />
      {/* Notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        value={currentElectrical?.notes || ''}
        onChange={
          (value) => onChange('notes', value)
        }
        onBlur={onUpdate}
      />
    </>
  )
}

export default ElectricalPanelForm
