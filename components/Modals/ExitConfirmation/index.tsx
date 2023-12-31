import { Close, Delete } from '@mui/icons-material'
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from '@mui/material'
import { useState } from 'react'

const ExitConfirmationModal: React.FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
}> = ({ open, onConfirm, onClose }) => {
  const [projectNameConfirmation, setProjectNameConfirmation] = useState('')

  return (
    <Modal
      open={open}
      className="createModal"
      onClose={() => onClose()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="createModal__content">
        <div className="createModal__header">
          <p>Delete Project</p>
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
        <p>Are you sure you want to delete envelope?</p>
        <form className="createModal__form">
          <FormControl>
            <TextField
              onChange={({ target }) =>
                setProjectNameConfirmation(target.value)
              }
              fullWidth
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              helperText="Please confirm the name of the project you want to delete"
              value={projectNameConfirmation}
              required
              placeholder="Project Name"
            />
          </FormControl>
        </form>
        <div className="createModal__footer">
          <Button
            variant="contained"
            startIcon={<Delete />}
            onClick={() => onConfirm()}
            disabled={true}
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

export default ExitConfirmationModal
