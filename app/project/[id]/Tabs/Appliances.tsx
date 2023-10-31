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
    const appliancesList = [...appliances]
    const applianceToDelete = appliancesList.find(
      (appliance) => appliance.id === applianceId
    );

    if (!applianceToDelete) {
      return;
    }

    const api = applianceToDelete?.type ? getTypeApi(applianceToDelete.type) : '';


    if (applianceToDelete.type) {
      await ModelStore.deleteAppliance(currentProject.id!, api, applianceId);
    }

    const newApplianceList = appliancesList.filter((r) => r.id !== applianceId);
    setAppliances(newApplianceList);
    setCurrentAppliance(newApplianceList[0] || {});
  }

  function createAppliance() {
    const newAppliance = {
      id: uuidv4(),
      name: "New Appliance",
    }
    const newApplianceList = [...appliances];
    newApplianceList.push(newAppliance);

    setAppliances(newApplianceList);
    setCurrentAppliance(newAppliance);
  }

  const handleTypeChange = (name: string, value: string) => {
    console.log(name)
    const updatedAppliance = { ...currentAppliance, [name]: value }
    handlePostAppliance(updatedAppliance, value)
  }

  async function handlePostAppliance(
    updatedAppliance: ProjectAppliance,
    type: string
  ) {
    const api = getTypeApi(type);

    const createdAppliance = await ModelStore.createAppliance(
      currentProject.id!,
      api,
      updatedAppliance
    );

    const updatedAppliances = appliances.map((appliance) => {
      if (appliance.id === updatedAppliance.id) {
        return { ...appliance, ...updatedAppliance }
      }
      return appliance
    });

    setAppliances(updatedAppliances);
    setCurrentAppliance(createdAppliance);
  }

  async function patchAppliance(propName: string, updatedAppliance = currentAppliance) {
    if (updatedAppliance?.id) {

      const applianceToUpdate = {
        id: updatedAppliance.id,
        type: updatedAppliance.type,
        [propName]: updatedAppliance[propName]
      }

      const updatedEnvelopes = appliances.map((appliance) => {
        if (appliance.id === updatedAppliance.id) {
          return { ...appliance, [propName]: updatedAppliance[propName] };
        }
        return appliance;
      })

      const api = getTypeApi(updatedAppliance?.type)

      await ModelStore.updateAppliance(
        currentProject.id!,
        api,
        applianceToUpdate
      )

      setAppliances(updatedEnvelopes)
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
