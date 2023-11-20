'use client'

import { Add, Home } from "@mui/icons-material"
import { Button } from "@mui/material"

import './style.scss'

const HomePerformance = () => {
  return (
    <div className="homePerformance">
      <div className="homePerformance__text">
        <Home/>
        <p>Home Performance</p>
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

export default HomePerformance