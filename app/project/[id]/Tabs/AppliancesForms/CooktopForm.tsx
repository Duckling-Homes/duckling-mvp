'use client'

import { TextInput } from "@/components/Inputs";
import { ProjectAppliance } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FUEL = ['Electricity', 'Natural Gas', 'Propane', 'Fuel Oil', 'Other']

interface CooktopFormProps {
  onChange: (key: string, value: string | number | boolean) => void
  onUpdate: () => void
  currentAppliance: ProjectAppliance
}

const CooktopForm: React.FC<CooktopFormProps> = ({
  onChange,
  currentAppliance,
  onUpdate,
}) => {
  return (
    <>
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
      {/* induction */}
      <FormControl fullWidth>
        <InputLabel id="induction-label">Is Induction?</InputLabel>
        <Select
          labelId="induction-label"
          id="induction-select"
          label="Is Induction?"
          onChange={(e) => onChange('isInduction', e.target.value === 'true')}
          onBlur={() => onUpdate()}
          value={currentAppliance?.isInduction ? 'true' : 'false'}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
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

export default CooktopForm
