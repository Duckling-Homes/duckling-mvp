'use client'

import ChipManager from '@/components/ChipManager'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useEffect, useState } from 'react'
import InsulationForm from './EnvelopesForms/InsulationForm'
import AirSealingForm from './EnvelopesForms/AirSealingForm'
import { ProjectEnvelope } from '@/types/types'
interface Envelope {
  name: string
  type: string
  location?: string
  condition?: string
  leakiness?: string
  notes: string
  id: string
}

const Envelope = ({ currentProject }) => {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([])
  const [currentEnvelope, setCurrentEnvelope] = useState<Envelope>({
    id: '',
    type: '',
    name: '',
    location: '',
    leakiness: '',
    notes: '',
    condition: '',
  })

  useEffect(() => {
    if (currentProject && currentProject.envelopes) {
      setEnvelopes(currentProject.envelopes)
      setCurrentEnvelope(currentProject.envelopes[0])
    }
  }, [currentProject])

  const handleTypeChange = (name: string, value: string) => {
    const updatedEnvelope = {...currentEnvelope, [name]: value}
    console.log(updatedEnvelope)
    handlePostEnvelope(updatedEnvelope, value)
  }

  function createEnvelope() {
    const newEnvelope = {
      id: '',
      name: 'New Envelope'
    };

    const newEnvelopeList = [...envelopes, newEnvelope];
    setEnvelopes(newEnvelopeList);
    setCurrentEnvelope(newEnvelope);
  }

  async function handlePostEnvelope(updatedEnvelope: ProjectEnvelope, type: string) {
    try {
      const data = await fetch(`/api/project${type}`, {
        method: 'POST',
        body: JSON.stringify({
            ...updatedEnvelope,
            projectId: currentProject.id
          })
      });

      if (data.ok) {
        console.log('New envelope created successfully.');
        setCurrentEnvelope(updatedEnvelope)
      } else {
        throw new Error('Failed to create a new envelope.');
      }
    } catch (error) {
      console.error('Error creating a new envelope:', error);
      throw error;
    }
  }

  async function deleteEnvelope(envelopeId: string) {
    const envelopeToDelete = envelopes.find(envelope => envelope.id === envelopeId);

    if (envelopeToDelete) {
      try {
        const response = await fetch(`/api/project${envelopeToDelete.type}/${envelopeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Old envelope deleted successfully.');
          const newEnvelopeList = envelopes.filter(r => r.id !== envelopeId);
          setEnvelopes(newEnvelopeList);
          setCurrentEnvelope(newEnvelopeList[0] || {});
        } else {
          throw new Error('Failed to delete the old envelope.');
        }
      } catch (error) {
        console.error('Error deleting the old envelope:', error);
        throw error;
      }
    }
  }

  function handleInputChange(inputName: string, value: string) {
    if (currentEnvelope && currentEnvelope.id) {
      const updatedEnvelope = { ...currentEnvelope, [inputName]: value };
      setCurrentEnvelope(updatedEnvelope);
      patchEnvelope(updatedEnvelope);
    }
  }

  async function patchEnvelope(updatedEnvelope: ProjectEnvelope) {
    if (updatedEnvelope && updatedEnvelope.id) {
      try {
        const data = await fetch(`/api/project${updatedEnvelope.type}/${updatedEnvelope.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            ...updatedEnvelope,
            projectId: currentProject.id
          })
        });

        if (data.ok) {
          const response = await data.json();
          response.type = updatedEnvelope.type;

          // Update the envelopes and the currentEnvelope
          const updatedEnvelopes = envelopes.map((envelope) => {
            if (envelope.id === updatedEnvelope.id) {
              return { ...envelope, ...updatedEnvelope };
            }
            return envelope;
          });

          setEnvelopes(updatedEnvelopes);
          setCurrentEnvelope(response);
          console.log(response);
        } else {
          throw new Error('Failed to update the envelope.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }


  const renderForm = () => {
    switch(currentEnvelope?.type) {
      case 'Insulation':
        return (<InsulationForm onChange={handleInputChange} currentEnvelope={currentEnvelope}/>);
      case 'AirSealing':
        return (<AirSealingForm onChange={handleInputChange} currentEnvelope={currentEnvelope}/>);
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
        currentChip={currentEnvelope?.id}
        chipType="Envelope"
        onChipClick={(i: number) => setCurrentEnvelope(envelopes[i])}
      />
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
            <InputLabel id="envelope-type-label">Type</InputLabel>
            <Select
              labelId="envelope-type-label"
              id="envelope-type-select"
              label="Type"
              value={currentEnvelope?.type}
              disabled={currentEnvelope?.type ? true : false}
              onChange={(e) => handleTypeChange('type', e.target.value)}
            >
              <MenuItem value={'Insulation'}>Insulation</MenuItem>
              <MenuItem value={'AirSealing'}>Air Sealing</MenuItem>
            </Select>
          </FormControl>
          {renderForm()}
        </form>
      </div>
    </div>
  )
}

export default Envelope
