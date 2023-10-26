'use client'

import { SelectInput, TextInput } from "@/components/Inputs";
import DatePickerInput from "@/components/Inputs/DatePickerInput";
import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import dayjs from "dayjs";

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
  onUpdate: () => void
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
        onBlur={onUpdate}
        options={LOCATIONS}
      />
      {/* Ownership */}
      <SelectInput
        label="Ownership"
        value={currentElectrical?.ownership || ''}
        onChange={(value) => onChange('ownership', value)}
        onBlur={onUpdate}
        options={OWNERSHIPS}
      />
      {/* Module Type */}
      <SelectInput
        label="Module Type"
        value={currentElectrical?.moduleType || ''}
        onChange={(value) => onChange('moduleType', value)}
        onBlur={onUpdate}
        options={MODULE_TYPES}
      />
      {/* Tracking */}
      <SelectInput
        label="Tracking"
        value={currentElectrical?.tracking || ''}
        onChange={(value) => onChange('tracking', value)}
        onBlur={onUpdate}
        options={TRACKINGS}
      />
      {/* Orientation */}
      <SelectInput
        label="Orientation"
        value={currentElectrical?.arrayOrientation || ''}
        onChange={(value) => onChange('arrayOrientation', value)}
        onBlur={onUpdate}
        options={ORIENTATIONS}
      />
      {/* Tilt */}
      <TextInput
        label="Tilt"
        placeholder="Tilt"
        type="number"
        value={currentElectrical?.arrayTilt || ''}
        onChange={(value) => onChange('arrayTilt', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Max Output */}
      <TextInput
        label="Max Output"
        placeholder="Max Output"
        type="number"
        value={currentElectrical?.maxPowerOutput || ''}
        onChange={(value) => onChange('maxPowerOutput', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Number of Panels */} 
      <TextInput
        label="Number of Panels"
        placeholder="Number of Panels"
        type="number"
        value={currentElectrical?.numberOfPanels || ''}
        onChange={(value) => onChange('numberOfPanels', parseInt(value))}
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
      {/* Annual Output */}
      <TextInput
        label="Annual Output"
        placeholder="Annual Output"
        type="number"
        value={currentElectrical?.annualOutput || ''}
        onChange={(value) => onChange('annualOutput', parseInt(value))}
        onBlur={onUpdate}
      />
      {/* Notes */}
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

export default SolarPanelForm
