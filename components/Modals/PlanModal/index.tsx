import React, { useEffect, useState } from 'react'
import { Check, Close } from '@mui/icons-material'
import {
  Button,
  IconButton,
  Modal,
} from '@mui/material'
import { TextInput } from '@/components/Inputs'

type PlanModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (name: string) => void
  editMode: boolean
  currentName: string
}

const PlanModal: React.FC<PlanModalProps> =
  ({ open, onClose, onConfirm, editMode, currentName }) => {
    const [name, setName] = useState('')

    useEffect(() => {
      if (editMode === true) {
        setName(currentName)
      }
    })

    const resetState = () => {
      setName('')
    }

    const onConfirmClick = () => {
      onConfirm(name)
      onClose()
    }

    return (
      <Modal
        open={open}
        className="createModal"
        onClose={() => {
          resetState()
          onClose()
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="createModal__content">
          <div className="createModal__header">
            <p>Plan Name</p>
            <IconButton
              sx={{
                borderRadius: '4px',
                border: '1px solid #2196F3',
                color: '#2196F3',
                padding: '4px 10px',
              }}
              onClick={onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </div>
          <form className="createModal__form">
            <TextInput
              onChange={(value) => setName(value)}
              label="Plan Name"
              value={name || ''}
              placeholder="Plan Name"
            />
          </form>
          <div className="createModal__footer">
            <Button
              variant="contained"
              startIcon={<Check />}
              onClick={onConfirmClick}
              disabled={!name}
              size="small"
              sx={{
                marginLeft: 'auto',
              }}
              color="primary"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

export default PlanModal
