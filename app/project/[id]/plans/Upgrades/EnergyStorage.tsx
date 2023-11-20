'use client'

import { Add, Bolt, Home } from "@mui/icons-material"
import { Button } from "@mui/material"

import './style.scss'

const EnergyStorage = () => {
  return (
    <div className="energyStorage">
      <div className="energyStorage__text">
        <Bolt/>
        <p>Energy and Storage</p>
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

export default EnergyStorage