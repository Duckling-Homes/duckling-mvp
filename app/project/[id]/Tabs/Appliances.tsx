'use client'

import { useEffect, useState } from "react";
import ChipManager from "@/components/ChipManager";
import HVACForm from "./AppliancesForms/HVACForm";
import WaterHeaterForm from "./AppliancesForms/WaterHeaterForm";
import CooktopForm from "./AppliancesForms/CooktopForm";
import DefaultForm from "./AppliancesForms/DefaultForm";
import { Project, ProjectAppliance } from "@/types/types";
import { v4 as uuidv4 } from 'uuid';
import ModelStore from "@/app/stores/modelStore";
import { SelectInput } from "@/components/Inputs";
import { Button } from "@mui/material";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import PhotoCaptureModal from '@/components/Modals/PhotoModal'
import PhotoDisplay from "@/components/PhotoDisplay";

const TYPES = [
  { name: 'HVAC', value: 'hvac' },
  { name: 'Water Heater', value: 'waterheater' },
  { name: 'Refrigerator', value: 'refrigerator' },
  { name: 'Washing Machine', value: 'washingmachine' },
  { name: 'Dryer', value: 'dryer' },
  { name: 'Dishwasher', value: 'dishwasher' },
  { name: 'Cooktop', value: 'cooktop' },
  { name: 'Oven', value: 'oven' },
  { name: 'Other', value: 'other' },
]
interface AppliancesProps {
  currentProject: Project
}

const Appliances: React.FC<AppliancesProps> = ({ currentProject }) => {
  const [appliances, setAppliances] = useState<ProjectAppliance[]>([])
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [currentAppliance, setCurrentAppliance] = useState<ProjectAppliance>({})

  useEffect(() => {
    if (currentProject?.appliances) {
      setAppliances(currentProject.appliances)

      if (!currentAppliance) {
        setCurrentAppliance(currentProject.appliances[0])
      }
    }
  }, [currentProject, currentProject?.appliances])

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
    const appliances = currentProject.appliances ?? [];
    const applianceToDelete = appliances.find(
      (appliance) => appliance.id === applianceId
    );

    if (!applianceToDelete) {
      return;
    }

    const api = applianceToDelete?.type ?
      getTypeApi(applianceToDelete.type) : '';


    if (!applianceToDelete.type) {
      const newApplianceList = appliances.filter((r) => r.id !== applianceId);
      setCurrentAppliance(newApplianceList[0] || {});
      return;
    }

    await ModelStore.deleteAppliance(currentProject.id!, api, applianceId);
    const newApplianceList = appliances.filter((r) => r.id !== applianceId);
    setCurrentAppliance(newApplianceList[0] || {});
  }

  function createAppliance() {
    const newAppliance = {
      id: uuidv4(),
      name: 'New Appliance',
    }
    const newApplianceList = [...appliances];
    newApplianceList.push(newAppliance);
    
    setAppliances(newApplianceList);
    setCurrentAppliance(newAppliance);
  }

  const handleTypeChange = (name: string, value: string) => {
    const updatedAppliance = { ...currentAppliance, [name]: value }
    handlePostAppliance(updatedAppliance, value)
  }

  async function handlePostAppliance(
    updatedAppliance: ProjectAppliance,
    type: string
  ) {
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

    const appliance = await ModelStore.createAppliance(
      currentProject.id!,
      api,
      updatedAppliance
    )
    setCurrentAppliance(appliance)
  }

  async function patchAppliance() {
    const updatedAppliance = currentAppliance
    let api = ''

    if (updatedAppliance.type) {
      switch (updatedAppliance.type.toLowerCase()) {
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
    }

    if (updatedAppliance) {
      const updated = await ModelStore.updateAppliance(
        currentProject.id!,
        api,
        updatedAppliance
      )
      setCurrentAppliance(updated)
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
    switch (currentAppliance?.type?.toLowerCase()) {
      case 'hvac':
        return (
          <HVACForm
            onUpdate={() => patchAppliance()}
            onChange={handleInputChange}
            currentAppliance={currentAppliance}
          />
        )
      case 'waterheater':
        return (
          <WaterHeaterForm
            onUpdate={() => patchAppliance()}
            onChange={handleInputChange}
            currentAppliance={currentAppliance}
          />
        )
      case 'cooktop':
        return (
          <CooktopForm
            onUpdate={() => patchAppliance()}
            onChange={handleInputChange}
            currentAppliance={currentAppliance}
          />
        )
      default:
        if (currentAppliance?.type) {
          return (
            <DefaultForm
              onUpdate={() => patchAppliance()}
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
      {currentAppliance && (
        <PhotoCaptureModal
          open={openCamera}
          project={currentProject}
          onClose={() => setOpenCamera(false)}
          photo={{ applianceId: currentAppliance?.id }}
        />
      )}
      {currentAppliance?.id && <div style={{
        width: '100%',
      }}>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <SelectInput
            label="Type"
            value={(currentAppliance?.type)?.toLowerCase() || ''}
            onChange={(value) => handleTypeChange('type', value)}
            disabled={currentAppliance?.type ? true : false}
            options={TYPES}
          />
          {renderForm()}
          <PhotoDisplay
              currentProject={currentProject}
              filterCriteria={ { applianceId: currentAppliance.id! } }
          ></PhotoDisplay>
          {currentAppliance?.type && (
            <Button
              variant="contained"
              startIcon={<CameraAltOutlinedIcon />}
              onClick={() => setOpenCamera(true)}
            >
              Add Photo
            </Button>
          )}
        </form>
      </div>}
    </div>
  )
}

export default Appliances
