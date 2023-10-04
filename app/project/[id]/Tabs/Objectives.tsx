"use client";

import { Chip, FormControl, FormGroup, FormLabel, TextField } from "@mui/material";

const COMFORT_ISSUES = [
  "Drafty",
  "Too hot in summer",
  "Too cold in summer",
  "Too hot in winter",
  "Too cold in winter",
  "Humid",
  "Dry",
  "Noisy System",
]

const HEALTH_SAFETY = [
  "Mold",
  "Allergens",
  "Indoor air quality",
  "Asbestos",
]

const GOALS = [
  "Improve comfort",
  "Improve health & safety",
  "Increase home value",
  "Lower bills",
  "Reduce Emissions",
]

const Objectives = ({ }) => {
  return (
    <>
      <form className="objectives">
        <FormGroup>
          <FormLabel>Comfort Issues</FormLabel>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '12px',
            marginBottom: '24px',
          }}>
            {
              COMFORT_ISSUES.map((issue, i) => (
                <Chip
                  onClick={() => console.log(issue)}
                  label={issue}
                  key={i}
                  color={"primary"}
                />
              ))
            }
          </div>
          <TextField
            id="outlined-basic"
            label="Comfort Notes"
            variant="outlined"
            placeholder='Comfort Notes'
            multiline
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Health & Safety Issues</FormLabel>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '12px',
            marginBottom: '24px',
          }}>
            {
              HEALTH_SAFETY.map((issue, i) => (
                <Chip
                  onClick={() => console.log(issue)}
                  label={issue}
                  key={i}
                  color={"primary"}
                />
              ))
            }
          </div>
          <TextField
            id="outlined-basic"
            label="Health & Safety Notes"
            variant="outlined"
            placeholder='Health & Safety Notes'
            multiline
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Goals</FormLabel>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '12px',
            marginBottom: '24px',
          }}>
            {
              GOALS.map((goal, i) => (
                <Chip
                  onClick={() => console.log(goal)}
                  label={goal}
                  key={i}
                  color={"primary"}
                />
              ))
            }
          </div>
          <TextField
            id="outlined-basic"
            label="Goals Notes"
            variant="outlined"
            placeholder='Goals Notes'
            multiline
          />
        </FormGroup>
      </form>
    </>
  )
}

export default Objectives