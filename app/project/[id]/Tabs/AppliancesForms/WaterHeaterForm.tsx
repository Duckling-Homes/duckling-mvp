'use client'

import { TextInput } from "@/components/Inputs";
import { ProjectAppliance } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const SYSTEM_TYPE = [
  'Storage Water Heater',
  'Tankless Water Heater',
  'Heat Pump Water Heater',
  'Other',
]

const FUEL = ['Electricity', 'Natural Gas', 'Propane', 'Fuel Oil', 'Other']

interface WaterHeaterFormProps {
  onChange: (key: string, value: string | number | boolean) => void
  onUpdate: () => void
  currentAppliance: ProjectAppliance
}

const WaterHeaterForm: React.FC<WaterHeaterFormProps> = ({
  onChange,
  currentAppliance,
  onUpdate,
}) => {
  return (
    <>
      {/* System Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">System Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="HVAC System Type"
          onChange={(e) => onChange('systemType', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.systemType}
        >
          {SYSTEM_TYPE.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* fuel */}
      <FormControl fullWidth>
        <InputLabel id="fuel-label">Fuel</InputLabel>
        <Select
          labelId="fuel-label"
          id="fuel-select"
          label="Fuel"
          onChange={(e) => onChange('fuel', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.fuel}
        >
          {FUEL.map((fuel, i) => (
            <MenuItem key={i} value={fuel}>
              {fuel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* age */}
      <FormControl fullWidth> 
        <TextInput
          label="Age"
          placeholder="Age"
          type="number"
          onChange={(value) => onChange('age', parseInt(value))}
          onBlur={() => onUpdate()}
          value={currentAppliance?.age || ''}
        />
      </FormControl>
      {/* manufacturer */}
      <FormControl fullWidth>
        <TextInput
          label="Manufacturer"
          placeholder="Manufacturer"
          onChange={(value) => onChange('manufacturer', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.manufacturer || ''}
        />
      </FormControl>
      {/* model number */}
      <FormControl fullWidth>
        <TextInput
          label="Model Number"
          placeholder="Model Number"
          onChange={(value) => onChange('modelNumber', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.modelNumber || ''}
        />
      </FormControl>
      {/* serial number */}
      <FormControl fullWidth> 
        <TextInput
          label="Serial Number"
          placeholder="Serial Number"
          onChange={(value) => onChange('serialNumber', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.serialNumber || ''}
        />
      </FormControl>
      {/* Tank Volume */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Tank Volume"
          variant="outlined"
          placeholder="Tank Volume"
          type="text"
          onChange={(e) => onChange('tankVolume', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
          value={currentAppliance?.tankVolume}
        />
        <TextInput
          label="Tank Volume"
          placeholder="Tank Volume"
          type="number"
          onChange={(value) => onChange('tankVolume', parseInt(value))}
          onBlur={() => onUpdate()}
          value={currentAppliance?.tankVolume || ''}
        />
      </FormControl>
      {/* location */}
      <FormControl fullWidth> 
        <TextInput
          label="Location"
          placeholder="Location"
          onChange={(value) => onChange('location', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.location || ''}
        />
      </FormControl>
      {/* notes */}
      <FormControl fullWidth> 
        <TextInput
          label="Notes"
          placeholder="Notes"
          onChange={(value) => onChange('notes', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.notes || ''}
        />
      </FormControl>
    </>
  )
}

export default WaterHeaterForm
