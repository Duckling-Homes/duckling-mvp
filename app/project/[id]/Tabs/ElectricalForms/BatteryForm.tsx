"use client";

import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface BatteryFormProps {
  currentElectrical: ProjectElectrical;
  onChange: (key: string, value: number | string | boolean) => void;
  onUpdate: () => void;
}

const BatteryForm: React.FC<BatteryFormProps> = ({ currentElectrical, onChange, onUpdate }) => {
  
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
          onChange={(e) => onChange('totalCapacity', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Rated Power Output */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Rated Power Output"
          variant="outlined"
          placeholder='Rated Power Output'
          type="number"
          value={currentElectrical?.ratedPowerOutput}
          onChange={(e) => onChange('ratedPowerOutput', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Peak Power Output */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Peak Power Output"
          variant="outlined"
          placeholder='Peak Power Output'
          type="number"
          value={currentElectrical?.ratedPeakOutput}
          onChange={(e) => onChange('ratedPeakOutput', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Voltage */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Voltage"
          variant="outlined"
          placeholder='Voltage'
          type="number"
          value={currentElectrical?.voltage}
          onChange={(e) => onChange('voltage', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
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
          onBlur={() => onUpdate()}
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
          onBlur={() => onUpdate()}
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
          onBlur={() => onUpdate()}
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
          onBlur={() => onUpdate()}
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
          onBlur={() => onUpdate()}
        />
      </FormControl>
    </>
  )
}

export default BatteryForm