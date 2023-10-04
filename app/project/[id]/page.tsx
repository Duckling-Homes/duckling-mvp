'use client'

import { Container } from '@/components/Container'
import { CalendarMonth, Edit, Home, Person } from '@mui/icons-material'
import { Button, Tab, Tabs } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import PlaceHolderPhoto from '../../assets/placeholder-image.png'
import {
  Appliances,
  Basics,
  Electrical,
  Envelope,
  Objectives,
  Photos,
  Rooms,
} from './Tabs/index'

import './style.scss'

const DataCollection = () => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div hidden={value !== index}>{component}</div>
  )

  return (
    <Container>
      <div className="dataCollection">
        <div className="dataCollection__header">
          <div className="dataCollection__photoWrapper">
            <Image src={PlaceHolderPhoto} alt="project-image" />
            <Button variant="contained" size="small">
              Add Photo
            </Button>
          </div>
          <div className="dataCollection__projectInfo">
            <p className="dataCollection__title">1640 Riverside Drive</p>
            <div className="dataCollection__infoWrapper">
              <span className="dataCollection__info">
                <Home />
                1640 Riverside Drive, Hill Valley, CA
              </span>
              <span className="dataCollection__info">
                <Person /> Emmett Brown
              </span>
              <span className="dataCollection__info">
                <CalendarMonth /> August 8, 2023
              </span>
            </div>
          </div>
          <Button variant="contained" size="small" startIcon={<Edit />}>
            Edit
          </Button>
        </div>
        <div
          style={{
            padding: '8px 24px 16px 24px',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
          }}
        >
          <Button variant="outlined">Home Info</Button>
          <Button variant="outlined">Plans</Button>
          <Button variant="outlined">Present</Button>
        </div>
        <div>
          <Tabs
            sx={{ background: '#FAFAFA' }}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Basics" />
            <Tab label="Objectives" />
            <Tab label="Envelope" />
            <Tab label="Rooms" />
            <Tab label="Appliances" />
            <Tab label="Electrical" />
            <Tab label="Photos" />
          </Tabs>
          {renderTabContent(0, <Basics />)}
          {renderTabContent(1, <Objectives />)}
          {renderTabContent(2, <Envelope />)}
          {renderTabContent(3, <Rooms />)}
          {renderTabContent(4, <Appliances />)}
          {renderTabContent(5, <Electrical />)}
          {renderTabContent(6, <Photos />)}
        </div>
      </div>
    </Container>
  )
}

export default DataCollection
