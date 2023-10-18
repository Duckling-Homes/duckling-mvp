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

const HVACForm = ({ onChange, currentAppliance }) => {
  
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-label">HVAC System Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="HVAC System Type"
          onChange={(e) => onChange('hvacSystemType', e.target.value)}
          value={currentAppliance?.hvacSystemType}
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
          onChange={(e) => onChange('havcSystem', e.target.value)}
          value={currentAppliance?.havcSystem}
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
          onChange={(e) => onChange('fuel', e.target.value)}
          value={currentAppliance?.fuel}
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
          onChange={(e) => onChange('age', parseInt(e.target.value))}
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
      {/* heating */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Heating Capacity"
          variant="outlined"
          placeholder='Heating Capacity'
          type="text"
          onChange={(e) => onChange('heatingCapacity', parseInt(e.target.value))}
          value={currentAppliance?.heatingCapacity}
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
          onChange={(e) => onChange('coolingCapacity', parseInt(e.target.value))}
          value={currentAppliance?.coolingCapacity}
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

export default HVACForm