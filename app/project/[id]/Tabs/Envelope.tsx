'use client'

import ChipManager from '@/components/ChipManager'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import InsulationForm from './EnvelopesForms/InsulationForm';
import AirSealingForm from './EnvelopesForms/AirSealingForm';
import { Project, ProjectEnvelope } from '@/types/types';
import ModelStore from '@/app/stores/modelStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { v4 } from 'uuid';

interface EnvelopeProps {
  currentProject: Project;
}

const Envelope: React.FC<EnvelopeProps> = observer(({ currentProject }) => {
  const [envelopes, setEnvelopes] = useState<ProjectEnvelope[]>([])
  const [currentEnvelope, setCurrentEnvelope] = useState<ProjectEnvelope>();

  useEffect(() => {
    if (currentProject && currentProject.envelopes) {
      setEnvelopes(currentProject.envelopes)

      if (!currentEnvelope) {
        setCurrentEnvelope(currentProject.envelopes[0])
      }
    }
  }, [currentProject, currentProject.envelopes])

  const handleTypeChange = (value: string) => {
    const updatedEnvelope = {...currentEnvelope, type: value}
    handlePostEnvelope(updatedEnvelope, value)
  }

  function createEnvelope() {
    const newEnvelope = {
      id: v4(),
      name: 'New Envelope',
      type: '',
      location: '',
      leakinessDescription: '',
      insulationLocation: '',
      insulationCondition: '',
      notes: '',
      condition: '',
    };

    const newEnvelopeList = [...envelopes, newEnvelope];
    setEnvelopes(newEnvelopeList);
    setCurrentEnvelope(newEnvelope);
  }

  async function handlePostEnvelope(envelope: ProjectEnvelope, type: string) {
    envelope.type = type;
    const createdEnvelope = await ModelStore.createEnvelope(currentProject.id!, envelope);
    const updatedEnvelopes = envelopes.map((envelope) => {
      if (envelope.id === createdEnvelope.id) {
        return { ...envelope, ...createdEnvelope };
      }
      return envelope;
    });
    setEnvelopes(updatedEnvelopes);
    setCurrentEnvelope(createdEnvelope);

  }

  async function deleteEnvelope(envelopeId: string) {
    const envelopeToDelete = envelopes.find(envelope => envelope.id === envelopeId);

    if (!envelopeToDelete) {
      return;
    }

    if (!envelopeToDelete.type) {
      const newEnvelopeList = envelopes.filter(r => r.id !== envelopeId);
      setEnvelopes(newEnvelopeList);
      setCurrentEnvelope(newEnvelopeList[0] || {});
      return;
    }

    await ModelStore.deleteEnvelope(currentProject.id!, envelopeToDelete.type, envelopeId);
    const newEnvelopeList = envelopes.filter(r => r.id !== envelopeId);
    setEnvelopes(newEnvelopeList);
    setCurrentEnvelope(newEnvelopeList[0] || {});

  }

  function handleInputChange(inputName: string, value: string) {
    if (currentEnvelope && currentEnvelope.id) {
      const updatedEnvelope = { ...currentEnvelope, [inputName]: value };
      setCurrentEnvelope(updatedEnvelope);
    }
  }

  async function patchEnvelope(updatedEnvelope = currentEnvelope) {
    console.log('caiu aqui')
    if (updatedEnvelope && updatedEnvelope.id) {
        const response = await ModelStore.updateEnvelope(currentProject.id!, updatedEnvelope);
        response.type = updatedEnvelope.type;
        const updatedEnvelopes = envelopes.map((envelope) => {
          if (envelope.id === updatedEnvelope.id) {
            return { ...envelope, ...updatedEnvelope };
          }
          return envelope;
        });
        setEnvelopes(updatedEnvelopes);
        setCurrentEnvelope(response);
        console.log(response);
    }
  }

  const renderForm = () => {
    switch(currentEnvelope?.type) {
      case 'Insulation':
        return (<InsulationForm onUpdate={() => patchEnvelope()} onChange={handleInputChange} currentEnvelope={currentEnvelope}/>);
      case 'AirSealing':
        return (<AirSealingForm onUpdate={() => patchEnvelope()} onChange={handleInputChange} currentEnvelope={currentEnvelope}/>);
      default:
          return (null);
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
        onCreate={createEnvelope}
        onDelete={deleteEnvelope}
        chips={envelopes}
        currentChip={currentEnvelope?.id || ''}
        chipType="Envelope"
        onChipClick={(i: number) => {
          console.log(toJS(envelopes[i]))
          setCurrentEnvelope(envelopes[i])
        }}
      />
      <div
        style={{
          width: '100%',
        }}
      >
        {currentEnvelope?.id && <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="envelope-type-label">Type</InputLabel>
            <Select
              labelId="envelope-type-label"
              id="envelope-type-select"
              label="Type"
              value={currentEnvelope?.type}
              disabled={currentEnvelope?.type ? true : false}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <MenuItem value={''} disabled={true}>Select Type</MenuItem>
              <MenuItem value={'Insulation'}>Insulation</MenuItem>
              <MenuItem value={'AirSealing'}>Air Sealing</MenuItem>
            </Select>
          </FormControl>
          {renderForm()}
        </form>}
      </div>
    </div>
  )
})

export default Envelope
