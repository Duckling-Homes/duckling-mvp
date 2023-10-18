"use client";

import ChipManager from "@/components/ChipManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import HVACForm from "./AppliancesForms/HVACForm";
import WaterHeaterForm from "./AppliancesForms/WaterHeaterForm";
import CooktopForm from "./AppliancesForms/CooktopForm";
import DefaultForm from "./AppliancesForms/DefaultForm";
import { ProjectAppliance } from "@/types/types";

const TYPES = [
  {name: "HVAC", value: "Hvac"},
  {name: "Water Heater", value: 'WaterHeater'},
  {name: "Refrigerator", value: "Refrigerator"},
  {name: "Washing Machine", value: "WashingMachine"},
  {name: "Dryer", value: "Dryer"},
  {name: "Dishwasher", value: "Dishwasher"},
  {name: "Cooktop", value: "Cooktop"},
  {name: "Oven", value: "Oven"},
  {name: "Other", value: "Other"}
]

const Appliances = ({ currentProject }) => {
  const [appliances, setAppliances] = useState<ProjectAppliance[]>([]);
  const [currentAppliance, setCurrentAppliance] = useState<ProjectAppliance>({
    id: '',
    name: '',
    type: '',
    hvac_system_type: '',
    havc_system: '',
    fuel: '',
    age: 0,
    manufacturer: '',
    model_number: '',
    serial_number: '',
    heating_capacity: 0,
    cooling_capacity: 0,
    tank_volume: 0,
    location: '',
    notes: '',
    is_indution: false,
  });

  useEffect(() => {
    if (currentProject && currentProject?.appliances) {
      setAppliances(currentProject.appliances)
      setCurrentAppliance(currentProject.appliances[0])
    }
  }, [currentProject])


  async function deleteAppliance(applianceId: string) {
    const applianceToDelete = appliances.find(appliance => appliance.id === applianceId);

    let api = ''
    switch(applianceToDelete.type.toLowerCase()) {
      case 'hvac':
        api = 'hvac';
        break;
      case 'cooktop':
        api = 'cooktop';
        break;
      case 'waterheater':
        api = 'waterHeater';
        break;
      default:
        api = 'other';
        break;
    }

    if (applianceToDelete) {
      try {
        const response = await fetch(`/api/appliances/${api}/${applianceId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Appliance deleted successfully.');
          const newApplianceList = appliances.filter(r => r.id !== applianceId);
          setAppliances(newApplianceList);
          setCurrentAppliance(newApplianceList[0] || {});
        } else {
          throw new Error('Failed to delete the appliance.');
        }
      } catch (error) {
        console.error('Error deleting the appliance:', error);
        throw error;
      }
    }
  }

  function createAppliance() {

    const newAppliance = {
      id: '',
      name: "New Appliance",
    };

    const newApplianceList = [...appliances, newAppliance];
    setAppliances(newApplianceList);
    setCurrentAppliance(newAppliance);
  }

  const handleTypeChange = (name: string, value: string) => {
    const updatedAppliance = {...currentAppliance, [name]: value}
    handlePostAppliance(updatedAppliance, value)
  }

  async function handlePostAppliance(updatedAppliance: ProjectAppliance, type: string) {
    let api = ''
    switch(type.toLowerCase()) {
      case 'hvac':
        api = 'hvac';
        break;
      case 'cooktop':
        api = 'cooktop';
        break;
      case 'waterheater':
        api = 'waterHeater';
        break;
      default:
        api = 'other';
        break;
    }

    try {
      const data = await fetch(`/api/appliances/${api}`, {
        method: 'POST',
        body: JSON.stringify({
            ...updatedAppliance,
            projectId: currentProject.id
          })
      });

      if (data.ok) {
        console.log('New appliance created successfully.');
        setCurrentAppliance(updatedAppliance)
      } else {
        throw new Error('Failed to create a new appliance.');
      }
    } catch (error) {
      console.error('Error creating a new appliance:', error);
      throw error;
    }
  }


  const handleInputChange = async (inputName: string, value: string | number) => {
    const updatedData = { ...currentAppliance, [inputName]: value };
    setCurrentAppliance(updatedData);
  };

  const renderForm = () => {
    switch(currentAppliance?.type) {
      case 'Hvac':
        return (<HVACForm />);
      case 'WaterHeater':
        return (<WaterHeaterForm />);
      case 'Cooktop':
        return (<CooktopForm />);
      default:
        if (currentAppliance?.type) {
          return (<DefaultForm />);
        } else {
          return (null);
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
        currentChip={currentAppliance?.id}
        onChipClick={(i: number) => setCurrentAppliance(appliances[i])}
      />
      {currentAppliance && <div style={{
        width: '100%',
      }}>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type-select"
              label="Type"
              disabled={currentAppliance?.type ? true : false}
              value={currentAppliance?.type}
              onChange={({ target }) => handleTypeChange('type', target.value)}
            >
              {
                TYPES.map((type, i) => (
                  <MenuItem key={i} value={type.value}>{type.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          {renderForm()}
        </form>
      </div>}
    </div>
  )
}

export default Appliances