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
import { observer } from 'mobx-react-lite'
import { TextInput } from '@/components/Inputs'

type ProjectModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (project: Project) => void
  project?: Project
}

const ProjectModal: React.FC<ProjectModalProps> = observer(
  ({ open, onClose, onConfirm, project }) => {
    const initialProjectData: Project = {
      name: '',
      homeownerName: '',
      homeownerPhone: '',
      homeownerEmail: '',
      homeownerAddress: '',
    }

    const [projectData, setProjectData] = useState<Project>(
      project ? project : initialProjectData
    )

    const handleDataChange = (fieldName: keyof Project, value: string) => {
      setProjectData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }))
    }

    const resetState = () => {
      setProjectData(initialProjectData)
    }

    const isSaveButtonEnabled = Object.values(projectData).every(
      (value) => value !== ''
    )

    const onConfirmClick = () => {
      onConfirm(projectData)
      if (!project) {
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
            <p>{project ? project?.name : 'New Project'}</p>
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
            <FormControl>
              <TextField
                onChange={({ target }) =>
                  handleDataChange('homeownerName', target.value)
                }
                fullWidth
                id="outlined-basic"
                label="Client Name"
                variant="outlined"
                value={projectData.homeownerName}
                required
                placeholder="Client Name"
              />
            </FormControl>
            <FormControl>
              <TextField
                onChange={({ target }) =>
                  handleDataChange('name', target.value)
                }
                id="outlined-basic"
                label="Project Name"
                variant="outlined"
                value={projectData.name}
                required
                placeholder="Project Name"
              />
            </FormControl>
            <FormControl>
              <TextField
                onChange={({ target }) =>
                  handleDataChange('homeownerAddress', target.value)
                }
                id="outlined-basic"
                label="Project Address"
                variant="outlined"
                value={projectData.homeownerAddress}
                required
                placeholder="Project Address"
              />
            </FormControl>
            <FormControl>
              <TextField
                onChange={({ target }) =>
                  handleDataChange('homeownerEmail', target.value)
                }
                id="outlined-basic"
                label="Client Email Address"
                variant="outlined"
                value={projectData.homeownerEmail}
                required
                type='email'
                placeholder="Client Email Address"
              />
            </FormControl>
            <FormControl>
              <TextInput
                onChange={(value) =>
                  handleDataChange('homeownerPhone', value)
                }
                label="Client Phone Number"
                value={projectData?.homeownerPhone || ""}
                placeholder="Client Phone Number"
                masked='phone'
              />
            </FormControl>
          </form>
          <div className="createModal__footer">
            <Button
              variant="contained"
              startIcon={<Check />}
              onClick={onConfirmClick}
              disabled={!isSaveButtonEnabled}
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
)

export default ProjectModal
