"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const ElectricalPanelForm = ({ currentElectrical, onChange }) => {

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
        >
          <MenuItem value={'Main Panel'}>Main Panel</MenuItem>
          <MenuItem value={'Sub-Panel'}>Sub-Panel</MenuItem>
        </Select>
      </FormControl>
      {/* Amperage Rating */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Amperage Rating"
          variant="outlined"
          placeholder='Amperage Rating'
          value={currentElectrical?.panelAmperageRating}
          onChange={(e) => onChange('panelAmperageRating', e.target.value)}
        />
      </FormControl>
      {/* Available Slot for New Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Available Slot for New Circuits"
          variant="outlined"
          placeholder='Available Slot for New Circuits'
          type="text"
          value={currentElectrical?.availableNewCircuits}
          onChange={(e) => onChange('availableNewCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 15 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 15 Amp Circuits"
          variant="outlined"
          placeholder='Total 15 Amp Circuits'
          type="text"
          value={currentElectrical?.total15AmpCircuits}
          onChange={(e) => onChange('total15AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 20 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 20 Amp Circuits"
          variant="outlined"
          placeholder='Total 20 Amp Circuits'
          type="text"
          value={currentElectrical?.total20AmpCircuits}
          onChange={(e) => onChange('total20AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 30 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 30 Amp Circuits"
          variant="outlined"
          placeholder='Total 30 Amp Circuits'
          type="text"
          value={currentElectrical?.total30AmpCircuits}
          onChange={(e) => onChange('total30AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 40 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 40 Amp Circuits"
          variant="outlined"
          placeholder='Total 40 Amp Circuits'
          type="text"
          value={currentElectrical?.total40AmpCircuits}
          onChange={(e) => onChange('total40AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 50 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 50 Amp Circuits"
          variant="outlined"
          placeholder='Total 50 Amp Circuits'
          type="text"
          value={currentElectrical?.total50AmpCircuits}
          onChange={(e) => onChange('total50AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 60 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 60 Amp Circuits"
          variant="outlined"
          placeholder='Total 60 Amp Circuits'
          type="text"
          value={currentElectrical?.total60AmpCircuits}
          onChange={(e) => onChange('total60AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Total 70 Amp Circuits */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Total 70 Amp Circuits"
          variant="outlined"
          placeholder='Total 70 Amp Circuits'
          type="text"
          value={currentElectrical?.total70AmpCircuits}
          onChange={(e) => onChange('total70AmpCircuits', e.target.value)}
        />
      </FormControl>
      {/* Notes */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          placeholder='Notes'
          type="text"
          value={currentElectrical?.notes}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </FormControl>
    </>
  )
}

export default ElectricalPanelForm