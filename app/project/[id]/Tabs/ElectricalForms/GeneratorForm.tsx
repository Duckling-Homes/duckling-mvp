'use client'

import { TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const FUEL = ['Natural gas', 'Propane', 'Diesel', 'Gasoline']

interface GeneratorFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: () => void
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Generator Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">Generator Type</InputLabel>
        <Select
          labelId="generator-type-label"
          id="generator-type-select"
          label="Generator Type"
          value={currentElectrical?.generatorType}
          onChange={(e) => onChange('generatorType', e.target.value)}
          onBlur={() => onUpdate()}
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
          value={currentElectrical?.fuelType}
          onChange={(e) => onChange('fuelType', e.target.value)}
          onBlur={() => onUpdate()}
        >
          {FUEL.map((fuel, i) => (
            <MenuItem key={i} value={fuel}>
              {fuel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Rated Continuous Wattage */}
      <FormControl fullWidth> 
        <TextInput
          label="Rated Continuous Wattage"
          placeholder="Rated Continuous Wattage"
          type="number"
          value={currentElectrical?.ratedContinuousWattage || ''}
          onChange={(value) => onChange('ratedContinuousWattage', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Rated Peak Wattage */}
      <FormControl fullWidth> 
        <TextInput
          label="Rated Peak Wattage"
          placeholder="Rated Peak Wattage"
          type="number"
          value={currentElectrical?.ratedPeakWattage || ''}
          onChange={(value) => onChange('ratedPeakWattage', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Voltage */}
      <FormControl fullWidth>
        <TextInput
          label="Voltage"
          placeholder="Voltage"
          type="number"
          value={currentElectrical?.voltage || ''}
          onChange={(value) => onChange('voltage', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Number of Phases */}
      <FormControl fullWidth>
        <InputLabel id="number-phases-label">Number of Phases</InputLabel>
        <Select
          labelId="number-phases-label"
          id="number-phases-select"
          label="Number of Phases"
          value={currentElectrical?.numberOfPhases}
          onChange={(e) => onChange('numberOfPhases', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value={'1'}>1-Phase</MenuItem>
          <MenuItem value={'3'}>3-Phase</MenuItem>
        </Select>
      </FormControl>
      {/* Transfer Switch */}
      <FormControl fullWidth>
        <InputLabel id="transfer-switch-label">Transfer Switch</InputLabel>
        <Select
          labelId="transfer-switch-label"
          id="transfer-switch-select"
          label="Transfer Switch"
          value={currentElectrical?.transferSwitch}
          onChange={(e) => onChange('transferSwitch', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value="Automatic">Automatic</MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
        </Select>
      </FormControl>
      {/* Connection Method */}
      <FormControl fullWidth>
        <InputLabel id="connection-method-label">Connection Method</InputLabel>
        <Select
          labelId="connection-method-label"
          id="connection-method-select"
          label="Connection Method"
          value={currentElectrical?.connection}
          onChange={(e) => onChange('connection', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value="Interlock">Interlock</MenuItem>
          <MenuItem value="Main Panel">Main Panel</MenuItem>
          <MenuItem value="Sub-Panel">Sub-Panel</MenuItem>
        </Select>
      </FormControl>
      {/* Location */}
      <FormControl fullWidth> 
        <TextInput
          label="Location"
          placeholder="Location"
          value={currentElectrical?.location || ''}
          onChange={(value) => onChange('location', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Year Installed */}
      {/* TODO: use date picker here */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Year Installed"
          variant="outlined"
          placeholder="Year Installed"
          type="text"
          value={currentElectrical?.yearInstalled}
          onChange={(e) => onChange('yearInstalled', parseInt(e.target.value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Manufacturer */}
      <FormControl fullWidth> 
        <TextInput
          label="Manufacturer"
          placeholder="Manufacturer"
          value={currentElectrical?.manufacturer || ''}
          onChange={(value) => onChange('manufacturer', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Model Number */}
      <FormControl fullWidth> 
        <TextInput
          label="Model Number"
          placeholder="Model Number"
          value={currentElectrical?.modelNumber || ''}
          onChange={(value) => onChange('modelNumber', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Serial Number */}
      <FormControl fullWidth> 
        <TextInput
          label="Serial Number"
          placeholder="Serial Number"
          value={currentElectrical?.serialNumber || ''}
          onChange={(value) => onChange('serialNumber', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* notes */}
      <FormControl fullWidth> 
        <TextInput
          label="Notes"
          placeholder="Notes"
          value={currentElectrical?.notes || ''}
          onChange={(value) => onChange('notes', value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
    </>
  )
}

export default GeneratorForm
