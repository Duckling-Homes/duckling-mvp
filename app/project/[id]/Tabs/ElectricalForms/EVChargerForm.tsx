'use client'

import { TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const CHARGING_LEVELS = ['Level 1', 'Level 2', 'Level 3']

interface EVChargerFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: () => void
}

const EVChargerForm: React.FC<EVChargerFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Charging Level */}
      <FormControl fullWidth>
        <InputLabel id="charging-level-label">Charging Level</InputLabel>
        <Select
          labelId="charging-level-label"
          id="charging-level-select"
          label="Charging Level"
          value={currentElectrical?.chargingLevel}
          onChange={(e) => onChange('chargingLevel', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {CHARGING_LEVELS.map((level, i) => (
            <MenuItem key={i} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Amperage */}
      <FormControl fullWidth> 
        <TextInput
          label="Amperage"
          placeholder="Amperage"
          type="number"
          value={currentElectrical?.amperage || ''}
          onChange={(value) => onChange('amperage', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* AC Power Source Voltage */}
      <FormControl fullWidth> 
        <TextInput
          label="AC Power Source Voltage"
          placeholder="AC Power Source Voltage"
          type="number"
          value={currentElectrical?.acPowerSourceVolatge || ''}
          onChange={(value) => onChange('acPowerSourceVolatge', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Max Charging Power */}
      <FormControl fullWidth> 
        <TextInput
          label="Max Charging Power"
          placeholder="Max Charging Power"
          type="number"
          value={currentElectrical?.maxChargingPower || ''}
          onChange={(value) => onChange('maxChargingPower', parseInt(value))}
          onBlur={() => onUpdate()}
        />
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

export default EVChargerForm
