"use client";

import { AddPhotoAlternate } from "@mui/icons-material";
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";

const TODAY = new Date();

const MOCK_PROJECT = {
  square_footage: '2500',
  room_count: '8',
  bathroom_count: '2',
  bedroom_count: '3',
  stories: '2',
  year_built: '1975',
  basement_type: 'Finished',
}

const Basics = ({ }) => {
  const [data, setData] = useState(MOCK_PROJECT)

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
            type="number"
            value={data.square_footage}
            onWheel={() => document.activeElement.blur()}
          />
          <TextField
            id="outlined-basic"
            label="Number of Rooms"
            variant="outlined"
            placeholder='Number of Rooms'
            type="number"
            value={data.room_count}
            onWheel={() => document.activeElement.blur()}
          />
          <TextField
            id="outlined-basic"
            label="Number of Bathrooms"
            variant="outlined"
            placeholder='Number of Bathrooms'
            type="number"
            value={data.bathroom_count}
            onWheel={() => document.activeElement.blur()}
          />
          <TextField
            id="outlined-basic"
            label="Stories"
            variant="outlined"
            placeholder='Stories'
            type="number"
            value={data.stories}
            onWheel={() => document.activeElement.blur()}
          />
          <DatePicker
            label={"Year Built"}
            openTo="year"
            views={['year']}
            // value={data.year_built}
            // maxDate={TODAY}
          />
          <FormControl fullWidth>
            <InputLabel id="basement-type-label">Basement Type</InputLabel>
            <Select
              labelId="basement-type-label"
              id="basement-type-select"
              label="Basement Type"
              value={data.basement_type}
            >
              <MenuItem value={'Finished'}>Finished</MenuItem>
              <MenuItem value={'Unfinished'}>Unfinished</MenuItem>
              <MenuItem value={'Crawlspace'}>Crawlspace</MenuItem>
              <MenuItem value={'No Basement'}>No Basement</MenuItem>
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