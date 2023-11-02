'use client'

import ModelStore from '@/app/stores/modelStore'
import ChipManager from '@/components/ChipManager'
import { SelectInput } from '@/components/Inputs'
import PhotoCaptureModal from '@/components/Modals/PhotoModal'
import PhotoDisplay from '@/components/PhotoDisplay'
import { Project, ProjectEnvelope } from '@/types/types'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { Button } from '@mui/material'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import AirSealingForm from './EnvelopesForms/AirSealingForm'
import InsulationForm from './EnvelopesForms/InsulationForm'

interface EnvelopeProps {
  currentProject: Project
}

const Envelope: React.FC<EnvelopeProps> = observer(({ currentProject }) => {
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [currentEnvelope, setCurrentEnvelope] = useState<ProjectEnvelope>({})

  const envelopes = currentProject.envelopes || []

  useEffect(() => {
    if (!currentEnvelope && currentProject?.envelopes) {
      setCurrentEnvelope(currentProject.envelopes[0])
    }
  }, [currentProject, currentProject.envelopes, currentEnvelope])

  function handleTypeChange(value: string) {
    const updatedEnvelope = { ...currentEnvelope, type: value }
    handlePostEnvelope(updatedEnvelope, value)
  }

  function createEnvelope() {
    const newEnvelope = {
      id: v4(),
      name: 'New Envelope',
    }
    setCurrentEnvelope(newEnvelope)
  }

  async function handlePostEnvelope(envelope: ProjectEnvelope, type: string) {
    envelope.type = type
    const createdEnvelope = await ModelStore.createEnvelope(
      currentProject.id!,
      envelope
    )
    setCurrentEnvelope(createdEnvelope)
  }

  async function deleteEnvelope(envelopeId: string) {
    const envelopeToDelete = envelopes.find(
      (envelope) => envelope.id === envelopeId
    )

    if (!envelopeToDelete) {
      return
    }

    if (!envelopeToDelete.type) {
      const newEnvelopeList = envelopes.filter((r) => r.id !== envelopeId)
      setCurrentEnvelope(newEnvelopeList[0] || {})
      return
    }

    await ModelStore.deleteEnvelope(
      currentProject.id!,
      envelopeToDelete.type,
      envelopeId
    )
    const newEnvelopeList = envelopes.filter((r) => r.id !== envelopeId)
    setCurrentEnvelope(newEnvelopeList[0] || {})
  }

  function handleInputChange(inputName: string, value: string) {
    if (currentEnvelope && currentEnvelope.id) {
      const updatedEnvelope = { ...currentEnvelope, [inputName]: value }
      setCurrentEnvelope(updatedEnvelope)
    }
  }

  async function patchEnvelope(
    propName: string,
    updatedEnvelope = currentEnvelope
  ) {
    if (!updatedEnvelope) {
      return
    }

    const envelopeToUpdate = {
      id: updatedEnvelope.id,
      type: updatedEnvelope.type,
      [propName]: updatedEnvelope[propName],
    }

    await ModelStore.updateEnvelope(currentProject.id!, envelopeToUpdate)
  }

  const renderForm = () => {
    switch (currentEnvelope?.type) {
      case 'Insulation':
        return (
          <InsulationForm
            onUpdate={(inputName: string) => patchEnvelope(inputName)}
            onChange={handleInputChange}
            currentEnvelope={currentEnvelope}
          />
        )
      case 'AirSealing':
        return (
          <AirSealingForm
            onUpdate={(inputName: string) => patchEnvelope(inputName)}
            onChange={handleInputChange}
            currentEnvelope={currentEnvelope}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: '32px',
          gap: '32px',
        }}
      >
        <ChipManager
          onCreate={createEnvelope}
          onDelete={deleteEnvelope}
          chips={envelopes}
          currentChip={currentEnvelope?.id || ''}
          chipType="Envelope"
          onChipClick={(i: number) => {
            console.log(toJS(envelopes[i]))
            setCurrentEnvelope(envelopes[i])
          }}
        />
        {currentEnvelope && (
          <PhotoCaptureModal
            open={openCamera}
            project={currentProject}
            onClose={() => setOpenCamera(false)}
            photo={{ envelopeId: currentEnvelope?.id }}
          />
        )}
        <div
          style={{
            width: '100%',
          }}
        >
          {currentEnvelope?.id && (
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <SelectInput
                label="Type"
                value={currentEnvelope?.type || ''}
                onChange={(value) => handleTypeChange(value)}
                disabled={currentEnvelope?.type ? true : false}
                options={['Insulation', 'AirSealing']}
              />
              {renderForm()}
              <PhotoDisplay
                currentProject={currentProject}
                filterCriteria={{ envelopeId: currentEnvelope.id! }}
              ></PhotoDisplay>
              <Button
                variant="contained"
                startIcon={<CameraAltOutlinedIcon />}
                onClick={() => setOpenCamera(true)}
              >
                Add Photo
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  )
})

export default Envelope
