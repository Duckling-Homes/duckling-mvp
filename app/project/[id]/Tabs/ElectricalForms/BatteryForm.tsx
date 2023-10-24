'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface BatteryFormProps {
  currentElectrical: ProjectElectrical
  onChange: (key: string, value: number | string | boolean) => void
  onUpdate: () => void
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
        type="number"
        value={currentElectrical?.totalCapacity || ''}
        onChange={(value) => onChange('totalCapacity', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Rated Power Output */}
      <TextInput
        label="Rated Power Output"
        placeholder="Rated Power Output"
        type="number"
        value={currentElectrical?.ratedPowerOutput || ''}
        onChange={(value) => onChange('ratedPowerOutput', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Peak Power Output */}
      <TextInput
        label="Peak Power Output"
        placeholder="Peak Power Output"
        type="number"
        value={currentElectrical?.ratedPeakOutput || ''}
        onChange={(value) => onChange('ratedPeakOutput', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Voltage */}
      <TextInput
        label="Voltage"
        placeholder="Voltage"
        type="number"
        value={currentElectrical?.voltage || ''}
        onChange={(value) => onChange('voltage', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Grid Connected */}
      <SelectInput
        label="Grid Connected"
        value={currentElectrical?.gridConnected || ''}
        onChange={(value) => onChange('gridConnected', value)}
        onBlur={onUpdate}
        options={[{name: 'Yes', value: 'true'}, {name: 'No', value: 'false'}]}
      />
      {/* Manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        value={currentElectrical?.manufacturer || ''}
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={onUpdate}
      />
      {/* Model Number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        value={currentElectrical?.modelNumber || ''}
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={onUpdate}
      />
      {/* Serial Number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        value={currentElectrical?.serialNumber || ''}
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={onUpdate}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        value={currentElectrical?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={onUpdate}
      />
    </>
  )
}

export default BatteryForm
