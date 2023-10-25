'use client'

import { ProjectElectrical } from '@/types/types'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

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
        <TextField
          id="outlined-basic"
          label="Rated Continuous Wattage"
          variant="outlined"
          type="number"
          placeholder="Rated Continuous Wattage"
          value={currentElectrical?.ratedContinuousWattage}
          onChange={(e) =>
            onChange('ratedContinuousWattage', parseInt(e.target.value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Rated Peak Wattage */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Rated Peak Wattage"
          variant="outlined"
          placeholder="Rated Peak Wattage"
          type="number"
          value={currentElectrical?.ratedPeakWattage}
          onChange={(e) =>
            onChange('ratedPeakWattage', parseInt(e.target.value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Voltage */}
      <FormControl fullWidth>
        <TextField
          id="outlined-basic"
          label="Voltage"
          variant="outlined"
          placeholder="Voltage"
          type="number"
          value={currentElectrical?.voltage}
          onChange={(e) => onChange('voltage', parseInt(e.target.value))}
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
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          placeholder="Location"
          type="text"
          value={currentElectrical?.location}
          onChange={(e) => onChange('location', e.target.value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Year Installed */}
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
        <TextField
          id="outlined-basic"
          label="Manufacturer"
          variant="outlined"
          placeholder="Manufacturer"
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
          placeholder="Model Number"
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
          placeholder="Serial Number"
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
          placeholder="Notes"
          type="text"
          value={currentElectrical?.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          onBlur={() => onUpdate()}
        />
      </FormControl>
    </>
  )
}

export default GeneratorForm
