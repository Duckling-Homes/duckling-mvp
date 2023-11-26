import { Close, Delete } from '@mui/icons-material'
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from '@mui/material'
import { Plan } from '@/types/types'
import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const DeletePlanModal: React.FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
  plan: Plan
}> = ({ open, onConfirm, onClose, plan }) => {
  const [planNameConfirmation, setPlanNameConfirmation] = useState('')

  function resetState() {
    setPlanNameConfirmation('')
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
          <p>Delete Plan</p>
          <IconButton
            sx={{
              borderRadius: '4px',
              border: '1px solid #2196F3',
              color: '#2196F3',
              padding: '4px 10px',
            }}
            onClick={() => {
              resetState()
              onClose()
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </div>
        <p>Are you sure you want to delete the plan: {plan?.name}?</p>
        <form className="createModal__form">
          <FormControl>
            <TextField
              onChange={({ target }) =>
                setPlanNameConfirmation(target.value)
              }
              fullWidth
              id="outlined-basic"
              label="Plan Name"
              variant="outlined"
              helperText="Please confirm the name of the plan you want to delete"
              value={planNameConfirmation}
              required
              placeholder="Plan Name"
            />
          </FormControl>
        </form>
        <div className="createModal__footer">
          <Button
            variant="contained"
            startIcon={<Delete />}
            onClick={() => {
              onConfirm()
              resetState()
              onClose()
            }}
            disabled={planNameConfirmation !== plan?.name}
            size="small"
            sx={{
              marginLeft: 'auto',
            }}
            color="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeletePlanModal
