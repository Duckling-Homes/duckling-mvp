"use client";

import { Chip, FormGroup, FormLabel, TextField } from "@mui/material";
import { useState } from "react";

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

const MOCK_DATA = {
  "Drafty": true,
  "Too hot in summer": false,
  "Too cold in summer": false,
  "Too hot in winter": false,
  "Too cold in winter": false,
  "Humid": false,
  "Dry": false,
  "Noisy System": true,
  comfort_notes: "",
  "Mold": false,
  "Allergens": false,
  "Indoor air quality": true,
  "Asbestos": false,
  health_safety_notes: "Too noisy",
  "Improve comfort": false,
  "Improve health & safety": false,
  "Increase home value": true,
  "Lower bills": false,
  "Reduce emissions": false,
  goals_notes: "Reduce 20db",
}

const Objectives = ({ }) => {
  const [data] = useState(MOCK_DATA)
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
                  color={data[issue] ? "primary" : "default"}
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
            value={data.comfort_notes}
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
                  color={data[issue] ? "primary" : "default"}
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
            value={data.health_safety_notes}
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
                  color={data[goal] ? "primary" : "default"}
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
            value={data.goals_notes}
          />
        </FormGroup>
      </form>
    </>
  )
}

export default Objectives