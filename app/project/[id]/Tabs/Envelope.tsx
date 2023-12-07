'use client'

import ModelStore from '@/app/stores/modelStore'
import ChipManager from '@/components/ChipManager'
import { SelectInput } from '@/components/Inputs'
import PhotoDisplay from '@/components/PhotoDisplay'
import { Project, ProjectEnvelope } from '@/types/types'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import AirSealingForm from './EnvelopesForms/AirSealingForm'
import InsulationForm from './EnvelopesForms/InsulationForm'
import AddPhotoButton from '@/components/AddPhotoButton'
import { defaultPhotoFilter } from '@/app/helpers/defaultPhotoFilter'

interface EnvelopeProps {
  currentProject: Project
}

const Envelope: React.FC<EnvelopeProps> = observer(({ currentProject }) => {
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

    // TODO: make use of propName

    // const envelopeToUpdate = {
    //   id: updatedEnvelope.id,
    //   type: updatedEnvelope.type,
    //   [propName]: updatedEnvelope[propName],
    // }

    await ModelStore.updateEnvelope(currentProject.id!, updatedEnvelope)
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
                filterPhotos={defaultPhotoFilter({
                  envelopeId: currentEnvelope.id!,
                })}
              ></PhotoDisplay>
              <AddPhotoButton
                photoUpdates={{ envelopeId: currentEnvelope?.id }}
              />
            </form>
          )}
        </div>
      </div>
    </>
  )
})

export default Envelope
