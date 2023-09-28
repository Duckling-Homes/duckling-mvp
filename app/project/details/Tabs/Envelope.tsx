"use client";

import { Add } from "@mui/icons-material";
import { Button, Chip, IconButton } from "@mui/material";

const Envelope = ({ hidden }) => {
  return (
    <div hidden={hidden}>
      <div>
        <Chip label="Deletable" onDelete={() => console.log('asdad')} />
        <Button startIcon={<Add />}>
          Add Envelope
        </Button>
      </div>
    </div>
  )
}

export default Envelope