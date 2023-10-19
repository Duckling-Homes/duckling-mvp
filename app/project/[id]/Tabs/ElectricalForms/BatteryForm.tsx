"use client";

import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface BatteryFormProps {
  currentElectrical: ProjectElectrical;
  onChange: (key: string, value: number | string | boolean) => void;
}

const BatteryForm: React.FC<BatteryFormProps> = ({ currentElectrical, onChange }) => {
  
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
          value={currentElectrical?.totalCapacity}
          onChange={(e) => onChange('totalCapacity', e.target.value)}
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
          value={currentElectrical?.ratedPowerOutput}
          onChange={(e) => onChange('ratedPowerOutput', e.target.value)}
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
          value={currentElectrical?.ratedPeakOutput}
          onChange={(e) => onChange('ratedPeakOutput', e.target.value)}
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
          value={currentElectrical?.voltage}
          onChange={(e) => onChange('voltage', e.target.value)}
        />
      </FormControl>
      {/* Grid Connected */}
      <FormControl fullWidth> 
        <InputLabel id="grid-connected-label">Grid Connected</InputLabel>
        <Select
          labelId="grid-connected-label"
          id="grid-connected-select"
          label="Grid Connected"
          value={currentElectrical?.gridConnected}
          onChange={(e) => onChange('gridConnected', e.target.value)}
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

export default BatteryForm