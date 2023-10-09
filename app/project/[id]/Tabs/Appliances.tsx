"use client";

import ChipManager from "@/components/ChipManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const TYPES = [
  "HVAC",
  "Water Heater",
  "Refrigerator",
  "Washing Machine",
  "Dryer",
  "Dishwasher",
  "Cooktop",
  "Oven",
  "Other",
]

// const HVAC_TYPES = [
//   "Heating",
//   "Cooling",
//   "Heat Pump"
// ]

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
]

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

interface Appliance {
  id: string;
  name: string;
  type: string;
  location?: string;
  condition?: string;
  notes: string;
  leakiness?: string;
}

const Appliances = () => {
  const [appliances, setAppliances] = useState<Appliance[]>(MOCK_DATA);
  const [currentAppliance, setCurrentAppliance] = useState<Appliance>(MOCK_DATA[0]);


  function deleteAppliance(applianceId: string) {
    const newAppliances = appliances.filter(r => r.id !== applianceId);
    setAppliances(newAppliances);
    setCurrentAppliance(newAppliances[0] || {});
  }

  function generateUID() {
    const randomNumber = Math.random();
    const base36String = randomNumber.toString(36).substr(2, 9);
    const timestamp = Date.now().toString(36).substr(2, 5);
    const uid = base36String + timestamp;

    return uid;
  };

  function createAppliance() {

    const newAppliance = {
      id: generateUID(),
      project_id: "ee30fb58-ee45-4efc-a302-9774133515dc",
      name: "New Appliance",
      type: "",
      location: "",
      condition: "",
      notes: "",
    };

    const newApplianceList = [...appliances, newAppliance];
    setAppliances(newApplianceList);
    setCurrentAppliance(newAppliance);
  }

  
  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        gap: '32px',
      }}
    >
      <ChipManager
        onDelete={deleteAppliance}
        onCreate={createAppliance}
        chipType="Appliance"
        chips={appliances}
        currentChip={currentAppliance.id}
        onChipClick={(i: number) => setCurrentAppliance(appliances[i])}
      />
      <div style={{
        width: '100%',
      }}>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              label="Type"
              value={currentAppliance.type}
              // onChange={({ target }) => setApplianceType(target.value)}
            >
              {
                TYPES.map((type, i) => (
                  <MenuItem key={i} value={i}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              label="Type"
              value={currentAppliance.type}
              // onChange={({ target }) => setApplianceType(target.value)}
            >
              {
                TYPES.map((type, i) => (
                  <MenuItem key={i} value={i}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth hidden={currentAppliance.type !== ''}>
            <InputLabel id="type-label">HVAC System Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              label="HVAC System Type"
            >
              {
                HVAC_SYSTEMS.map((system, i) => (
                  system.parent === currentAppliance.type &&
                  <MenuItem key={i} value={i}>{system.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </form>
      </div>
    </div>
  )
}

export default Appliances