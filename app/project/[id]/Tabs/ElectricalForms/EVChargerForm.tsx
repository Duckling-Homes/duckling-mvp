"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const CHARGING_LEVELS = [
  "Level 1",
  "Level 2",
  "Level 3",
]

const EVChargerForm = ({ currentElectrical, onChange }) => {
  
  return (
    <>
      {/* Charging Level */}
      <FormControl fullWidth>
        <InputLabel id="charging-level-label">Charging Level</InputLabel>
        <Select
          labelId="charging-level-label"
          id="charging-level-select"
          label="Charging Level"
        >
          {
            CHARGING_LEVELS.map((level, i) => (
              <MenuItem key={i} value={level}>{level}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Amperage */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Amperage"
          variant="outlined"
          placeholder='Amperage'
          type="number"
        />
      </FormControl>
      {/* AC Power Source Voltage */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="AC Power Source Voltage"
          variant="outlined"
          placeholder='AC Power Source Voltage'
          type="text"
        />
      </FormControl>
      {/* Max Charging Power */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Max Charging Power"
          variant="outlined"
          placeholder='Max Charging Power'
          type="text"
        />
      </FormControl>
      {/* Manufacturer */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Manufacturer"
          variant="outlined"
          placeholder='Manufacturer'
          type="text"
        />
      </FormControl>
      {/* Model Number */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Model Number"
          variant="outlined"
          placeholder='Model Number'
          type="text"
        />
      </FormControl>
      {/* Serial Number */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Serial Number"
          variant="outlined"
          placeholder='Serial Number'
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

export default EVChargerForm