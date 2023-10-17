"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const ElectricalPanelForm = () => {

  return (
    <>
      {/* Panel Type */}
      <FormControl fullWidth>
        <InputLabel id="type-label">Panel Type</InputLabel>
        <Select
          labelId="type-label"
          id="type-select"
          label="Panel Type"
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
          type="number"
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
        />
      </FormControl>
    </>
  )
}

export default ElectricalPanelForm