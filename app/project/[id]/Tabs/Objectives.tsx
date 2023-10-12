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

type MockData = {
  [key: string]: boolean | string; // Define the type of keys in MOCK_DATA
  comfort_notes: string;
  health_safety_notes: string;
  goals_notes: string;
};

const MOCK_DATA: MockData = {
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

const Objectives = ({currentProject}) => {
  const [data] = useState<MockData>(currentProject?.data || {})
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
                  color={data.comfortIssueTags?.includes(issue) ? "primary" : "default"}
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
            value={data.comfortIssueNotes}
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
                  color={data.healthSafetyIssueTags?.includes(issue) ? "primary" : "default"}
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
            value={data.healthSafetyIssueNotes}
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
                  color={data.homeownerGoalsTags?.includes(goal) ? "primary" : "default"}
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
            value={data.homeownerGoalsNotes}
          />
        </FormGroup>
      </form>
    </>
  )
}

export default Objectives