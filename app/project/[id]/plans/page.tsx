'use client'

import PlanCreationModal from "@/components/Modals/PlanCreationModal"
import { Add, AttachMoney, Bolt, Build, CameraAlt, Check, Delete, DoubleArrow, Edit, Home, Thermostat } from "@mui/icons-material"
import { Button, Chip, IconButton } from "@mui/material"
import { useState } from "react"

import "./style.scss"
import HomePerformance from "./Upgrades/HomePerformance"
import Hvac from "./Upgrades/Hvac"
import ApplianceUpgrades from "./Upgrades/ApplianceUpgrade"
import EnergyStorage from "./Upgrades/EnergyStorage"
import Photos from "./Upgrades/Photos"

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
      <div className="planCreation">
        <div className="planCreation__buttons">
          {currentPlan ? (
            <div style={{
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
          ) :
          (<Button
            variant="contained"
            size="small"
            onClick={() => setCreateModalOpen(true)}
            startIcon={<Add />}>
              Create new plan
          </Button>)
          }
        </div>
        {currentPlan && (
          <div className="planCreation__wrapper">
            <div className="planCreation__leftContainer">
              <div className="planCreation__leftHeader">
                <p className="planCreation__title">{currentPlan}</p>
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
                  sx={{
                    backgroundColor: "#2E7D32"
                  }}
                >
                  Complete Plan
                </Button>
              </div>
              <small>Click on “+ ADD” buttons to start adding projects.</small>
              <HomePerformance />
              <Hvac />
              <ApplianceUpgrades />
              <EnergyStorage />
              <Photos />
            </div>
            <div className="planCreation__rightContainer">
              <div className="planCreation__rightHeader">
                <IconButton sx={{
                    borderRadius: '4px',
                    border: '1px solid #2196F3',
                    color: '#2196F3',
                    padding: '4px 11px',
                  }}>
                  <DoubleArrow/>
                </IconButton>
                <p>Finance & Impact</p>
              </div>
              <div className="planCreation__cost">
                <p><AttachMoney />Cost</p>
              </div>
              <div className="planCreation__upgradeImpact">

              </div>
            </div>
          </div>
        )}
      </div>
    </>

  )
}


export default Plans