'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectAppliance } from "@/types/types";

const FUEL = [
  "Electricity",
  "Natural Gas",
  "Propane",
  "Fuel Oil",
  "Other",
];

interface DefaultFormProps {
  onChange: (key: string, value: string | number | boolean) => void
  onUpdate: (inputName: string) => void
  currentAppliance: ProjectAppliance
}

const DefaultForm: React.FC<DefaultFormProps> = ({
  onChange,
  currentAppliance,
  onUpdate,
}) => {
  return (
    <>
      {/* manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={() => onUpdate('manufacturer')}
        value={currentAppliance?.manufacturer || ''}
      />
      {/* model number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={() => onUpdate('modelNumber')}
        value={currentAppliance?.modelNumber || ''}
      />
      {/* serial number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={() => onUpdate('serialNumber')}
        value={currentAppliance?.serialNumber || ''}
      />
      {/* fuel */}
      <SelectInput
        label="Fuel"
        value={currentAppliance?.fuel || ''}
        onChange={(value) => onChange('fuel', value)}
        onBlur={() => onUpdate('fuel')}
        options={FUEL}
      />
      {/* age */}
      <TextInput
        label="Age"
        placeholder="Age"
        type="tel"
        onChange={(value) => onChange('age', parseInt(value))}
        onBlur={() => onUpdate('age')}
        value={currentAppliance?.age || ''}
        endAdornment='Years'
      />
      {/* location */}
      <TextInput
        label="Location"
        placeholder="Location"
        onChange={(value) => onChange('location', value)}
        onBlur={() => onUpdate('location')}
        value={currentAppliance?.location || ''}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        onChange={(value) => onChange('notes', value)}
        onBlur={() => onUpdate('notes')}
        value={currentAppliance?.notes || ''}
        multiline={true}
      />
    </>
  )
}

export default DefaultForm
