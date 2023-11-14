'use client'

import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'

interface MarkupVisualizerProps {
  setShowVisualizer: (show: boolean) => void
  currentPhoto?: PhotoDetails
}

const MarkupVisualizer: React.FC<MarkupVisualizerProps> = observer(
  ({ setShowVisualizer, currentPhoto }) => {
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
