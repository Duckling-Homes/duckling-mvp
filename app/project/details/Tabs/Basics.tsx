"use client";

import { AddPhotoAlternate } from "@mui/icons-material";
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Basics = ({ hidden }) => {
  return (
    <div hidden={hidden} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '32px',
      gap: '24px',
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <TextField
          id="outlined-basic"
          label="Square Footage"
          variant="outlined"
          placeholder='Square Footage'
        />
        <TextField
          id="outlined-basic"
          label="Number of Rooms"
          variant="outlined"
          placeholder='Number of Rooms'
        />
        <TextField
          id="outlined-basic"
          label="Number of Bathrooms"
          variant="outlined"
          placeholder='Number of Bathrooms'
        />
        <TextField
          id="outlined-basic"
          label="Stories"
          variant="outlined"
          placeholder='Stories'
        />
        <DatePicker
          label={"Year Built"}
          openTo="year"
          views={['year']}
        />
        <FormControl fullWidth>
          <InputLabel id="basement-type-label">Basement Type</InputLabel>
          <Select
            labelId="basement-type-label"
            id="basement-type-select"
            label="Basement Type"
          >
            <MenuItem value={0}>No Basement</MenuItem>
            <MenuItem value={1}>Option 2</MenuItem>
            <MenuItem value={2}>Option 3</MenuItem>
          </Select>
        </FormControl>
      </form>
      <Divider />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddPhotoAlternate />}
        >
          Add Photos
        </Button>
      </div>
    </div>
  )
}

export default Basics