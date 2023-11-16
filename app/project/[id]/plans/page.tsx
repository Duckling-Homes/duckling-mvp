'use client'

import PlanCreationModal from "@/components/Modals/PlanCreationModal"
import { Add, Bolt, Build, CameraAlt, Check, Delete, Edit, Home, Thermostat } from "@mui/icons-material"
import { Button, Chip, IconButton } from "@mui/material"
import { useState } from "react"

const Plans = () => {
  const [plans, setPlans] = useState([])
  const [currentPlan, setCurrentPlan] = useState('')
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <>
      <PlanCreationModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onConfirm={(name) => setCurrentPlan(name)}
      />
      <div>
        {currentPlan ?
          <div>
            <div style={{
              padding: "16px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}>
              <Chip label={currentPlan} color="primary"/>
              <IconButton
                sx={{
                  borderRadius: '4px',
                  border: '1px solid #2196F3',
                  color: '#2196F3',
                  padding: '4px 11px',
                }}
                aria-label="add"
              >
                <Add />
              </IconButton>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              width: "100%"
            }}>
              <div className="left-content" style={{
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                }}>
                  Comprehensive Upgrades
                  <IconButton
                    sx={{
                      borderRadius: '4px',
                      border: '1px solid #2196F3',
                      color: '#2196F3',
                      padding: '4px 11px',
                    }}
                    aria-label="add"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{
                      borderRadius: '4px',
                      border: '1px solid #2196F3',
                      color: '#2196F3',
                      padding: '4px 11px',
                    }}
                    aria-label="add"
                  >
                    <Delete />
                  </IconButton>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setCreateModalOpen(true)}
                    startIcon={<Check />}
                  >
                    Complete Plan
                  </Button>
                </div>
                <small>Click on "+ ADD" buttons to start adding projects.</small>
                <div>
                  <Home/>
                  Home Performance
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={<Add />}>
                    Add
                  </Button>
                </div>
                <div>
                  <Thermostat/>
                  HVAC
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={<Add />}>
                    Add
                  </Button>
                </div>
                <div>
                  <Build />
                  Applance Upgrades
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={<Add />}>
                    Add
                  </Button>
                </div>
                <div>
                  <Bolt />
                  Energy and Storage
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={<Add />}>
                    Add
                  </Button>
                </div>
                <div>
                  <CameraAlt />
                  Photos
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={<Add />}>
                    Add
                  </Button>
                </div>
              </div>
              <div className="right-content" style={{
                padding: "8px"
              }}>
                hide/show button
                Finance & Impact
                <div>
                  Cost table
                </div>
                <div>
                  upgrade Impact Table
                </div>
              </div>
            </div>
          </div>
          :
          <Button
            variant="contained"
            size="small"
            onClick={() => setCreateModalOpen(true)}
            startIcon={<Add />}>
              Create new plan
          </Button>}
      </div>
    </>

  )
}


export default Plans