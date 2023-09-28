"use client";

import { Button, Tab, Tabs } from "@mui/material"
import { CalendarMonth, Edit, Home, Person } from "@mui/icons-material"

import PlaceHolderPhoto from '../../assets/placeholder-image.png'

import './style.scss'
import { useState } from "react"
import {
  Basics, Objectives, Insulation, Rooms,
  Appliances, Electrical, Photos
} from './Tabs/index'
import Image from "next/image";

const DataCollection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="dataCollection">
      <div className="dataCollection__header">
        <div className="dataCollection__photoWrapper">
          <Image src={PlaceHolderPhoto} alt="project-image" />
          <Button
            variant="contained"
            size="small"
          >
            Add Photo
          </Button>
        </div>
        <div className="dataCollection__projectInfo">
          <p className="dataCollection__title">1640 Riverside Drive</p>
          <div className="dataCollection__infoWrapper">
            <span className="dataCollection__info">
              <Home />1640 Riverside Drive, Hill Valley, CA
            </span>
            <span className="dataCollection__info">
              <Person /> Emmett Brown
            </span>
            <span className="dataCollection__info">
              <CalendarMonth /> August 8, 2023
            </span>
          </div>
        </div>
        <Button
          variant="contained"
          size="small"
          startIcon={<Edit />}
        >
          Edit
        </Button>
      </div>
      <div style={{
        padding: '8px 24px 16px 24px',
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
      }}>
        <Button variant="outlined">Home Info</Button>
        <Button variant="outlined">Plans</Button>
        <Button variant="outlined">Present</Button>
      </div>
      <div>
        <Tabs sx={{ background: '#FAFAFA' }}
          variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Basics" {...a11yProps(0)} />
          <Tab label="Objectives" {...a11yProps(1)} />
          <Tab label="Insulation" {...a11yProps(2)} />
          <Tab label="Rooms" {...a11yProps(3)} />
          <Tab label="Appliances" {...a11yProps(4)} />
          <Tab label="Electrical" {...a11yProps(5)} />
          <Tab label="Photos" {...a11yProps(6)} />
        </Tabs>
        <Basics hidden={value !== 0} />
        <Objectives hidden={value !== 1} />
        <Insulation hidden={value !== 2} />
        <Rooms hidden={value !== 3} />
        <Appliances hidden={value !== 4} />
        <Electrical hidden={value !== 5} />
        <Photos hidden={value !== 6} />
      </div>
    </div>
  )
}

export default DataCollection