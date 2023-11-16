'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";

const LOCATIONS = ['Roof', 'Ground', 'Other']

const OWNERSHIPS = ['Owned', 'Leased', 'PPA', 'Utility Owned', 'Other']

const MODULE_TYPES = ['Thin Film', 'Premium', 'Standard']

const TRACKINGS = ['Fixed', '2-Axis', '1-Axis Backtracked', '1-Axis']

const ORIENTATIONS = [
  'East',
  'West',
  'North',
  'Northeast',
  'Northwest',
  'South',
  'Southeast',
  'Southwest',
]

interface SolarPanelFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: (inputName: string) => void
}

const SolarPanelForm: React.FC<SolarPanelFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Location */}
      <SelectInput
        label="Location"
        value={currentElectrical?.location || ''}
        onChange={(value) => onChange('location', value)}
        onBlur={() => onUpdate('location')}
        options={LOCATIONS}
      />
      {/* Ownership */}
      <SelectInput
        label="Ownership"
        value={currentElectrical?.ownership || ''}
        onChange={(value) => onChange('ownership', value)}
        onBlur={() => onUpdate('ownership')}
        options={OWNERSHIPS}
      />
      {/* Module Type */}
      <SelectInput
        label="Module Type"
        value={currentElectrical?.moduleType || ''}
        onChange={(value) => onChange('moduleType', value)}
        onBlur={() => onUpdate('moduleType')}
        options={MODULE_TYPES}
      />
      {/* Tracking */}
      <SelectInput
        label="Tracking"
        value={currentElectrical?.tracking || ''}
        onChange={(value) => onChange('tracking', value)}
        onBlur={() => onUpdate('tracking')}
        options={TRACKINGS}
      />
      {/* Orientation */}
      <SelectInput
        label="Orientation"
        value={currentElectrical?.arrayOrientation || ''}
        onChange={(value) => onChange('arrayOrientation', value)}
        onBlur={() => onUpdate('arrayOrientation')}
        options={ORIENTATIONS}
      />
      {/* Tilt */}
      <TextInput
        label="Tilt"
        placeholder="Tilt"
        type="tel"
        value={currentElectrical?.arrayTilt || ''}
        onChange={(value) => onChange('arrayTilt', parseInt(value))}
        onBlur={() => onUpdate('arrayTilt')}
        endAdornment='Degrees'
      />
      {/* Max Output */}
      <TextInput
        label="Max Output"
        placeholder="Max Output"
        type="tel"
        value={currentElectrical?.maxPowerOutput || ''}
        onChange={(value) => onChange('maxPowerOutput', parseInt(value))}
        onBlur={() => onUpdate('maxPowerOutput')}
        endAdornment='DC Watts'
      />
      {/* Number of Panels */} 
      <TextInput
        label="Number of Panels"
        placeholder="Number of Panels"
        type="tel"
        value={currentElectrical?.numberOfPanels || ''}
        onChange={(value) => onChange('numberOfPanels', parseInt(value))}
        onBlur={() => onUpdate('numberOfPanels')}
      />
      {/* Year Installed */}
      <TextInput
        label="Year Installed"
        placeholder="Year Installed"
        onChange={(value) =>
          onChange('yearInstalled', value)}
        onBlur={() => onUpdate('yearInstalled')}
        value={currentElectrical?.yearInstalled || ''}
      />
      {/* Annual Output */}
      <TextInput
        label="Annual Output"
        placeholder="Annual Output"
        type="tel"
        value={currentElectrical?.annualOutput || ''}
        onChange={(value) => onChange('annualOutput', parseInt(value))}
        onBlur={() => onUpdate('annualOutput')}
        endAdornment='kWh'
      />
      {/* Notes */}
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

export default SolarPanelForm
