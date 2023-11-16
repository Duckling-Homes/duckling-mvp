import React, { useState } from 'react'
import { Project } from '@/types/types'
import { Check, Close } from '@mui/icons-material'
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from '@mui/material'
import { TextInput } from '@/components/Inputs'

type PlanCreationModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (name: string) => void
}

const PlanCreationModal: React.FC<PlanCreationModalProps> =
  ({ open, onClose, onConfirm }) => {
    const [name, setName] = useState('')

    const resetState = () => {
      setName('')
    }

    const onConfirmClick = () => {
      onConfirm(name)
      if (!name) {
        resetState()
      }
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

export default PlanCreationModal
