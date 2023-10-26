'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectAppliance } from "@/types/types";

const HVAC_TYPES = ['Heating', 'Cooling', 'Heat Pump']

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
];

const FUEL = [
  { name: 'Electricity', parent: 'all' },
  { name: 'Natural Gas', parent: 'Heating' },
  { name: 'Fuel Oil', parent: 'Heating' },
  { name: 'Wood Pallet', parent: 'Heating' },
  { name: 'Other', parent: 'all' },
]

interface HVACFormProps {
  onChange: (key: string, value: string | number | boolean) => void
  onUpdate: () => void
  currentAppliance: ProjectAppliance
}

const HVACForm: React.FC<HVACFormProps> = ({
  onChange,
  currentAppliance,
  onUpdate,
}) => {
  return (
    <>
      {/* System Type */}
      <SelectInput
        label="HVAC System Type"
        value={currentAppliance?.hvacSystemType || ''}
        onChange={(value) => onChange('hvacSystemType', value)}
        onBlur={onUpdate}
        options={HVAC_TYPES}
      />
      {/* System */}
      <SelectInput
        label="HVAC System"
        value={currentAppliance?.havcSystem || ''}
        onChange={(value) => onChange('havcSystem', value)}
        onBlur={onUpdate}
        disabled={currentAppliance?.hvacSystemType ? false : true}
        options={HVAC_SYSTEMS}
        parent={currentAppliance?.hvacSystemType}
      />
      {/* Fuel */}
      <SelectInput
        label="Fuel"
        value={currentAppliance?.fuel || ''}
        onChange={(value) => onChange('fuel', value)}
        onBlur={onUpdate}
        disabled={currentAppliance?.hvacSystemType ? false : true}
        options={FUEL}
        parent={currentAppliance?.hvacSystemType}
      />
      {/* Age */}
      <TextInput
        label="Age"
        placeholder="Age"
        type="tel"
        onChange={(value) => onChange('age', parseInt(value))}
        onBlur={onUpdate}
        value={currentAppliance?.age || ''}
        endAdornment='Years'
      />
      {/* manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={onUpdate}
        value={currentAppliance?.manufacturer || ''}
      />
      {/* model number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={onUpdate}
        value={currentAppliance?.modelNumber || ''}
      />
      {/* serial number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={onUpdate}
        value={currentAppliance?.serialNumber || ''}
      />
      {/* heating */}
      <TextInput
        label="Heating Capacity"
        placeholder="Heating Capacity"
        onChange={(value) => onChange('heatingCapacity', value)}
        onBlur={onUpdate}
        value={currentAppliance?.heatingCapacity || ''}
        endAdornment='BTU/hr'
      />
      {/* cooling capacity */}
      <TextInput
        label="Cooling Capacity"
        placeholder="Cooling Capacity"
        onChange={(value) => onChange('coolingCapacity', value)}
        onBlur={onUpdate}
        value={currentAppliance?.coolingCapacity || ''}
        endAdornment='BTU/hr'
      />
      {/* location */}
      <TextInput
        label="Location"
        placeholder="Location"
        onChange={(value) => onChange('location', value)}
        onBlur={onUpdate}
        value={currentAppliance?.location || ''}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        onChange={(value) => onChange('notes', value)}
        onBlur={onUpdate}
        value={currentAppliance?.notes || ''}
        multiline={true}
      />
    </>
  )
}

export default HVACForm
