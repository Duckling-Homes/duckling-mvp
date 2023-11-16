'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";

const FUEL = ['Natural gas', 'Propane', 'Diesel', 'Gasoline']

interface GeneratorFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: (inputName: string) => void
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Generator Type */}
      <SelectInput
        label="Generator Type"
        value={currentElectrical?.generatorType || ''}
        onChange={(value) => onChange('generatorType', value)}
        onBlur={() => onUpdate('generatorType')}
        options={['Standby', 'Portable']}
      />
      {/* Fuel Type */}
      <SelectInput
        label="Fuel Type"
        value={currentElectrical?.fuelType || ''}
        onChange={(value) => onChange('fuelType', value)}
        onBlur={() => onUpdate('fuelType')}
        options={FUEL}
      />
      {/* Rated Continuous Wattage */}
      <TextInput
        label="Rated Continuous Wattage"
        placeholder="Rated Continuous Wattage"
        type="tel"
        value={currentElectrical?.ratedContinuousWattage || ''}
        onChange={(value) => onChange('ratedContinuousWattage', parseInt(value))}
        onBlur={() => onUpdate('ratedContinuousWattage')}
        endAdornment='kW'
      />
      {/* Rated Peak Wattage */}
      <TextInput
        label="Rated Peak Wattage"
        placeholder="Rated Peak Wattage"
        type="tel"
        value={currentElectrical?.ratedPeakWattage || ''}
        onChange={(value) => onChange('ratedPeakWattage', parseInt(value))}
        onBlur={() => onUpdate('ratedPeakWattage')}
        endAdornment='kW'
      />
      {/* Voltage */}
      <TextInput
        label="Voltage"
        placeholder="Voltage"
        type="tel"
        value={currentElectrical?.voltage || ''}
        onChange={(value) => onChange('voltage', parseInt(value))}
        onBlur={() => onUpdate('voltage')}
        endAdornment='Amps'
      />
      {/* Number of Phases */}
      <SelectInput
        label="Number of Phases"
        value={currentElectrical?.numberOfPhases || ''}
        onChange={(value) => onChange('numberOfPhases', value)}
        onBlur={() => onUpdate('numberOfPhases')}
        options={[{name: '1-Phase', value: '1'}, {name: '3-Phase', value: '3'}]}
      />
      {/* Transfer Switch */}
      <SelectInput
        label="Transfer Switch"
        value={currentElectrical?.transferSwitch || ''}
        onChange={(value) => onChange('transferSwitch', value)}
        onBlur={() => onUpdate('transferSwitch')}
        options={['Automatic', 'Manual']}
      />
      {/* Connection Method */}
      <SelectInput
        label="Connection Method"
        value={currentElectrical?.connection || ''}
        onChange={(value) => onChange('connection', value)}
        onBlur={() => onUpdate('connection')}
        options={['Interlock', 'Main Panel', 'Sub-Panel']}
      />
      {/* Location */}
      <TextInput
        label="Location"
        placeholder="Location"
        value={currentElectrical?.location || ''}
        onChange={(value) => onChange('location', value)}
        onBlur={() => onUpdate('location')}
      />
      {/* Year Installed */}
      <TextInput
        label="Year Installed"
        placeholder="Year Installed"
        type="tel"
        onChange={(value) =>
          onChange('yearInstalled', parseInt(value))}
        onBlur={() => onUpdate('yearInstalled')}
        value={currentElectrical?.yearInstalled || ''}
      />
      {/* Manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        value={currentElectrical?.manufacturer || ''}
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={() => onUpdate('manufacturer')}
      />
      {/* Model Number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        value={currentElectrical?.modelNumber || ''}
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={() => onUpdate('modelNumber')}
      />
      {/* Serial Number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        value={currentElectrical?.serialNumber || ''}
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={() => onUpdate('serialNumber')}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        value={currentElectrical?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={() => onUpdate('notes')}
        multiline={true}
      />
    </>
  )
}

export default GeneratorForm
