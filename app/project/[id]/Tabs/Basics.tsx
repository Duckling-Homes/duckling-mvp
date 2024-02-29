'use client'

import ModelStore from '@/app/stores/modelStore';
import { SelectInput, TextInput } from "@/components/Inputs";
import { Project, ProjectData } from "@/types/types";
import { FullStory, init } from '@fullstory/browser';
import React, { useEffect, useState } from 'react';

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
    init({ orgId: 'o-1NMA36-na1' });
    console.log('init called')
    FullStory('trackEvent', {
      name: 'My Event',
      properties: {
        product: 'Sprockets',
        quantity: 1,
      },
    })
    console.log('track called')
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
          <TextInput
            label="Year Built"
            placeholder="Year Built"
            type="tel"
            value={data?.yearBuilt || ''}
            onChange={(value) => handleInputChange('yearBuilt', parseInt(value))}
            onBlur={updateData}
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
