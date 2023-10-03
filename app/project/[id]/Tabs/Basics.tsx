"use client";

import { AddPhotoAlternate } from "@mui/icons-material";
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Basics = ({ }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{
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
              <MenuItem value={0}>Finished</MenuItem>
              <MenuItem value={1}>Unfinished</MenuItem>
              <MenuItem value={2}>Crawlspace</MenuItem>
              <MenuItem value={2}>No Basement</MenuItem>
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
    </LocalizationProvider>
  )
}

export default Basics