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
          value={currentElectrical?.chargingLevel}
          onChange={(e) => onChange('chargingLevel', e.target.value)}
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
          value={currentElectrical?.amperage}
          onChange={(e) => onChange('amperage', e.target.value)}
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
          value={currentElectrical?.acPowerSourceVolatge}
          onChange={(e) => onChange('acPowerSourceVolatge', e.target.value)}
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
          value={currentElectrical?.maxChargingPower}
          onChange={(e) => onChange('maxChargingPower', e.target.value)}
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
          value={currentElectrical?.manufacturer}
          onChange={(e) => onChange('manufacturer', e.target.value)}
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
          value={currentElectrical?.modelNumber}
          onChange={(e) => onChange('modelNumber', e.target.value)}
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
          value={currentElectrical?.serialNumber}
          onChange={(e) => onChange('serialNumber', e.target.value)}
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
          value={currentElectrical?.notes}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </FormControl>
    </>
  )
}

export default EVChargerForm