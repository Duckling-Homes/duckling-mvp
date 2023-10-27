'use client'

// import ChipManager from "@/components/ChipManager";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@mui/material'
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
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import PhotoCaptureModal from '@/components/Modals/PhotoModal'

const TYPES = [
  { name: 'Electrical Panel', value: 'electricalpanel' },
  { name: 'Solar', value: 'solar' },
  { name: 'Battery', value: 'battery' },
  { name: 'EV Charger', value: 'evcharger' },
  { name: 'Generator', value: 'generator' },
]

interface ElectricalProps {
  currentProject: Project
}

const Electrical: React.FC<ElectricalProps> = observer(({ currentProject }) => {
  const [electricals, setElectricals] = useState<ProjectElectrical[]>([])
  const [openCamera, setOpenCamera] = useState<boolean>(false)
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
      name: 'New Electrical',
      type: '',
      panelType: '',
      panelAmperageRating: 0,
      availableNewCircuits: 0,
      total15AmpCircuits: 0,
      total20AmpCircuits: 0,
      total30AmpCircuits: 0,
      total40AmpCircuits: 0,
      total50AmpCircuits: 0,
      total60AmpCircuits: 0,
      total70AmpCircuits: 0,
      notes: '',
      ownership: '',
      moduleType: '',
      tracking: '',
      arrayOrientation: '',
      arrayTilt: 0,
      maxPowerOutput: 0,
      numberOfPanels: 0,
      annualOutput: 0,
      chargingLevel: '',
      amperage: 0,
      acPowerSourceVolatge: 0,
      maxChargingPower: 0,
      totalCapacity: 0,
      ratedPowerOutput: 0,
      ratedPeakOutput: 0,
      gridConnected: '',
      generatorType: '',
      fuelType: '',
      ratedContinuousWattage: 0,
      ratedPeakWattage: 0,
      numberOfPhases: '',
      transferSwitch: '',
      connection: '',
      yearInstalled: 0,
      manufacturer: '',
      modelNumber: '',
      serialNumber: '',
      location: '',
    }

    const newElectricalsList = [...electricals, newElectrical]
    setElectricals(newElectricalsList)
    setCurrentElectrical(newElectrical)
  }

  const handleTypeChange = (name: string, value: string) => {
    const updatedElectrical = { ...currentElectrical, [name]: value }
    handlePostElectrical(updatedElectrical, value)
  }

  async function handlePostElectrical(
    updatedElectrical: ProjectElectrical,
    type: string
  ) {
    updatedElectrical.type = type
    const response = await ModelStore.createElectrical(
      currentProject.id!,
      updatedElectrical
    )
    const createdElectrical = { ...response, type: updatedElectrical.type }
    const updatedElectricals = electricals.map((electrical) => {
      if (electrical.id === updatedElectrical.id) {
        return { ...electrical, ...createdElectrical }
      }
      return electrical
    })
    setElectricals(updatedElectricals)
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
    console.log('Electrical deleted successfully.')
    const newElectricalsList = electricals.filter((r) => r.id !== electricalId)
    setElectricals(newElectricalsList)
    setCurrentElectrical(newElectricalsList[0] || {})
  }

  async function patchElectrical(updatedElectrical = currentElectrical) {
    if (!updatedElectrical?.type) {
      return
    }

    if (updatedElectrical) {
      const response = await ModelStore.updateElectrical(
        currentProject.id!,
        updatedElectrical
      )
      response.type = updatedElectrical.type

      const updatedElectricals = electricals.map((electrical) => {
        if (electrical.id === updatedElectrical.id) {
          return { ...electrical, ...updatedElectrical }
        }
        return electrical
      })

      setElectricals(updatedElectricals)
      setCurrentElectrical(response)
      console.log(response)
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
            onUpdate={patchElectrical}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'solar':
        return (
          <SolarPanelForm
            onUpdate={patchElectrical}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'battery':
        return (
          <BatteryForm
            onUpdate={patchElectrical}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'evcharger':
        return (
          <EVChargerForm
            onUpdate={patchElectrical}
            onChange={handleInputChange}
            currentElectrical={currentElectrical}
          />
        )
      case 'generator':
        return (
          <GeneratorForm
            onUpdate={patchElectrical}
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
      {currentProject && (
        <PhotoCaptureModal
          open={openCamera}
          project={currentProject}
          onClose={() => setOpenCamera(false)}
          photo={{ id: uuidv4() }}
        />
      )}
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
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                label="Type"
                value={currentElectrical?.type?.toLowerCase()}
                onChange={({ target }) =>
                  handleTypeChange('type', target.value)
                }
                disabled={currentElectrical?.type ? true : false}
              >
                {TYPES.map((type, i) => (
                  <MenuItem key={i} value={type.value}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {renderForm()}
            {currentElectrical?.type && (
              <Button
                variant="contained"
                startIcon={<CameraAltOutlinedIcon />}
                onClick={() => setOpenCamera(true)}
              >
                Add Photo
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  )
})

export default Electrical
