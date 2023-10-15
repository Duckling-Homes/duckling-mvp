"use client";

import ModelStore from "@/app/stores/modelStore";
import { Project } from "@/types/types";
import { Chip, FormGroup, FormLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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

interface ObjectivesProps {
  currentProject: Project;
}

const Objectives: React.FC<ObjectivesProps> = ({ currentProject }) => {
  const [data, setData] = useState<Project["data"]>({
    comfortIssueNotes: "",
    comfortIssueTags: [],
    healthSafetyIssueNotes: "",
    healthSafetyIssueTags: [],
    homeownerGoalsNotes: "",
    homeownerGoalsTags: []
  });

  useEffect(() => {
    if (currentProject?.data) {
      setData(currentProject.data);
    }
  }, [currentProject]);

  const handleTextChange = (inputName: string, value: string) => {
    if (currentProject && currentProject.id) {
      const updatedData = { ...data, [inputName]: value };
      setData(updatedData);
    }
  }

  const projectUpdate = async () => {
    if (currentProject && currentProject.id) {
      await ModelStore.patchProjectData(currentProject.id, data);
    }
  };

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
                  // onClick={() => handleInputChange(issue)}
                  label={issue}
                  key={i}
                  color={data?.comfortIssueTags?.includes(issue) ? "primary" : "default"}
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
            onChange={(e) => handleTextChange('comfortIssueNotes', e.target.value)}
            onBlur={projectUpdate}
            value={data?.comfortIssueNotes}
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
                  color={data?.healthSafetyIssueTags?.includes(issue) ? "primary" : "default"}
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
            onChange={(e) => handleTextChange('healthSafetyIssueNotes', e.target.value)}
            onBlur={projectUpdate}
            value={data?.healthSafetyIssueNotes}
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
                  color={data?.homeownerGoalsTags?.includes(goal) ? "primary" : "default"}
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
            onChange={(e) => handleTextChange('homeownerGoalsNotes', e.target.value)}
            onBlur={projectUpdate}
            value={data?.homeownerGoalsNotes}
          />
        </FormGroup>
      </form>
    </>
  )
}

export default Objectives