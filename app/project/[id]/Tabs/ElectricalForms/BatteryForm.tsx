'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";

interface BatteryFormProps {
  currentElectrical: ProjectElectrical
  onChange: (key: string, value: number | string | boolean) => void
  onUpdate: (inputName: string) => void
}

const BatteryForm: React.FC<BatteryFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Total Capacity */}
      <TextInput
        label="Total Capacity"
        placeholder="Total Capacity"
        type="tel"
        value={currentElectrical?.totalCapacity || ''}
        onChange={(value) => onChange('totalCapacity', parseInt(value))}
        onBlur={() => onUpdate('totalCapacity')}
        endAdornment='amp/hours'
      />
      {/* Rated Power Output */}
      <TextInput
        label="Rated Power Output"
        placeholder="Rated Power Output"
        type="tel"
        value={currentElectrical?.ratedPowerOutput || ''}
        onChange={(value) => onChange('ratedPowerOutput', parseInt(value))}
        onBlur={() => onUpdate('ratedPowerOutput')}
        endAdornment='kW'
      />
      {/* Peak Power Output */}
      <TextInput
        label="Peak Power Output"
        placeholder="Peak Power Output"
        type="tel"
        value={currentElectrical?.ratedPeakOutput || ''}
        onChange={(value) => onChange('ratedPeakOutput', parseInt(value))}
        onBlur={() => onUpdate('ratedPeakOutput')}
        endAdornment='kW'
      />
      {/* Voltage */}
      <TextInput
        label="Voltage"
        placeholder="Voltage"
        type="tel"
        value={currentElectrical?.voltage || ''}
        onChange={(value) => onChange('voltage', parseInt(value))}
        onBlur={() => onUpdate('voltage')}
        endAdornment='V'
      />
      {/* Grid Connected */}
      <SelectInput
        label="Grid Connected"
        value={currentElectrical?.gridConnected || ''}
        onChange={(value) => onChange('gridConnected', value)}
        onBlur={() => onUpdate('gridConnected')}
        options={[{name: 'Yes', value: 'true'}, {name: 'No', value: 'false'}]}
      />
      {/* Manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        value={currentElectrical?.manufacturer || ''}
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={() => onUpdate('manufacturer')}
      />
      {/* Model Number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        value={currentElectrical?.modelNumber || ''}
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={() => onUpdate('modelNumber')}
      />
      {/* Serial Number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        value={currentElectrical?.serialNumber || ''}
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={() => onUpdate('serialNumber')}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        value={currentElectrical?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={() => onUpdate('notes')}
      />
    </>
  )
}

export default BatteryForm
