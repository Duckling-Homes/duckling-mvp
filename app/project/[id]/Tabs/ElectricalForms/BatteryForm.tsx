'use client'

import { TextInput } from "@/components/Inputs";
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
      <FormControl fullWidth> 
        <TextInput
          label="Total Capacity"
          placeholder="Total Capacity"
          type="number"
          value={currentElectrical?.totalCapacity || ''}
          onChange={(value) => onChange('totalCapacity', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Rated Power Output */}
      <FormControl fullWidth> 
        <TextInput
          label="Rated Power Output"
          placeholder="Rated Power Output"
          type="number"
          value={currentElectrical?.ratedPowerOutput || ''}
          onChange={(value) => onChange('ratedPowerOutput', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Peak Power Output */}
      <FormControl fullWidth> 
        <TextInput
          label="Peak Power Output"
          placeholder="Peak Power Output"
          type="number"
          value={currentElectrical?.ratedPeakOutput || ''}
          onChange={(value) => onChange('ratedPeakOutput', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Voltage */}
      <FormControl fullWidth> 
        <TextInput
          label="Voltage"
          placeholder="Voltage"
          type="number"
          value={currentElectrical?.voltage || ''}
          onChange={(value) => onChange('voltage', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Grid Connected */}
      <FormControl fullWidth>
        <InputLabel id="grid-connected-label">Grid Connected</InputLabel>
        <Select
          labelId="grid-connected-label"
          id="grid-connected-select"
          label="Grid Connected"
          value={currentElectrical?.gridConnected}
          onChange={(e) => onChange('gridConnected', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
        </Select>
      </FormControl>
      {/* Manufacturer */}
      <FormControl fullWidth> 
        <TextInput
          label="Manufacturer"
          placeholder="Manufacturer"
          value={currentElectrical?.manufacturer || ''}
          onChange={(value) => onChange('manufacturer', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Model Number */}
      <FormControl fullWidth> 
        <TextInput
          label="Model Number"
          placeholder="Model Number"
          value={currentElectrical?.modelNumber || ''}
          onChange={(value) => onChange('modelNumber', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Serial Number */}
      <FormControl fullWidth> 
        <TextInput
          label="Serial Number"
          placeholder="Serial Number"
          value={currentElectrical?.serialNumber || ''}
          onChange={(value) => onChange('serialNumber', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* notes */}
      <FormControl fullWidth> 
        <TextInput
          label="Notes"
          placeholder="Notes"
          value={currentElectrical?.notes || ''}
          onChange={(value) => onChange('notes', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
    </>
  )
}

export default BatteryForm
