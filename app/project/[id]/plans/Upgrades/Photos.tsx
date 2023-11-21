'use client'

import { CameraAlt } from "@mui/icons-material"
import { Button } from "@mui/material"

const Photos = () => {
  return (
    <div className="photos">
      <div className="photos__text">
        <CameraAlt/>
        <p>Photos</p>
      </div>
      <Button
      variant="contained"
      size="small">
        Select Photos
      </Button>
    </div>
  )
}

export default Photos