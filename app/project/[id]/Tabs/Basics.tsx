"use client";

import ModelStore from "@/app/stores/modelStore";
import { AddPhotoAlternate } from "@mui/icons-material";
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { set } from "mobx";
import { useState } from "react";

const Basics = ({ projectData, projectId}) => {
  const [data, setData] = useState(projectData)

  const handleInputChange = async (inputName, value) => {
    setData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));

    await ModelStore.patchProjectData(projectId, { ...data, [inputName]: value });
  };

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
            value={data.squareFootage}
            onChange={(e) => handleInputChange('squareFootage', parseInt(e.target.value))}
            onWheel={() => {
              const activeElement = document.activeElement as HTMLInputElement;
              if (activeElement) {
                activeElement.blur();
              }
            }}
          />
          <TextField
            id="outlined-basic"
            label="Number of Rooms"
            variant="outlined"
            placeholder='Number of Rooms'
            type="number"
            value={data.roomCount}
            onChange={(e) => handleInputChange('roomCount', parseInt(e.target.value))}
            onWheel={() => {
              const activeElement = document.activeElement as HTMLInputElement;
              if (activeElement) {
                activeElement.blur();
              }
            }}
          />
          <TextField
            id="outlined-basic"
            label="Number of Bathrooms"
            variant="outlined"
            placeholder='Number of Bathrooms'
            type="number"
            value={data.bathroomCount}
            onChange={(e) => handleInputChange('bathroomCount', parseInt(e.target.value))}
            onWheel={() => {
              const activeElement = document.activeElement as HTMLInputElement;
              if (activeElement) {
                activeElement.blur();
              }
            }}
          />
          <TextField
            id="outlined-basic"
            label="Stories"
            variant="outlined"
            placeholder='Stories'
            type="number"
            value={data.stories}
            onChange={(e) => handleInputChange('stories', parseInt(e.target.value))}
            onWheel={() => {
              const activeElement = document.activeElement as HTMLInputElement;
              if (activeElement) {
                activeElement.blur();
              }
            }}
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
              value={data.basementType}
              onChange={(e) => handleInputChange('basementType', e.target.value)}
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