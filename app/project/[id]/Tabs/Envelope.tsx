'use client'

import ChipManager from '@/components/ChipManager'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

const TEST = [
  {
    id: '1',
    name: 'Envelope 1',
    type: 'insulation',
    location: 'wall',
    condition: 'good',
    notes: 'HERE BE DRAGONS',
  },
  {
    id: '2',
    name: 'Envelope 2',
    type: 'insulation',
    location: 'crawlspace',
    condition: 'poor',
    notes:
      'TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST',
  },
  {
    id: '3',
    name: 'Envelope 3',
    type: 'air-sealing',
    leakiness: 'leaky',
    notes: 'AAAAAAAAAAAAAAAAAAAAAAA',
  },
];

interface Envelope {
  name: string
  type: string
  location?: string
  condition?: string
  leakiness?: string
  notes: string
  id: string
}

const Envelope = () => {
  const [envelopes] = useState<Envelope[]>(TEST)
  const [currentEnvelope, setCurrentEnvelope] = useState<Envelope>(TEST[1])
  const [envelopeData, setEnvelopeData] = useState<Envelope>({
    id: '0',
    type: '',
    name: '',
    location: '',
    leakiness: '',
    notes: '',
    condition: '',
  })

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setEnvelopeData({ ...envelopeData, [name]: value })
  }

  useEffect(() => {
    if (currentEnvelope) {
      setEnvelopeData({
        type: currentEnvelope.type,
        name: currentEnvelope.name,
        notes: currentEnvelope.notes,
        location: currentEnvelope.location || '',
        condition: currentEnvelope.condition || '',
        leakiness: currentEnvelope.leakiness || '',
        id: currentEnvelope.id,
      })
    }
  }, [currentEnvelope])

  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        gap: '32px',
      }}
    >
      <ChipManager
        onCreate={() => console.log('create')}
        onDelete={() => console.log('delete')}
        chips={envelopes}
        currentChip={currentEnvelope.id}
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
              value={envelopeData.type}
              onChange={handleChange}
            >
              <MenuItem value={'insulation'}>Insulation</MenuItem>
              <MenuItem value={'air-sealing'}>Air Sealing</MenuItem>
            </Select>
          </FormControl>
          {envelopeData.type === 'insulation' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <TextField
                id="outlined-basic"
                label="Name"
                value={name}
                variant="outlined"
                placeholder="Name"
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="insolation-location-label">
                  Insulation Location
                </InputLabel>
                <Select
                  labelId="insolation-location-label"
                  id="insolation-location-select"
                  label="Insulation Location"
                  value={location}
                >
                  <MenuItem value={'attic'}>Attic</MenuItem>
                  <MenuItem value={'basement'}>Basement</MenuItem>
                  <MenuItem value={'crawlspace'}>Crawlspace</MenuItem>
                  <MenuItem value={'wall'}>Wall</MenuItem>
                  <MenuItem value={'floor'}>Floor</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="leakiness-description-label">
                  Insulation Condition
                </InputLabel>
                <Select
                  labelId="insulation-condition-label"
                  id="insulatiom-condition-select"
                  label="Insulation Condition"
                  value={envelopeData.condition}
                >
                  <MenuItem value={'none'}>None</MenuItem>
                  <MenuItem value={'good'}>Good</MenuItem>
                  <MenuItem value={'fair'}>Fair</MenuItem>
                  <MenuItem value={'poor'}>Poor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="User Notes"
                variant="outlined"
                value={envelopeData.notes}
                placeholder="User Notes"
                fullWidth
                multiline
              />
            </div>
          ) : envelopeData.type === 'air-sealing' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                placeholder="Name"
                value={name}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="leakiness-description-label">
                  Leakiness Description
                </InputLabel>
                <Select
                  labelId="leakiness-description-label"
                  id="leakiness-description-select"
                  label="Leakiness Description"
                  value={envelopeData.leakiness}
                >
                  <MenuItem value={'very-tight'}>Very Tight</MenuItem>
                  <MenuItem value={'tight'}>Tight</MenuItem>
                  <MenuItem value={'average'}>Average</MenuItem>
                  <MenuItem value={'leaky'}>Leaky</MenuItem>
                  <MenuItem value={'very leaky'}>Very Leaky</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id="outlined-basic"
                label="User Notes"
                variant="outlined"
                placeholder="User Notes"
                value={envelopeData.notes}
                multiline
              />
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  )
}

export default Envelope
