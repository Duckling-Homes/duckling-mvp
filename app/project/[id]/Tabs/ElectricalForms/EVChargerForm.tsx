'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";

const CHARGING_LEVELS = ['Level 1', 'Level 2', 'Level 3']

interface EVChargerFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: (inputName: string) => void
}

const EVChargerForm: React.FC<EVChargerFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Charging Level */}
      <SelectInput
        label="Charging Level"
        value={currentElectrical?.chargingLevel || ''}
        onChange={(value) => onChange('chargingLevel', value)}
        onBlur={() => onUpdate('notes')}
        options={CHARGING_LEVELS}
      />
      {/* Amperage */}
      <TextInput
        label="Amperage"
        placeholder="Amperage"
        type="tel"
        value={currentElectrical?.amperage || ''}
        onChange={(value) => onChange('amperage', parseInt(value))}
        onBlur={() => onUpdate('amperage')}
        endAdornment='Amps'
      />
      {/* AC Power Source Voltage */}
      <TextInput
        label="AC Power Source Voltage"
        placeholder="AC Power Source Voltage"
        type="tel"
        value={currentElectrical?.acPowerSourceVolatge || ''}
        onChange={(value) => onChange('acPowerSourceVolatge', parseInt(value))}
        onBlur={() => onUpdate('acPowerSourceVolatge')}
        endAdornment='V'
      />
      {/* Max Charging Power */}
      <TextInput
        label="Max Charging Power"
        placeholder="Max Charging Power"
        type="tel"
        value={currentElectrical?.maxChargingPower || ''}
        onChange={(value) => onChange('maxChargingPower', parseInt(value))}
        onBlur={() => onUpdate('maxChargingPower')}
        endAdornment='kW'
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

export default EVChargerForm
