'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectAppliance } from "@/types/types";

const HVAC_TYPES = ['Heating', 'Cooling', 'Heat Pump']

const HVAC_SYSTEMS = [
  { name: "Furnace", value: "furnace", parent: "Heating" },
  { name: "Boiler", value: "boiler", parent: "Heating" },
  { name: "Baseboard", value: "baseboard", parent: "Heating" },
  { name: "Stove", value: "stove", parent: "Heating" },
  { name: "Solar Thermal",value: "solar thermal", parent: "Heating" },
  { name: "Other", value: "other", parent: "Heating" },
  { name: "Central Air Conditioner", value: "central air conditioner", parent: "Cooling" },
  { name: "Mini-Split", value: "mini-split", parent: "Cooling" },
  { name: "Other", value: "other", parent: "Cooling" },
  { name: "Mini-Split", value: "mini-split", parent: "Heat Pump" },
  { name: "Central", value: "central", parent: "Heat Pump" },
];

const FUEL = [
  { name: 'Electricity', value: "electricity", parent: 'all' },
  { name: 'Natural Gas', value: "natural gas", parent: 'Heating' },
  { name: 'Fuel Oil', value: "fuel oil", parent: 'Heating' },
  { name: 'Wood Pallet', value: "wood pallet", parent: 'Heating' },
  { name: 'Other', value: "other", parent: 'all' },
]

interface HVACFormProps {
  onChange: (key: string, value: string | number | boolean) => void
  onUpdate: (inputName: string) => void
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
        onBlur={() => onUpdate('hvacSystemType')}
        options={HVAC_TYPES}
      />
      {/* System */}
      <SelectInput
        label="HVAC System"
        value={currentAppliance?.havcSystem || ''}
        onChange={(value) => onChange('havcSystem', value)}
        onBlur={() => onUpdate('havcSystem')}
        disabled={currentAppliance?.hvacSystemType ? false : true}
        options={HVAC_SYSTEMS}
        parent={currentAppliance?.hvacSystemType}
        helperText={
          currentAppliance?.hvacSystemType ? '' : 'You need to select a HVAC System Type below before you can use this field.'
        }
      />
      {/* Fuel */}
      <SelectInput
        label="Fuel"
        value={currentAppliance?.fuel || ''}
        onChange={(value) => onChange('fuel', value)}
        onBlur={() => onUpdate('fuel')}
        disabled={currentAppliance?.hvacSystemType ? false : true}
        options={FUEL}
        parent={currentAppliance?.hvacSystemType}
        helperText={
          currentAppliance?.hvacSystemType ? '' : 'You need to select a HVAC System Type below before you can use this field.'
        }
      />
      {/* Age */}
      <TextInput
        label="Age"
        placeholder="Age"
        type="tel"
        onChange={(value) => onChange('age', parseInt(value))}
        onBlur={() => onUpdate('age')}
        value={currentAppliance?.age || ''}
        endAdornment='Years'
      />
      {/* manufacturer */}
      <TextInput
        label="Manufacturer"
        placeholder="Manufacturer"
        onChange={(value) => onChange('manufacturer', value)}
        onBlur={() => onUpdate('manufacturer')}
        value={currentAppliance?.manufacturer || ''}
      />
      {/* model number */}
      <TextInput
        label="Model Number"
        placeholder="Model Number"
        onChange={(value) => onChange('modelNumber', value)}
        onBlur={() => onUpdate('modelNumber')}
        value={currentAppliance?.modelNumber || ''}
      />
      {/* serial number */}
      <TextInput
        label="Serial Number"
        placeholder="Serial Number"
        onChange={(value) => onChange('serialNumber', value)}
        onBlur={() => onUpdate('serialNumber')}
        value={currentAppliance?.serialNumber || ''}
      />
      {/* heating */}
      <TextInput
        label="Heating Capacity"
        placeholder="Heating Capacity"
        type="tel"
        onChange={(value) => onChange('heatingCapacity', parseInt(value))}
        onBlur={() => onUpdate('heatingCapacity')}
        value={currentAppliance?.heatingCapacity || ''}
        endAdornment='BTU/hr'
      />
      {/* cooling capacity */}
      <TextInput
        label="Cooling Capacity"
        placeholder="Cooling Capacity"
        type="tel"
        onChange={(value) => onChange('coolingCapacity', parseInt(value))}
        onBlur={() => onUpdate('coolingCapacity')}
        value={currentAppliance?.coolingCapacity || ''}
        endAdornment='BTU/hr'
      />
      {/* location */}
      <TextInput
        label="Location"
        placeholder="Location"
        onChange={(value) => onChange('location', value)}
        onBlur={() => onUpdate('location')}
        value={currentAppliance?.location || ''}
      />
      {/* notes */}
      <TextInput
        label="Notes"
        placeholder="Notes"
        onChange={(value) => onChange('notes', value)}
        onBlur={() => onUpdate('notes')}
        value={currentAppliance?.notes || ''}
        multiline={true}
      />
    </>
  )
}

export default HVACForm
