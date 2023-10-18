"use client";

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const LOCATIONS = [
  "Roof",
  "Ground",
  "Other",
]

const OWNERSHIPS = [
  "Owned",
  "Leased",
  "PPA",
  "Utility Owned",
  "Other",
]

const MODULE_TYPES = [
  "Thin Film",
  "Premium",
  "Standard",
]

const TRACKINGS = [
  "Fixed",
  "2-Axis",
  "1-Axis Backtracked",
  "1-Axis",
]

const ORIENTATIONS = [
  "East",
  "West",
  "North",
  "Northeast",
  "Northwest",
  "South",
  "Southeast",
  "Southwest",
]

const SolarPanelForm = ({ currentElectrical, onChange }) => {
  
  return (
    <>
      {/* Location */}
      <FormControl fullWidth>
        <InputLabel id="location-label">Location</InputLabel>
        <Select
          labelId="location-label"
          id="location-select"
          label="Location"
        >
          {
            LOCATIONS.map((location, i) => (
              <MenuItem key={i} value={location}>{location}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Ownership */}
      <FormControl fullWidth>
        <InputLabel id="ownership-label">Ownership</InputLabel>
        <Select
          labelId="ownership-label"
          id="ownership-select"
          label="Ownership"
        >
          {
            OWNERSHIPS.map((ownership, i) => (
              <MenuItem key={i} value={ownership}>{ownership}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Module Type */}
      <FormControl fullWidth>
        <InputLabel id="module-type-label">Module Type</InputLabel>
        <Select
          labelId="module-type-label"
          id="module-type-select"
          label="Module Type"
        >
          {
            MODULE_TYPES.map((type, i) => (
              <MenuItem key={i} value={type}>{type}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Tracking */}
      <FormControl fullWidth>
        <InputLabel id="tracking-label">Tracking</InputLabel>
        <Select
          labelId="tracking-label"
          id="tracking-select"
          label="Tracking"
        >
          {
            TRACKINGS.map((tracking, i) => (
              <MenuItem key={i} value={tracking}>{tracking}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Orientation */}
      <FormControl fullWidth>
        <InputLabel id="orientation-label">Orientation</InputLabel>
        <Select
          labelId="orientation-label"
          id="orientation-select"
          label="Orientation"
        >
          {
            ORIENTATIONS.map((orientation, i) => (
              <MenuItem key={i} value={orientation}>{orientation}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {/* Tilt */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Tilt"
          variant="outlined"
          placeholder='Tilt'
          type="text"
        />
      </FormControl>
      {/* Max Output */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Max Output"
          variant="outlined"
          placeholder='Max Output'
          type="text"
        />
      </FormControl>
      {/* Number of Panels */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Number of Panels"
          variant="outlined"
          placeholder='Number of Panels'
          type="text"
        />
      </FormControl>
      {/* Year Installed */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Year Installed"
          variant="outlined"
          placeholder='Year Installed'
          type="text"
        />
      </FormControl>
      {/* Annual Output */}
      <FormControl fullWidth> 
        <TextField
          id="outlined-basic"
          label="Annual Output"
          variant="outlined"
          placeholder='Annual Output'
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

export default SolarPanelForm