'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import DatePickerInput from "@/components/Inputs/DatePickerInput";
import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import dayjs from "dayjs";

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
      <SelectInput
        label="Generator Type"
        value={currentElectrical?.generatorType || ''}
        onChange={(value) => onChange('generatorType', value)}
        onBlur={onUpdate}
        options={['Standby', 'Portable']}
      />
      {/* Fuel Type */}
      <SelectInput
        label="Fuel Type"
        value={currentElectrical?.fuelType || ''}
        onChange={(value) => onChange('fuelType', value)}
        onBlur={onUpdate}
        options={FUEL}
      />
      {/* Rated Continuous Wattage */}
      <TextInput
        label="Rated Continuous Wattage"
        placeholder="Rated Continuous Wattage"
        type="number"
        value={currentElectrical?.ratedContinuousWattage || ''}
        onChange={(value) => onChange('ratedContinuousWattage', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Rated Peak Wattage */}
      <TextInput
        label="Rated Peak Wattage"
        placeholder="Rated Peak Wattage"
        type="number"
        value={currentElectrical?.ratedPeakWattage || ''}
        onChange={(value) => onChange('ratedPeakWattage', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Voltage */}
      <TextInput
        label="Voltage"
        placeholder="Voltage"
        type="number"
        value={currentElectrical?.voltage || ''}
        onChange={(value) => onChange('voltage', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Number of Phases */}
      <SelectInput
        label="Number of Phases"
        value={currentElectrical?.numberOfPhases || ''}
        onChange={(value) => onChange('numberOfPhases', value)}
        onBlur={onUpdate}
        options={[{name: '1-Phase', value: '1'}, {name: '3-Phase', value: '3'}]}
      />
      {/* Transfer Switch */}
      <SelectInput
        label="Transfer Switch"
        value={currentElectrical?.transferSwitch || ''}
        onChange={(value) => onChange('transferSwitch', value)}
        onBlur={onUpdate}
        options={['Automatic', 'Manual']}
      />
      {/* Connection Method */}
      <SelectInput
        label="Connection Method"
        value={currentElectrical?.connection || ''}
        onChange={(value) => onChange('connection', value)}
        onBlur={onUpdate}
        options={['Interlock', 'Main Panel', 'Sub-Panel']}
      />
      {/* Location */}
      <TextInput
        label="Location"
        placeholder="Location"
        value={currentElectrical?.location || ''}
        onChange={(value) => onChange('location', value)}
        onBlur={onUpdate}
      />
      {/* Year Installed */}
      <DatePickerInput
        label="Year Installed"
        onChange={(e) => {
          onChange('yearInstalled', e!.year());
          onUpdate();
        }}
        value={currentElectrical && typeof currentElectrical.yearInstalled === 'number' ? dayjs(new Date(currentElectrical.yearInstalled, 0)) : dayjs()}
        maxDate={dayjs()}
      />
      {/* Manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        value={currentElectrical?.manufacturer || ''}
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={onUpdate}
      />
      {/* Model Number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        value={currentElectrical?.modelNumber || ''}
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={onUpdate}
      />
      {/* Serial Number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        value={currentElectrical?.serialNumber || ''}
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={onUpdate}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        value={currentElectrical?.notes || ''}
        onChange={(value) => onChange('notes', value)}
        onBlur={onUpdate}
        multiline={true}
      />
    </>
  )
}

export default GeneratorForm
