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
  {name: "HVAC", value: "hvac"},
  {name: "Water Heater", value: 'waterheater'},
  {name: "Refrigerator", value: "refrigerator"},
  {name: "Washing Machine", value: "washingMachine"},
  {name: "Dryer", value: "dryer"},
  {name: "Dishwasher", value: "dishwasher"},
  {name: "Cooktop", value: "cooktop"},
  {name: "Oven", value: "oven"},
  {name: "Other", value: "other"}
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

        const updatedAppliances = appliances.map((appliance) => {
          if (appliance.id === updatedAppliance.id) {
            return { ...appliance, ...updatedAppliance };
          }
          return appliance;
        });

        setAppliances(updatedAppliances);

        const response = await data.json()
        const createdAppliance = {...response, type: updatedAppliance.type}
        console.log(response)
        setCurrentAppliance(createdAppliance)
      } else {
        throw new Error('Failed to create a new appliance.');
      }
    } catch (error) {
      console.error('Error creating a new appliance:', error);
      throw error;
    }
  }

  async function patchAppliance(updatedAppliance) {
    let api = ''
    console.log(updatedAppliance)

    switch(updatedAppliance.type.toLowerCase()) {
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

    if (updatedAppliance) {
      try {
        const data = await fetch(`/api/appliances/${api}/${updatedAppliance.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            ...updatedAppliance,
            projectId: currentProject.id
          })
        });

        if (data.ok) {
          const response = await data.json();
          response.type = updatedAppliance.type;

          const updatedAppliances = appliances.map((appliance) => {
            if (appliance.id === updatedAppliance.id) {
              return { ...appliance, ...updatedAppliance };
            }
            return appliance;
          });

          setAppliances(updatedAppliances);
          setCurrentAppliance(response);
          console.log(response);
        } else {
          throw new Error('Failed to update the appliance.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleInputChange(inputName: string, value: string) {
    console.log('inputName')
    if (currentAppliance) {
      const updatedAppliance = { ...currentAppliance, [inputName]: value };
      setCurrentAppliance(updatedAppliance);
      patchAppliance(updatedAppliance);
    }
  }


  const renderForm = () => {
    switch(currentAppliance?.type?.toLowerCase()) {
      case 'hvac':
        return (<HVACForm onChange={handleInputChange} currentAppliance={currentAppliance}/>);
      case 'waterheater':
        return (<WaterHeaterForm onChange={handleInputChange} currentAppliance={currentAppliance}/>);
      case 'cooktop':
        return (<CooktopForm onChange={handleInputChange} currentAppliance={currentAppliance}/>);
      default:
        if (currentAppliance?.type) {
          return (<DefaultForm onChange={handleInputChange} currentAppliance={currentAppliance}/>);
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
              value={(currentAppliance?.type)?.toLowerCase()}
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