"use client";

import React, { useEffect, useState } from "react";
import ModelStore from "@/app/stores/modelStore";
import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Project } from "@/types/types";
import dayjs from "dayjs";

interface BasicsProps {
  currentProject: Project
}

const Basics: React.FC<BasicsProps> = ({ currentProject }) => {
  const [data, setData] = useState<Project["data"]>({
    squareFootage: 0,
    roomCount: 0,
    bathroomCount: 0,
    stories: 0,
    yearBuilt: 0,
    basementType: '',
  });

  useEffect(() => {
    if (currentProject?.data) {
      setData(currentProject.data);
    }
  }, [currentProject]);

  const handleInputChange = async (inputName: string, value: string | number) => {
    if (currentProject && currentProject.id) {
      const updatedData = { ...data, [inputName]: value };
      setData(updatedData);
      await ModelStore.patchProjectData(currentProject.id, updatedData);
    }
  };

  const blurActiveElement = () => {
    const activeElement = document.activeElement as HTMLInputElement;
    if (activeElement) {
      activeElement.blur();
    }
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
            value={data?.squareFootage || ''}
            onChange={(e) => handleInputChange('squareFootage', parseInt(e.target.value))}
            onWheel={blurActiveElement}
          />
          <TextField
            id="outlined-basic"
            label="Number of Rooms"
            variant="outlined"
            placeholder='Number of Rooms'
            type="number"
            value={data?.roomCount || ''}
            onChange={(e) => handleInputChange('roomCount', parseInt(e.target.value))}
            onWheel={blurActiveElement}
          />
          <TextField
            id="outlined-basic"
            label="Number of Bathrooms"
            variant="outlined"
            placeholder='Number of Bathrooms'
            type="number"
            value={data?.bathroomCount || ''}
            onChange={(e) => handleInputChange('bathroomCount', parseInt(e.target.value))}
            onWheel={blurActiveElement}
          />
          <TextField
            id="outlined-basic"
            label="Stories"
            variant="outlined"
            placeholder='Stories'
            type="number"
            value={data?.stories || ''}
            onChange={(e) => handleInputChange('stories', parseInt(e.target.value))}
            onWheel={blurActiveElement}
          />
          <DatePicker
            label="Year Built"
            openTo="year"
            views={['year']}
            onChange={(e) => handleInputChange('yearBuilt', e!.year())}
            value={data && typeof data.yearBuilt === 'number' ? dayjs(new Date(data.yearBuilt, 0)) : dayjs()}
            maxDate={dayjs()}
          />
          <FormControl fullWidth>
            <InputLabel id="basement-type-label">Basement Type</InputLabel>
            <Select
              labelId="basement-type-label"
              id="basement-type-select"
              label="Basement Type"
              value={data?.basementType || ''}
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