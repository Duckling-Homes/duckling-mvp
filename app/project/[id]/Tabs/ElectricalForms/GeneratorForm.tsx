"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FUEL = [
  "Natural gas",
  "Propane",
  "Diesel",
  "Gasoline",
]

const GeneratorForm = () => {
  
  return (
    <>
      {/* Generator Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">Generator Type</InputLabel>
        <Select
          labelId="generator-type-label"
          id="generator-type-select"
          label="Generator Type"
        >
          <MenuItem value={'Standby'}>Standby</MenuItem>
          <MenuItem value={'Portable'}>Portable</MenuItem>
        </Select>
      </FormControl>
      {/* Fuel Type */}
      <FormControl fullWidth> 
        <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
        <Select
          labelId="fuel-type-label"
          id="fuel-type-select"
          label="Fuel Type"
        >
          {
            FUEL.map((fuel, i) => (
              <MenuItem key={i} value={fuel}>{fuel}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Rated Continuous Wattage */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Rated Continuous Wattage"
          variant="outlined"
          placeholder='Rated Continuous Wattage'
          type="number"
        />
      </FormControl>
      {/* Rated Peak Wattage */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Rated Peak Wattage"
          variant="outlined"
          placeholder='Rated Peak Wattage'
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
      {/* Number of Phases */}
      <FormControl fullWidth>
        <InputLabel id="number-phases-label">Number of Phases</InputLabel>
        <Select
          labelId="number-phases-label"
          id="number-phases-select"
          label="Number of Phases"
        >
          <MenuItem value={'1-Phase'}>1-Phase</MenuItem>
          <MenuItem value={'3-Phase'}>3-Phase</MenuItem>
        </Select>
      </FormControl>
      {/* Transfer Switch */}
      <FormControl fullWidth>
        <InputLabel id="transfer-switch-label">Transfer Switch</InputLabel>
        <Select
          labelId="transfer-switch-label"
          id="transfer-switch-select"
          label="Transfer Switch"
        >
          <MenuItem value='Automatic'>Automatic</MenuItem>
          <MenuItem value='Manual'>Manual</MenuItem>
        </Select>
      </FormControl>
      {/* Connection Method */}
      <FormControl fullWidth>
        <InputLabel id="connection-method-label">Connection Method</InputLabel>
        <Select
          labelId="connection-method-label"
          id="connection-method-select"
          label="Connection Method"
        >
          <MenuItem value='Interlock'>Interlock</MenuItem>
          <MenuItem value='Main Panel'>Main Panel</MenuItem>
          <MenuItem value='Sub-Panel'>Sub-Panel</MenuItem>

        </Select>
      </FormControl>
      {/* Location */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          placeholder='Location'
          type="text"
        />
      </FormControl>
      {/* Year Installed */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Year Installed"
          variant="outlined"
          placeholder='Year Installed'
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

export default GeneratorForm