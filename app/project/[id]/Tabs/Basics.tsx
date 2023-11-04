'use client'

import React, { useEffect, useState } from 'react'
import ModelStore from '@/app/stores/modelStore'
import { Project, ProjectData } from "@/types/types";
import dayjs from "dayjs";
import { SelectInput, TextInput } from "@/components/Inputs";
import DatePickerInput from "@/components/Inputs/DatePickerInput";

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
    await ModelStore.patchProjectData(currentProject.id as string, data as ProjectData)
  }

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
      }}>
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
            type="tel"
            value={data?.squareFootage || ''}
            onChange={(value) => handleInputChange('squareFootage', parseInt(value))}
            onBlur={updateData}
            endAdornment='sq ft'
          />
          <TextInput
            label="Number of Rooms"
            placeholder="Number of Rooms"
            type="tel"
            value={data?.roomCount || ''}
            onChange={(value) => handleInputChange('roomCount', parseInt(value))}
            onBlur={updateData}
          />
          <TextInput
            label="Number of Bathrooms"
            placeholder="Number of Bathrooms"
            type="tel"
            value={data?.bathroomCount || ''}
            onChange={(value) => handleInputChange('bathroomCount', parseInt(value))}
            onBlur={updateData}
          />
          <TextInput
            label="Stories"
            placeholder="Stories"
            type="tel"
            value={data?.stories || ''}
            onChange={(value) => handleInputChange('stories', parseInt(value))}
            onBlur={updateData}
          />
          <DatePickerInput
            label="Year Built"
            onChange={(e) => handleInputChange('yearBuilt', e!.year())}
            value={
              data && typeof data.yearBuilt === 'number'
                ? dayjs(new Date(data.yearBuilt, 0))
                : dayjs()
            }
            maxDate={dayjs()}
          />
          <SelectInput
            label="Basement Type"
            value={data?.basementType || ''}
            onChange={(value) => handleInputChange('basementType', value)}
            options={['Finished', 'Unfinished', 'Crawlspace', 'No Basement']}
            onBlur={updateData}
          />
        </form>
      </div>
    </>
  )
}

export default Basics
