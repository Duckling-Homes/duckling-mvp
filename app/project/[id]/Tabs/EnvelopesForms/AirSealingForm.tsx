'use client'

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

const AirSealingForm = ({ onChange, currentEnvelope }) => {

  return (
    <>
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
          value={currentEnvelope?.name}
          onChange={(e) => onChange('name', e.target.value)}
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
            value={currentEnvelope?.leakinessDescription}
            onChange={(e) => onChange('leakinessDescription', e.target.value)}
          >
            <MenuItem value={'veryTight'}>Very Tight</MenuItem>
            <MenuItem value={'tight'}>Tight</MenuItem>
            <MenuItem value={'average'}>Average</MenuItem>
            <MenuItem value={'leaky'}>Leaky</MenuItem>
            <MenuItem value={'veryLeaky'}>Very Leaky</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="User Notes"
          variant="outlined"
          placeholder="User Notes"
          value={currentEnvelope?.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          multiline
        />
      </div>
    </>
  )
}

export default AirSealingForm