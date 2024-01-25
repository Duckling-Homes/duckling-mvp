'use client'

import ModelStore from '@/app/stores/modelStore'
import ChipManager from '@/components/ChipManager'
import { SelectInput } from '@/components/Inputs'
import PhotoDisplay from '@/components/PhotoDisplay'
import { Project, ProjectEnvelopeComponent } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import AddPhotoButton from '@/components/AddPhotoButton'
import { defaultPhotoFilter } from '@/app/helpers/defaultPhotoFilter'
import FoundationsComponentForm from './EnvelopesForms/FoundationsComponentForm'
import PortalComponentForm from './EnvelopesForms/PortalComponentForm'

interface EnvelopeProps {
  currentProject: Project
}

const Envelope: React.FC<EnvelopeProps> = observer(({ currentProject }) => {
  const [currentEnvelopeComponent, setCurrentEnvelopeComponent] =
    useState<ProjectEnvelopeComponent>({})

  const components = currentProject.envelopeComponents || []

  useEffect(() => {
    if (!currentEnvelopeComponent && currentProject?.envelopeComponents) {
      setCurrentEnvelopeComponent(currentProject.envelopeComponents[0])
    }
  }, [
    currentProject,
    currentProject.envelopeComponents,
    currentEnvelopeComponent,
  ])

  function handleTypeChange(value: string) {
    const updatedComponent = { ...currentEnvelopeComponent, type: value }
    handlePostEnvelopeComponent(updatedComponent, value)
  }

  function createEnvelopeComponent() {
    const newComponent = {
      id: v4(),
      name: 'New Component',
    }
    setCurrentEnvelopeComponent(newComponent)
  }

  async function handlePostEnvelopeComponent(
    envelopeComponent: ProjectEnvelopeComponent,
    type: string
  ) {
    envelopeComponent.type = type

    const createdEnvelope = await ModelStore.createEnvelopeComponent(
      currentProject.id!,
      envelopeComponent
    )
    setCurrentEnvelopeComponent(createdEnvelope)
  }

  async function deleteEnvelopeComponent(componentId: string) {
    const componentToDelete = components.find(
      (component) => component.id === componentId
    )

    if (!componentToDelete) {
      return
    }

    if (!componentToDelete.type) {
      const newEnvelopeComponentList = components.filter(
        (r) => r.id !== componentId
      )
      setCurrentEnvelopeComponent(newEnvelopeComponentList[0] || {})
      return
    }

    await ModelStore.deleteEnvelopeComponent(currentProject.id!, componentId)
    const newEnvelopeComponentList = components.filter(
      (r) => r.id !== componentId
    )
    setCurrentEnvelopeComponent(newEnvelopeComponentList[0] || {})
  }

  function handleInputChange(inputName: string, value: string) {
    if (currentEnvelopeComponent && currentEnvelopeComponent.id) {
      const updatedEnvelopeComponent = {
        ...currentEnvelopeComponent,
        [inputName]: value,
      }
      setCurrentEnvelopeComponent(updatedEnvelopeComponent)
    }
  }

  async function patchEnvelope(
    propName: string,
    updatedEnvelopeComponent = currentEnvelopeComponent
  ) {
    if (!updatedEnvelopeComponent) {
      return
    }

    // TODO: make use of propName

    // const envelopeToUpdate = {
    //   id: updatedEnvelope.id,
    //   type: updatedEnvelope.type,
    //   [propName]: updatedEnvelope[propName],
    // }

    await ModelStore.updateEnvelopeComponent(
      currentProject.id!,
      updatedEnvelopeComponent
    )
  }

  const renderForm = () => {
    switch (currentEnvelopeComponent?.type) {
      case 'Attic':
      case 'Wall':
      case 'Basement':
      case 'Foundation':
        return (
          <FoundationsComponentForm
            onUpdate={(inputName: string) => patchEnvelope(inputName)}
            onChange={handleInputChange}
            currentEnvelopeComponent={currentEnvelopeComponent}
          />
        )
      case 'Window':
      case 'Door':
        return (
          <PortalComponentForm
            onUpdate={(inputName: string) => patchEnvelope(inputName)}
            onChange={handleInputChange}
            currentEnvelopeComponent={currentEnvelopeComponent}
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
          onCreate={createEnvelopeComponent}
          onDelete={deleteEnvelopeComponent}
          chips={components}
          currentChip={currentEnvelopeComponent?.id || ''}
          chipType="Component"
          onChipClick={(i: number) => {
            setCurrentEnvelopeComponent(components[i])
          }}
        />
        <div
          style={{
            width: '100%',
          }}
        >
          {currentEnvelopeComponent?.id && (
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <SelectInput
                label="Type"
                value={currentEnvelopeComponent?.type || ''}
                onChange={(value) => handleTypeChange(value)}
                disabled={currentEnvelopeComponent?.type ? true : false}
                options={[
                  'Attic',
                  'Wall',
                  'Basement',
                  'Foundation',
                  'Window',
                  'Door',
                ]}
              />
              {renderForm()}
              <PhotoDisplay
                currentProject={currentProject}
                filterPhotos={defaultPhotoFilter({
                  envelopeComponentId: currentEnvelopeComponent.id!,
                })}
              ></PhotoDisplay>
              <AddPhotoButton
                photoUpdates={{
                  envelopeComponentId: currentEnvelopeComponent?.id,
                }}
              />
            </form>
          )}
        </div>
      </div>
    </>
  )
})

export default Envelope
