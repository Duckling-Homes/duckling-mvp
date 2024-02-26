'use client'

import { useEffect, useState } from 'react'
import ElectricalPanelForm from './ElectricalForms/ElectricalPanelForm'
import SolarPanelForm from './ElectricalForms/SolarPanelForm'
import BatteryForm from './ElectricalForms/BatteryForm'
import EVChargerForm from './ElectricalForms/EVChargerForm'
import GeneratorForm from './ElectricalForms/GeneratorForm'
import ChipManager from '@/components/ChipManager'
import { Project, ProjectElectrical } from '@/types/types'
import { v4 as uuidv4 } from 'uuid'
import ModelStore from '@/app/stores/modelStore'
import { observer } from 'mobx-react-lite'
import { SelectInput } from '@/components/Inputs'
import PhotoDisplay from '@/components/PhotoDisplay'
import AddPhotoButton from '@/components/AddPhotoButton'
import { defaultPhotoFilter } from '@/app/helpers/defaultPhotoFilter'

const TYPES = [
  { name: 'Electrical Panel', value: 'ElectricalPanel' },
  { name: 'Solar', value: 'Solar' },
  { name: 'Battery', value: 'Battery' },
  { name: 'EV Charger', value: 'EvCharger' },
  { name: 'Generator', value: 'Generator' },
]

interface ElectricalProps {
  currentProject: Project
}

const Electrical: React.FC<ElectricalProps> = observer(({ currentProject }) => {
  const [electricals, setElectricals] = useState<ProjectElectrical[]>([])
  const [currentElectrical, setCurrentElectrical] =
    useState<ProjectElectrical>()

  useEffect(() => {
    if (currentProject && currentProject?.electrical) {
      setElectricals(currentProject.electrical)

      if (!currentElectrical) {
        setCurrentElectrical(currentProject.electrical[0])
      }
    }
  }, [currentProject, currentProject.electrical])

  function createElectrical() {
    const newElectrical = {
      id: uuidv4(),
    }
    setCurrentElectrical(newElectrical)
  }

  function handleTypeChange(name: string, value: string) {
    let b = 0

    electricals.forEach((electrical) => {
      if (electrical.type === value) {
        b++
      }
    })

    const words = value.match(/[A-Z][a-z]*/g)

    const formatedName = words
      ? b === 0
        ? words.join(' ')
        : `${words.join(' ')} - ${b + 1}`
      : ''

    const updatedElectrical = {
      ...currentElectrical,
      [name]: value,
      name: formatedName,
    }
    handlePostElectrical(updatedElectrical, value)
  }

  async function handlePostElectrical(
    updatedElectrical: ProjectElectrical,
    type: string
  ) {
    updatedElectrical.type = type
    const createdElectrical = await ModelStore.createElectrical(
      currentProject.id!,
      updatedElectrical
    )

    const newElectricalsList = [...electricals, updatedElectrical]
    setElectricals(newElectricalsList)
    setCurrentElectrical(createdElectrical)
  }

  async function deleteElectrical(electricalId: string) {
    const electricalToDelete = electricals.find(
      (electrical) => electrical.id === electricalId
    )

    if (!electricalToDelete) {
      return
    }

    if (!electricalToDelete.type) {
      const newElectricalList = electricals.filter((r) => r.id !== electricalId)
      setElectricals(newElectricalList)
      setCurrentElectrical(newElectricalList[0] || {})
      return
    }

    await ModelStore.deleteElectrical(
      currentProject.id!,
      electricalToDelete.type,
      electricalToDelete.id!
    )

    const newElectricalsList = electricals.filter((r) => r.id !== electricalId)
    setElectricals(newElectricalsList)
    setCurrentElectrical(newElectricalsList[0] || {})
  }

  async function patchElectrical(
    propName: string,
    updatedElectrical = currentElectrical
  ) {
    if (updatedElectrical?.id) {
      // TODO: make use of propName!

      // const electricalToUpdate = {
      //   id: updatedElectrical.id,
      //   type: updatedElectrical.type,
      //   [propName]: updatedElectrical[propName]
      // }

      const updatedElectricals = electricals.map((electrical) => {
        if (electrical.id === updatedElectrical.id) {
          return { ...electrical, [propName]: updatedElectrical[propName] }
        }
        return electrical
      })

      await ModelStore.updateElectrical(currentProject.id!, updatedElectrical)

      setElectricals(updatedElectricals)
    }
  }

  function handleInputChange(
    inputName: string,
    value: string | number | boolean
  ) {
    if (currentElectrical) {
      const updatedElectrical: ProjectElectrical = {
        ...currentElectrical,
        [inputName]: value,
      }
      setCurrentElectrical(updatedElectrical)
    }
  }

  const renderForm = () => {
    switch (currentElectrical?.type?.toLowerCase()) {
      case 'electricalpanel':
        return (
          <ElectricalPanelForm
            onUpdate={(propName: string) => patchElectrical(propName)}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'solar':
        return (
          <SolarPanelForm
            onUpdate={(propName: string) => patchElectrical(propName)}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'battery':
        return (
          <BatteryForm
            onUpdate={(propName: string) => patchElectrical(propName)}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'evcharger':
        return (
          <EVChargerForm
            onUpdate={(propName: string) => patchElectrical(propName)}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'generator':
        return (
          <GeneratorForm
            onUpdate={(propName: string) => patchElectrical(propName)}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        gap: '32px',
      }}
    >
      <ChipManager
        onDelete={deleteElectrical}
        onCreate={createElectrical}
        chipType="Electrical"
        chips={electricals}
        currentChip={currentElectrical?.id || ''}
        onChipClick={(i: number) => setCurrentElectrical(electricals[i])}
      />
      {currentElectrical?.id && (
        <div
          style={{
            width: '100%',
          }}
        >
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <SelectInput
              label="Type"
              value={currentElectrical?.type ?? ''}
              onChange={(value) => handleTypeChange('type', value)}
              disabled={currentElectrical?.type ? true : false}
              options={TYPES}
            />
            {renderForm()}
            <PhotoDisplay
              currentProject={currentProject}
              filterPhotos={defaultPhotoFilter({
                electricalId: currentElectrical.id!,
              })}
            ></PhotoDisplay>
            <AddPhotoButton
              photoUpdates={{ electricalId: currentElectrical?.id }}
            />
          </form>
        </div>
      )}
    </div>
  )
})

export default Electrical
