'use client'

import { TextInput } from "@/components/Inputs";
import { ProjectElectrical } from "@/types/types";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface ElectricalPanelFormProps {
  currentElectrical: ProjectElectrical
  onChange: (name: string, value: string | number | boolean) => void
  onUpdate: () => void
}

const ElectricalPanelForm: React.FC<ElectricalPanelFormProps> = ({
  currentElectrical,
  onChange,
  onUpdate,
}) => {
  return (
    <>
      {/* Panel Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">Panel Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="Panel Type"
          value={currentElectrical?.panelType}
          onChange={(e) => onChange('panelType', e.target.value)}
          onBlur={() => onUpdate()}
        >
          <MenuItem value={'Main Panel'}>Main Panel</MenuItem>
          <MenuItem value={'Sub-Panel'}>Sub-Panel</MenuItem>
        </Select>
      </FormControl>
      {/* Amperage Rating */}
      <FormControl fullWidth> 
        <TextInput
          label="Amperage Rating"
          placeholder="Amperage Rating"
          type="number"
          value={currentElectrical?.panelAmperageRating || ''}
          onChange={(value) => onChange('panelAmperageRating', parseInt(value))}
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Available Slot for New Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Available Slot for New Circuits"
          placeholder="Available Slot for New Circuits"
          type="number"
          value={currentElectrical?.availableNewCircuits || ''}
          onChange={
            (value) => onChange('availableNewCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 15 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 15 Amp Circuits"
          placeholder="Total 15 Amp Circuits"
          type="number"
          value={currentElectrical?.total15AmpCircuits || ''}
          onChange={
            (value) => onChange('total15AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 20 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 20 Amp Circuits"
          placeholder="Total 20 Amp Circuits"
          type="number"
          value={currentElectrical?.total20AmpCircuits || ''}
          onChange={
            (value) => onChange('total20AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 30 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 30 Amp Circuits"
          placeholder="Total 30 Amp Circuits"
          type="number"
          value={currentElectrical?.total30AmpCircuits || ''}
          onChange={
            (value) => onChange('total30AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 40 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 40 Amp Circuits"
          placeholder="Total 40 Amp Circuits"
          type="number"
          value={currentElectrical?.total40AmpCircuits || ''}
          onChange={
            (value) => onChange('total40AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 50 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 50 Amp Circuits"
          placeholder="Total 50 Amp Circuits"
          type="number"
          value={currentElectrical?.total50AmpCircuits || ''}
          onChange={
            (value) => onChange('total50AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 60 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 60 Amp Circuits"
          placeholder="Total 60 Amp Circuits"
          type="number"
          value={currentElectrical?.total60AmpCircuits || ''}
          onChange={
            (value) => onChange('total60AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Total 70 Amp Circuits */}
      <FormControl fullWidth> 
        <TextInput
          label="Total 70 Amp Circuits"
          placeholder="Total 70 Amp Circuits"
          type="number"
          value={currentElectrical?.total70AmpCircuits || ''}
          onChange={
            (value) => onChange('total70AmpCircuits', parseInt(value))
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Location */}
      <FormControl fullWidth> 
        <TextInput
          label="Location"
          placeholder="Location"
          value={currentElectrical?.location || ''}
          onChange={
            (value) => onChange('location', value)
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
      {/* Notes */}
      <FormControl fullWidth> 
        <TextInput
          label="Notes"
          placeholder="Notes"
          value={currentElectrical?.notes || ''}
          onChange={
            (value) => onChange('notes', value)
          }
          onBlur={() => onUpdate()}
        />
      </FormControl>
    </>
  )
}

export default ElectricalPanelForm
