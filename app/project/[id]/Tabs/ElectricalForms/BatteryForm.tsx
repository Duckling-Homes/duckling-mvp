"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const BatteryForm = ({ currentElectrical, onChange }) => {
  
  return (
    <>
      {/* Total Capacity */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total Capacity"
          variant="outlined"
          placeholder='Total Capacity'
          type="number"
        />
      </FormControl>
      {/* Rated Power Output */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Rated Power Output"
          variant="outlined"
          placeholder='Rated Power Output'
          type="text"
        />
      </FormControl>
      {/* Peak Power Output */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Peak Power Output"
          variant="outlined"
          placeholder='Peak Power Output'
          type="text"
        />
      </FormControl>
      {/* Voltage */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Voltage"
          variant="outlined"
          placeholder='Voltage'
          type="text"
        />
      </FormControl>
      {/* Grid Connected */}
      <FormControl fullWidth> 
        <InputLabel id="grid-connected-label">Grid Connected</InputLabel>
        <Select
          labelId="grid-connected-label"
          id="grid-connected-select"
          label="Grid Connected"
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
        </Select>
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

export default BatteryForm