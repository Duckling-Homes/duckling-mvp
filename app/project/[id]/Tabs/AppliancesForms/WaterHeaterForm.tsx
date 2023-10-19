"use client";

import { ProjectAppliance } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const SYSTEM_TYPE = [
  "Storage Water Heater",
  "Tankless Water Heater",
  "Heat Pump Water Heater",
  "Other",
]

const FUEL = [
  "Electricity",
  "Natural Gas",
  "Propane",
  "Fuel Oil",
  "Other",
];


interface WaterHeaterFormProps {
  onChange: (key: string, value: string | number | boolean) => void;
  onUpdate: () => void;
  currentAppliance: ProjectAppliance;
}

const WaterHeaterForm: React.FC<WaterHeaterFormProps> = ({ onChange, currentAppliance, onUpdate }) => {
  
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
          {
            SYSTEM_TYPE.map((type, i) => (
              <MenuItem key={i} value={type}>{type}</MenuItem>
            ))
          }
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
          {
            FUEL.map((fuel, i) => (
              <MenuItem key={i} value={fuel}>{fuel}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* age */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Age"
          variant="outlined"
          placeholder='Age'
          type="number"
          onChange={(e) => onChange('age', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
          value={currentAppliance?.age}
        />
      </FormControl>
      {/* manufacturer */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Manufacturer"
          variant="outlined"
          placeholder='Manufacturer'
          type="text"
          onChange={(e) => onChange('manufacturer', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.manufacturer}
        />
      </FormControl>
      {/* model number */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Model Number"
          variant="outlined"
          placeholder='Model Number'
          type="text"
          onChange={(e) => onChange('modelNumber', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.modelNumber}
        />
      </FormControl>
      {/* serial number */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Serial Number"
          variant="outlined"
          placeholder='Serial Number'
          type="text"
          onChange={(e) => onChange('serialNumber', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.serialNumber}
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
      </FormControl>
      {/* location */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          placeholder='Location'
          type="text"
          onChange={(e) => onChange('location', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.location}
        />
      </FormControl>
      {/* notes */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          placeholder='Notes'
          type="text"
          onChange={(e) => onChange('notes', e.target.value)}
          onBlur={() => onUpdate()}
          value={currentAppliance?.notes}
        />
      </FormControl>
    </>
  )
}

export default WaterHeaterForm