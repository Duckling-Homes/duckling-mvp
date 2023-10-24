'use client'

import { TextInput } from "@/components/Inputs";
import { ProjectAppliance } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const HVAC_TYPES = ['Heating', 'Cooling', 'Heat Pump']

const HVAC_SYSTEMS = [
  { name: 'Furnace', parent: 'Heating' },
  { name: 'Boiler', parent: 'Heating' },
  { name: 'Baseboard', parent: 'Heating' },
  { name: 'Stove', parent: 'Heating' },
  { name: 'Solar Thermal', parent: 'Heating' },
  { name: 'Other', parent: 'Heating' },
  { name: 'Central Air Conditioner', parent: 'Cooling' },
  { name: 'Mini- Split', parent: 'Cooling' },
  { name: 'Other', parent: 'Cooling' },
  { name: 'Mini - Split', parent: 'Heat Pump' },
  { name: 'Central', parent: 'Heat Pump' },
  { name: 'Other', parent: 'Heat Pump' },
]

const FUEL = [
  { name: 'Electricity', parent: 'all' },
  { name: 'Natural Gas', parent: 'Heating' },
  { name: 'Fuel Oil', parent: 'Heating' },
  { name: 'Wood Pallet', parent: 'Heating' },
  { name: 'Other', parent: 'all' },
]

interface HVACFormProps {
  onChange: (key: string, value: string | number | boolean) => void
  onUpdate: () => void
  currentAppliance: ProjectAppliance
}

const HVACForm: React.FC<HVACFormProps> = ({
  onChange,
  currentAppliance,
  onUpdate,
}) => {
  return (
    <>
      {/* System Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">HVAC System Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="HVAC System Type"
          onChange={(e) => onChange('hvacSystemType', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.hvacSystemType}
        >
          {HVAC_TYPES.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* System */}
      <FormControl fullWidth> 
        <InputLabel id="system-label">HVAC System</InputLabel>
        <Select
          labelId="ystem-label"
          id="system-select"
          label="HVAC System"
          onChange={(e) => onChange('havcSystem', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.havcSystem}
        >
          {HVAC_SYSTEMS.map((system, i) => (
            <MenuItem key={i} value={system.name}>
              {system.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Fuel */}
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
            <MenuItem key={i} value={fuel.name}>
              {fuel.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Age */}
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
      {/* heating */}
      <FormControl fullWidth> 
        <TextInput
          label="Heating Capacity"
          placeholder="Heating Capacity"
          onChange={(value) => onChange('heatingCapacity', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.heatingCapacity || ''}
        />
      </FormControl>
      {/* cooling capacity */}
      <FormControl fullWidth> 
        <TextInput
          label="Cooling Capacity"
          placeholder="Cooling Capacity"
          onChange={(value) => onChange('coolingCapacity', value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.coolingCapacity || ''}
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

export default HVACForm
