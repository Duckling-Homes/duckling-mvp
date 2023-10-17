"use client";

// import ChipManager from "@/components/ChipManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ElectricalPanelForm from "./ElectricalForms/ElectricalPanelForm";
import SolarPanelForm from "./ElectricalForms/SolarPanelForm";
import BatteryForm from "./ElectricalForms/BatteryForm";
import EVChargerForm from "./ElectricalForms/EVChargerForm";
import GeneratorForm from "./ElectricalForms/GeneratorForm";

const TYPES = [
  "Electrical Panel",
  "Solar",
  "Battery",
  "EV Charger",
  "Generator",
]

const Electrical = () => {
  const [currentElectrical, setCurrentElectrical] = useState({
    type: ''
  });

  const handleInputChange = async (inputName: string, value: string | number) => {
    const updatedData = { ...currentElectrical, [inputName]: value };
    setCurrentElectrical(updatedData);
  };

  const renderForm = () => {
    switch(currentElectrical.type) {
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
              value={currentElectrical.type}
              onChange={({ target }) => handleInputChange('type', target.value)}
            >
              {
                TYPES.map((type, i) => (
                  <MenuItem key={i} value={type}>{type}</MenuItem>
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