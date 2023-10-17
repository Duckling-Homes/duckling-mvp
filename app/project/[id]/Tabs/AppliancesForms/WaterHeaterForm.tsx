"use client";

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

const WaterHeaterForm = () => {
  
  return (
    <>
      {/* System Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">System Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="HVAC System Type"
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
      {/* Tank Volume */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Tank Volume"
          variant="outlined"
          placeholder="Tank Volume"
          type="text"
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

export default WaterHeaterForm