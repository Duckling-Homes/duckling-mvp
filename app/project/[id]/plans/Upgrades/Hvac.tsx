'use client'

import { Add, DeviceThermostat } from "@mui/icons-material"
import { Button } from "@mui/material"

import './style.scss'

const Hvac = () => {
  return (
    <div className="hvac">
      <div className="hvac__text">
        <DeviceThermostat/>
        <p>HVAC</p>
      </div>
      <Button
      variant="contained"
      size="small"
      startIcon={<Add />}>
        Add
      </Button>
    </div>
  )
}

export default Hvac