'use client'

import React, { useEffect, useState } from 'react'
import ModelStore from '@/app/stores/modelStore'
import { AddPhotoAlternate } from '@mui/icons-material'
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
import { TextInput } from "@/components/Inputs";

interface BasicsProps {
  currentProject: Project
}

const Basics: React.FC<BasicsProps> = ({ currentProject }) => {
  const [data, setData] = useState<Project['data']>()

  useEffect(() => {
    if (!data && currentProject?.data) {
      setData(currentProject.data)
    }
  }, [currentProject.data])

  const handleInputChange = async (
    inputName: string,
    value: string | number
  ) => {
    if (currentProject && currentProject.id) {
      const updatedData = { ...data, [inputName]: value };
      setData(updatedData);
    }
  }

  const updateData = async () => {
    await ModelStore.patchProjectData(currentProject.id as string, data)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          gap: '24px',
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <TextInput
            label="Square Footage"
            placeholder="Square Footage"
            type="number"
            value={data?.squareFootage || ''}
            onChange={(value) => handleInputChange('squareFootage', parseInt(value))}
            onBlur={updateData}
          />
          <TextInput
            label="Number of Rooms"
            placeholder="Number of Rooms"
            type="number"
            value={data?.roomCount || ''}
            onChange={(value) => handleInputChange('roomCount', parseInt(value))}
            onBlur={updateData}
          />
          <TextInput
            label="Number of Bathrooms"
            placeholder="Number of Bathrooms"
            type="number"
            value={data?.bathroomCount || ''}
            onChange={(value) => handleInputChange('bathroomCount', parseInt(value))}
            onBlur={updateData}
          />
          <TextInput
            label="Stories"
            placeholder="Stories"
            type="number"
            value={data?.stories || ''}
            onChange={(value) => handleInputChange('stories', parseInt(value))}
            onBlur={updateData}
          />
          <DatePicker
            label="Year Built"
            openTo="year"
            views={['year']}
            onChange={(e) => handleInputChange('yearBuilt', e!.year())}
            value={
              data && typeof data.yearBuilt === 'number'
                ? dayjs(new Date(data.yearBuilt, 0))
                : dayjs()
            }
            maxDate={dayjs()}
          />
          <FormControl fullWidth>
            <InputLabel id="basement-type-label">Basement Type</InputLabel>
            <Select
              labelId="basement-type-label"
              id="basement-type-select"
              label="Basement Type"
              value={data?.basementType || ''}
              onChange={(e) =>
                handleInputChange('basementType', e.target.value)
              }
            >
              <MenuItem value={'Finished'}>Finished</MenuItem>
              <MenuItem value={'Unfinished'}>Unfinished</MenuItem>
              <MenuItem value={'Crawlspace'}>Crawlspace</MenuItem>
              <MenuItem value={'No Basement'}>No Basement</MenuItem>
            </Select>
          </FormControl>
        </form>
        <Divider />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
