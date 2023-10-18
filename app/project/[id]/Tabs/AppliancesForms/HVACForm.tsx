"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const HVAC_TYPES = [
  "Heating",
  "Cooling",
  "Heat Pump"
]

const HVAC_SYSTEMS = [
  { name: "Furnace", parent: "Heating" },
  { name: "Boiler", parent: "Heating" },
  { name: "Baseboard", parent: "Heating" },
  { name: "Stove", parent: "Heating" },
  { name: "Solar Thermal", parent: "Heating" },
  { name: "Other", parent: "Heating" },
  { name: "Central Air Conditioner", parent: "Cooling" },
  { name: "Mini- Split", parent: "Cooling" },
  { name: "Other", parent: "Cooling" },
  { name: "Mini - Split", parent: "Heat Pump" },
  { name: "Central", parent: "Heat Pump" },
  { name: "Other", parent: "Heat Pump" },
];

const FUEL = [
  { name: "Electricity", parent: "all" },
  { name: "Natural Gas", parent: "Heating" },
  { name: "Fuel Oil", parent: "Heating" },
  { name: "Wood Pallet", parent: "Heating" },
  { name: "Other", parent: "all" },
];

const HVACForm = () => {
  
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-label">HVAC System Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="HVAC System Type"
        >
          {
            HVAC_TYPES.map((type, i) => (
              <MenuItem key={i} value={type}>{type}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl fullWidth> 
        <InputLabel id="system-label">HVAC System</InputLabel>
        <Select
          labelId="ystem-label"
          id="system-select"
          label="HVAC System"
        >
          {
            HVAC_SYSTEMS.map((system, i) => (
              <MenuItem key={i} value={system.name}>{system.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl fullWidth> 
        <InputLabel id="fuel-label">Fuel</InputLabel>
        <Select
          labelId="fuel-label"
          id="fuel-select"
          label="Fuel"
        >
          {
            FUEL.map((fuel, i) => (
              <MenuItem key={i} value={fuel.name}>{fuel.name}</MenuItem>
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
      {/* heating */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Heating Capacity"
          variant="outlined"
          placeholder='Heating Capacity'
          type="text"
        />
      </FormControl>
      {/* cooling capacity */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Cooling Capacity"
          variant="outlined"
          placeholder='Cooling Capacity'
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

export default HVACForm