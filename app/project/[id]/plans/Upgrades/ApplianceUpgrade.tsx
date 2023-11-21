'use client'

import { Add, Construction } from "@mui/icons-material"
import { Button } from "@mui/material"

import './style.scss'

const ApplianceUpgrades = () => {
  return (
    <div className="applianceUpgrades">
      <div className="applianceUpgrades__text">
        <Construction/>
        <p>Appliance Upgrades</p>
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

export default ApplianceUpgrades