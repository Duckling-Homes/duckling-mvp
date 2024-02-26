'use client'

import ModelStore from '@/app/stores/modelStore'
import ChipManager from '@/components/ChipManager'
import { SelectInput } from '@/components/Inputs'
import PhotoDisplay from '@/components/PhotoDisplay'
import { Project, ProjectAppliance } from '@/types/types'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CooktopForm from './AppliancesForms/CooktopForm'
import DefaultForm from './AppliancesForms/DefaultForm'
import HVACForm from './AppliancesForms/HVACForm'
import WaterHeaterForm from './AppliancesForms/WaterHeaterForm'
import AddPhotoButton from '@/components/AddPhotoButton'
import { defaultPhotoFilter } from '@/app/helpers/defaultPhotoFilter'

const TYPES = [
  { name: 'HVAC', value: 'HVAC' },
  { name: 'Water Heater', value: 'WaterHeater' },
  { name: 'Refrigerator', value: 'Refrigerator' },
  { name: 'Washing Machine', value: 'WashingMachine' },
  { name: 'Dryer', value: 'Dryer' },
  { name: 'Dishwasher', value: 'Dishwasher' },
  { name: 'Cooktop', value: 'Cooktop' },
  { name: 'Oven', value: 'Oven' },
  { name: 'Other', value: 'Other' },
]
interface AppliancesProps {
  currentProject: Project
}

const Appliances: React.FC<AppliancesProps> = ({ currentProject }) => {
  const [currentAppliance, setCurrentAppliance] = useState<ProjectAppliance>({})

  const appliances = currentProject.appliances || []

  useEffect(() => {
    if (currentProject?.appliances && !currentAppliance) {
      setCurrentAppliance(currentProject.appliances[0])
    }
  }, [currentProject, currentProject?.appliances, currentAppliance])

  function getTypeApi(type: string) {
    let api = ''
    switch (type.toLowerCase()) {
      case 'hvac':
        api = 'hvac'
        break
      case 'cooktop':
        api = 'cooktop'
        break
      case 'waterheater':
        api = 'waterHeater'
        break
      default:
        api = 'other'
        break
    }

    return api
  }

  async function deleteAppliance(applianceId: string) {
    if (!currentProject || !currentProject.id) return
    const startingLength = appliances.length
    const appliancesList = [...appliances]

    const applianceToDelete = appliancesList.find(
      (appliance) => appliance.id === applianceId
    )

    if (!applianceToDelete) {
      return
    }

    if (applianceToDelete.type) {
      const api = getTypeApi(applianceToDelete.type)
      await ModelStore.deleteAppliance(currentProject.id, api, applianceId)
    }

    if (startingLength === 1) {
      console.log('setting empty appliance')
      setCurrentAppliance({})
    } else {
      console.log('setting current appliance')
      setCurrentAppliance(appliances[0])
    }
  }

  function createAppliance() {
    const newAppliance = {
      id: uuidv4(),
    }

    setCurrentAppliance(newAppliance)
  }

  const handleTypeChange = (name: string, value: string) => {
    let b = 0

    appliances.forEach((appliance) => {
      if (appliance.type === value) {
        b++
      }
    })

    const words = value.match(/(?:[A-Z]+[a-z]*|[A-Z]{1}[a-z]*)/g)

    const formatedName = words
      ? b === 0
        ? words.join(' ')
        : `${words.join(' ')} - ${b + 1}`
      : ''

    const updatedAppliance = {
      ...currentAppliance,
      [name]: value,
      name: formatedName,
    }
    handlePostAppliance(updatedAppliance, value)
  }

  async function handlePostAppliance(
    updatedAppliance: ProjectAppliance,
    type: string
  ) {
    const api = getTypeApi(type)

    const createdAppliance = await ModelStore.createAppliance(
      currentProject.id!,
      api,
      updatedAppliance
    )

    setCurrentAppliance(createdAppliance)
  }

  async function patchAppliance(
    propName: string,
    updatedAppliance = currentAppliance
  ) {
    if (updatedAppliance?.id && updatedAppliance?.type) {
      // TODO: Make use of propName!

      // const applianceToUpdate = {
      //   id: updatedAppliance.id,
      //   type: updatedAppliance.type,
      //   [propName]: updatedAppliance[propName],
      // }

      const api = getTypeApi(updatedAppliance?.type)

      await ModelStore.updateAppliance(
        currentProject.id!,
        api,
        updatedAppliance
      )
    }
  }

  function handleInputChange(
    inputName: string,
    value: string | number | boolean
  ) {
    if (currentAppliance) {
      const updatedAppliance = { ...currentAppliance, [inputName]: value }
      setCurrentAppliance(updatedAppliance)
    }
  }

  const renderForm = () => {
    if (appliances.length === 0) {
      return null
    }
    switch (currentAppliance?.type?.toLowerCase()) {
      case 'hvac':
        return (
          <HVACForm
            onUpdate={(inputName) => patchAppliance(inputName)}
            onChange={handleInputChange}
            currentAppliance={currentAppliance}
          />
        )
      case 'waterheater':
        return (
          <WaterHeaterForm
            onUpdate={(inputName) => patchAppliance(inputName)}
            onChange={handleInputChange}
            currentAppliance={currentAppliance}
          />
        )
      case 'cooktop':
        return (
          <CooktopForm
            onUpdate={(inputName) => patchAppliance(inputName)}
            onChange={handleInputChange}
            currentAppliance={currentAppliance}
          />
        )
      default:
        if (currentAppliance?.type) {
          return (
            <DefaultForm
              onUpdate={(inputName) => patchAppliance(inputName)}
              onChange={handleInputChange}
              currentAppliance={currentAppliance}
            />
          )
        } else {
          return null
        }
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
        onDelete={deleteAppliance}
        onCreate={createAppliance}
        chipType="Appliance"
        chips={appliances}
        currentChip={currentAppliance?.id || ''}
        onChipClick={(i: number) => setCurrentAppliance(appliances[i])}
      />
      {currentAppliance?.id && (
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
              value={currentAppliance?.type ?? ''}
              onChange={(value) => handleTypeChange('type', value)}
              disabled={currentAppliance?.type ? true : false}
              options={TYPES}
            />
            {renderForm()}
            <PhotoDisplay
              currentProject={currentProject}
              filterPhotos={defaultPhotoFilter({
                applianceId: currentAppliance.id!,
              })}
            ></PhotoDisplay>
            <AddPhotoButton
              photoUpdates={{ applianceId: currentAppliance?.id }}
            />
          </form>
        </div>
      )}
    </div>
  )
}

export default Appliances
