import { TextInput } from '@/components/Inputs'
import { Check, Close } from '@mui/icons-material'
import {
  Button,
  IconButton,
  Modal,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

type PlanModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (name: string) => void
  editMode: boolean
  currentName: string
  onEditConfirm: (name: string) => void
}

const PlanModal: React.FC<PlanModalProps> =
  ({ open, onClose, onConfirm, editMode, currentName, onEditConfirm }) => {
    const [name, setName] = useState('')

    useEffect(() => {

      if (editMode && currentName) {
        setName(currentName);
      } else {
        setName('');
      }
    }, [editMode, currentName]);

    const resetState = () => {
      setName('')
    }

    const onConfirmClick = () => {
      if (editMode) {
        onEditConfirm(name)
        onClose()
        return
      }
      onConfirm(name)
      onClose()
    }

    return (
      <Modal
        // Prevents hitting "enter" from submitting the form
        onSubmit={(e) => {e.preventDefault()}}
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
