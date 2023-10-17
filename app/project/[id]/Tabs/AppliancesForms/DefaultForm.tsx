"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FUEL = [
  "Electricity",
  "Natural Gas",
  "Propane",
  "Fuel Oil",
  "Other",
];

const DefaultForm = () => {
  
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
        />
      </FormControl>
      {/* fuel */}
      <FormControl fullWidth> 
        <InputLabel id="fuel-label">Fuel</InputLabel>
        <Select
          labelId="fuel-label"
          id="fuel-select"
          label="Fuel"
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
        />
      </FormControl>
    </>
  )
}

export default DefaultForm