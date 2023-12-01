'use client'

import { useEffect, useState } from "react";
import ModelStore from "@/app/stores/modelStore";
import { Project } from "@/types/types";
import { Chip, FormGroup, FormLabel } from "@mui/material";
import { TextInput } from "@/components/Inputs";

const COMFORT_ISSUES = [
  'Drafty',
  'Too hot in summer',
  'Too cold in summer',
  'Too hot in winter',
  'Too cold in winter',
  'Humid',
  'Dry',
  'Noisy System',
]

const HEALTH_SAFETY = ['Mold', 'Allergens', 'Indoor air quality', 'Asbestos']

const GOALS = [
  'Improve comfort',
  'Improve health & safety',
  'Increase home value',
  'Lower bills',
  'Reduce Emissions',
]

const Objectives: React.FC<{ currentProject: Project }> = ({
  currentProject,
}) => {
  const [data, setData] = useState<Project['data']>()

  useEffect(() => {
    if (!data && currentProject?.data) {
      setData(currentProject.data)
    }
  }, [currentProject.data])

  const handleTextChange = (inputName: string, value: string) => {
    if (currentProject && currentProject.id) {
      const updatedData = { ...data, [inputName]: value }
      setData(updatedData)
    }
  }

  const handleChipChange = (inputName: string, value: string) => {
    let array = data ? (data[inputName] as string[]) : []

    if (array && array.includes(value)) {
      array = array.filter((item) => item !== value)
    } else {
      array.push(value)
    }

    const updatedData = { ...data, [inputName]: array }

    setData(updatedData)
    projectUpdate(updatedData)
  }

  const projectUpdate = async (projectData = data) => {
    if (currentProject && currentProject.id && projectData) {
      setData(await ModelStore.patchProjectData(currentProject.id, projectData))
    }
  }

  return (
    <>
      <form className="objectives">
        <FormGroup>
          <FormLabel>Comfort Issues</FormLabel>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '12px',
              marginBottom: '24px',
            }}
          >
            {COMFORT_ISSUES.map((issue) => (
              <Chip
                onClick={() => handleChipChange('comfortIssueTags', issue)}
                label={issue}
                key={issue}
                color={
                  data?.comfortIssueTags?.includes(issue)
                    ? 'primary'
                    : 'default'
                }
              />
            ))}
          </div>
          <TextInput
            label="Comfort Notes"
            placeholder="Comfort Notes"
            onChange={
              (value) => handleTextChange('comfortIssueNotes', value as string)
            }
            onBlur={() => projectUpdate()}
            value={data?.comfortIssueNotes || ''}
            multiline={true}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Health & Safety Issues</FormLabel>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '12px',
              marginBottom: '24px',
            }}
          >
            {HEALTH_SAFETY.map((issue) => (
              <Chip
                onClick={() => handleChipChange('healthSafetyIssueTags', issue)}
                label={issue}
                key={issue}
                color={
                  data?.healthSafetyIssueTags?.includes(issue)
                    ? 'primary'
                    : 'default'
                }
              />
            ))}
          </div>
          <TextInput
            label="Health & Safety Notes"
            placeholder="Health & Safety Notes"
            onChange={
              (value) => handleTextChange('healthSafetyIssueNotes', value as string)
            }
            onBlur={() => projectUpdate()}
            value={data?.healthSafetyIssueNotes || ''}
            multiline={true}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Goals</FormLabel>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '12px',
              marginBottom: '24px',
            }}
          >
            {GOALS.map((goal) => (
              <Chip
                onClick={() => handleChipChange('homeownerGoalsTags', goal)}
                label={goal}
                key={goal}
                color={
                  data?.homeownerGoalsTags?.includes(goal)
                    ? 'primary'
                    : 'default'
                }
              />
            ))}
          </div>
          <TextInput
            label="Goals Notes"
            placeholder="Goals Notes"
            onChange={
              (value) => handleTextChange('homeownerGoalsNotes', value as string)
            }
            onBlur={() => projectUpdate()}
            value={data?.homeownerGoalsNotes || ''}
            multiline={true}
          />
        </FormGroup>
      </form>
    </>
  )
}

export default Objectives
