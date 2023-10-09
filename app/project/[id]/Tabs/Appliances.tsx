"use client";

import ChipManager from "@/components/ChipManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

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

const TEST = [
  {
    id: '1',
    name: "Envelope 1",
    type: "insulation",
    location: "wall",
    condition: "good",
    notes: "HERE BE DRAGONS"
  },
  {
    id: '2',
    name: "Envelope 2",
    type: "insulation",
    location: "crawlspace",
    condition: "poor",
    notes: "TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST"
  },
  {
    id: '3',
    name: "Envelope 3",
    type: "air-sealing",
    leakiness: "leaky",
    notes: "AAAAAAAAAAAAAAAAAAAAAAA"
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
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [currentAppliance, setCurrentAppliance] = useState<Appliance>(TEST[1]);
  const [applianceType, setApplianceType] = useState<string>('');

  useEffect(() => {
    setAppliances(TEST)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        gap: '32px',
      }}
    >
      <ChipManager
        onDelete={() => console.log('delete')}
        onCreate={() => console.log('create')}
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
              value={applianceType}
              onChange={({ target }) => setApplianceType(target.value)}
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
              value={applianceType}
              onChange={({ target }) => setApplianceType(target.value)}
            >
              {
                TYPES.map((type, i) => (
                  <MenuItem key={i} value={i}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl fullWidth hidden={applianceType !== ''}>
            <InputLabel id="type-label">HVAC System Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              label="HVAC System Type"
            >
              {
                HVAC_SYSTEMS.map((system, i) => (
                  system.parent === applianceType &&
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