"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

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

const MOCK_DATA = [
  {
    id: '387a9935-0a11-4c21-95e2-d39e06f4cb4e',
    name: "Heating HVAC",
    type: "HVAC",
    hvac_system_type: "Heating",
    havc_system: "Furnace",
    fuel: "Natural Gas",
    age: 10,
    manufacturer: "Mitsubishi",
    model_number: "ABC-123",
    serial_number: "987-654-A1",
    heating_capacity: 60.000,
    cooling_capacity: 0,
    location: "Basement",
    notes: "Furnace is oversized for the heating load they need"
  },
  {
    id: 'e7ab2ac7-6c32-40e4-a9c6-8581d7934e3c',
    name: "Cooling HVAC",
    type: "HVAC",
    hvac_system_type: "Cooling",
    havc_system: "Central Air Conditioner",
    fuel: "Electricity",
    age: 10,
    manufacturer: "Mitsubishi",
    model_number: "ABC-345",
    serial_number: "123-456-B2",
    heating_capacity: 0,
    cooling_capacity: 60.000,
    location: "",
    notes: "AC is oversized for the cooling load they need"
  },
  {
    id: '22c1b3b1-11eb-4641-8d91-70c9ed31fffb',
    name: "Water Heater",
    type: "Water Heater",
    fuel: "Natural Gas",
    age: 5,
    manufacturer: "Rheem",
    model_number: "RH-546",
    serial_number: "345-678-D2",
    tank_volume: 60,
    location: "Basement",
    notes: "Water heater is in great condition - 9/23/23"
  },
  {
    id: '35ea3c85-49d7-4cd3-9aa9-1c9ec5949e5a',
    name: "Cooktop",
    type: "Cooktop",
    manufacturer: "Miele",
    model_number: "",
    serial_number: "",
    fuel: "Electricity",
    is_indution: true,
    age: 2,
    location: "Kitchen",
    notes: "Newly installed induction cooktop",
  },
];

const EVChargerForm = () => {
  const [data, setData] = useState({})
  
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

export default EVChargerForm