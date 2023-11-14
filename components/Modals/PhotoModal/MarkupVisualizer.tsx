'use client'

import { Button } from '@mui/material'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { PhotoDetails, Project } from '@/types/types'
import ModelStore from '@/app/stores/modelStore'
import { observer } from 'mobx-react-lite'

interface MarkupVisualizerProps {
  setShowVisualizer: (show: boolean) => void
  currentPhoto?: PhotoDetails
  project: Project
  onChange: (values: {
    [key: string]: string | number | boolean | undefined
  }) => void
}

const MarkupVisualizer: React.FC<MarkupVisualizerProps> = observer(
  ({ setShowVisualizer, currentPhoto, project, onChange }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          overflowY: 'auto',
          maxHeight: '600px',
          padding: '20px',
        }}
      >
        {/* photo */}
        <img
          src={currentPhoto?.photoUrl}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
          }}
          alt="Preview"
        />
        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          onClick={() => {
            setShowVisualizer(false)
          }}
        >
          Finished
        </Button>
      </div>
    )
  }
)

export default MarkupVisualizer
