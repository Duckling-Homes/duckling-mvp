"use client";

// import ChipManager from "@/components/ChipManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import ElectricalPanelForm from "./ElectricalForms/ElectricalPanelForm";
import SolarPanelForm from "./ElectricalForms/SolarPanelForm";
import BatteryForm from "./ElectricalForms/BatteryForm";
import EVChargerForm from "./ElectricalForms/EVChargerForm";
import GeneratorForm from "./ElectricalForms/GeneratorForm";
import ChipManager from "@/components/ChipManager";
import { ProjectElectrical } from "@/types/types";

const TYPES = [
  {name: "Electrical Panel", value: "electricalpanel"},
  {name: "Solar", value: "solar"},
  {name: "Battery", value: "battery"},
  {name: "EV Charger", value: "evcharger"},
  {name: "Generator", value: "generator"}
]

const Electrical = ({ currentProject }) => {
  const [electricals, setElectricals] = useState([])
  const [currentElectrical, setCurrentElectrical] = useState({
    id: "",
    type: '',
  });

  useEffect(() => {
    if (currentProject && currentProject?.electrical) {
      setElectricals(currentProject.electrical)
      setCurrentElectrical(currentProject.electrical[0])
    }
  }, [currentProject])

  function createElectrical() {

    const newElectrical = {
      id: '',
      name: "New Electrical",
    };

    const newElectricalsList = [...electricals, newElectrical];
    setElectricals(newElectricalsList);
    setCurrentElectrical(newElectrical);
  }

  const handleTypeChange = (name: string, value: string) => {
    const updatedElectrical = {...currentElectrical, [name]: value}
    handlePostElectrical(updatedElectrical, value)
  }

  async function handlePostElectrical(updatedElectrical: ProjectElectrical, type: string) {
    const api = type === 'electricalpanel' ? 'panel' : type
    
    try {
      const data = await fetch(`/api/electrical/${api}`, {
        method: 'POST',
        body: JSON.stringify({
            ...updatedElectrical,
            projectId: currentProject.id
          })
      });

      if (data.ok) {
        console.log('New appliance created successfully.');

        const updatedElectricals = electricals.map((electrical) => {
          if (electrical.id === updatedElectrical.id) {
            return { ...electrical, ...updatedElectrical };
          }
          return electrical;
        });

        setElectricals(updatedElectricals);

        const response = await data.json()
        const createdElectrical = {...response, type: updatedElectrical.type}
        setCurrentElectrical(createdElectrical)
      } else {
        throw new Error('Failed to create a new appliance.');
      }
    } catch (error) {
      console.error('Error creating a new appliance:', error);
      throw error;
    }
  }

  const renderForm = () => {
    switch(currentElectrical?.type) {
      case 'Electrical Panel':
        return (<ElectricalPanelForm />);
      case 'Solar':
        return (<SolarPanelForm />);
      case 'Battery':
        return (<BatteryForm />);
      case 'EV Charger':
        return (<EVChargerForm />);
      case 'Generator':
        return (<GeneratorForm />);
      default:
        return null;
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
        onDelete={() => console.log('aheuhea')}
        onCreate={createElectrical}
        chipType="Electrical"
        chips={electricals}
        currentChip={currentElectrical?.id}
        onChipClick={(i: number) => setCurrentElectrical(electricals[i])}
      />
      <div style={{
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
              value={currentElectrical?.type.toLowerCase()}
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
      </div>
    </div>
  )
}

export default Electrical