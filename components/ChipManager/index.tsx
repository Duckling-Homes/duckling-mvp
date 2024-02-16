'use client'

import { useState } from 'react'
import { Add } from '@mui/icons-material'
import { Button, Chip, Modal } from '@mui/material'
import {
  ProjectAppliance,
  ProjectElectrical,
  ProjectEnvelopeComponent,
  ProjectRoom,
} from '@/types/types'

import './style.scss'
import { observer } from 'mobx-react-lite'

interface ChipManagerProps {
  chips: (
    | ProjectRoom
    | ProjectAppliance
    | ProjectEnvelopeComponent
    | ProjectElectrical
  )[]
  currentChip: string
  chipType: string
  onChipClick: (i: number) => void
  onDelete: (i: string) => void
  onCreate: () => void
}

//TODO: Turn this into a component
const DeleteModal: React.FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
  chipName?: string
}> = ({ open, onClose, onConfirm, chipName }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="deleteModal"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="deleteModal__content">
        <p>
          {chipName
            ? `Are you sure you want to delete envelope: ${chipName}?`
            : 'Are you sure you want to delete this envelope?'}
        </p>
        <div>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="error" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const ChipManager: React.FC<ChipManagerProps> = observer(
  ({ chips, currentChip, chipType, onChipClick, onDelete, onCreate }) => {

    console.log("CHIPS", chips);
    const [toDelete, setToDelete] = useState<{
      id: string
      name: string
    }>({
      id: '',
      name: '',
    })

    const handleDeleteClick = () => {
      onDelete(toDelete.id)
      setToDelete({
        id: '',
        name: '',
      })
    }

    return (
      <>
        <DeleteModal
          open={!!toDelete.name}
          onClose={() =>
            setToDelete({
              id: '',
              name: '',
            })
          }
          onConfirm={handleDeleteClick}
          chipName={toDelete.name}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {chips?.map((chip, i) => (
            <Chip
              label={chip.name || `${chip.type} ${i + 1}`}
              key={i}
              sx={{
                width: '197px',
                justifyContent: 'space-between',
              }}
              color={chip.id === currentChip ? 'primary' : 'default'}
              onClick={() => onChipClick(i)}
              onDelete={() =>
                setToDelete({
                  id: chip.id as string,
                  name: chip.name || 'Unknown Name',
                })
              }
            />
          ))}
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={onCreate}
            sx={{
              width: '200px',
            }}
          >
            Add {chipType}
          </Button>
        </div>
      </>
    )
  }
)

export default ChipManager
