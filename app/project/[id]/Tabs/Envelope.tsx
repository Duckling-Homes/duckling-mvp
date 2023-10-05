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

const MOCK_DATA = [
  {
    id: 'b7ea34e5-036a-49a3-9a35-f7f3b18ffcf6',
    name: 'Attic Insulation',
    type: 'insulation',
    location: 'attic',
    condition: 'poor',
    notes: 'We estimate this insulation is R9',
  },
  {
    id: 'a64f1239-6f39-48c2-a4f3-1db48eef2a9e',
    name: 'Basement Insulation',
    type: 'insulation',
    location: 'basement',
    condition: 'fair',
    notes: 'We estimate this insulation is R18',
  },
  {
    id: '0cb3ca24-5b85-4a02-9c1f-0e849f91e9e7',
    name: 'Air sealing',
    type: 'air-sealing',
    leakiness: 'leaky',
    notes: 'Blower door results - 6 ACH50',
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
  const [envelopes] = useState<Envelope[]>(MOCK_DATA)
  const [currentEnvelope, setCurrentEnvelope] = useState<Envelope>(MOCK_DATA[0])
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
              value={currentEnvelope.type}
              onChange={handleChange}
            >
              <MenuItem value={'insulation'}>Insulation</MenuItem>
              <MenuItem value={'air-sealing'}>Air Sealing</MenuItem>
            </Select>
          </FormControl>
          {currentEnvelope.type === 'insulation' ? (
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
                value={currentEnvelope.name}
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
                  value={currentEnvelope.location}
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
                  value={currentEnvelope.condition}
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
                value={currentEnvelope.notes}
                placeholder="User Notes"
                fullWidth
                multiline
              />
            </div>
          ) : currentEnvelope.type === 'air-sealing' ? (
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
                value={currentEnvelope.name}
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
                  value={currentEnvelope.leakiness}
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
                value={currentEnvelope.notes}
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
