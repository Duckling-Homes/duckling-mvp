"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FUEL = [
  "Electricity",
  "Natural Gas",
  "Propane",
  "Fuel Oil",
  "Other",
];

const CooktopForm = ({ onChange, currentAppliance }) => {
  
  return (
    <>
      {/* manufacturer */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Manufacturer"
          variant="outlined"
          placeholder='Manufacturer'
          type="text"
          onChange={(e) => onChange('manufacturer', e.target.value)}
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
          value={currentAppliance?.serialNumber}
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
          value={currentAppliance?.fuel}
        >
          {
            FUEL.map((fuel, i) => (
              <MenuItem key={i} value={fuel}>{fuel}</MenuItem>
            ))
          }
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
          value={currentAppliance?.isInduction ? 'true' : 'false'}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
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
          value={currentAppliance?.age}
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
          value={currentAppliance?.notes}
        />
      </FormControl>
    </>
  )
}

export default CooktopForm