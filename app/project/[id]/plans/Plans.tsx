'use client'

import ModelStore from '@/app/stores/modelStore'
import DeletePlanModal from '@/components/Modals/DeletePlan'
import IncentivesModal from '@/components/Modals/IncentivesModal'
import PlanModal from '@/components/Modals/PlanModal'
import { Plan, Project } from '@/types/types'
import * as Icons from '@mui/icons-material'
import { Button, Chip, Divider, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Photos from './Upgrades/Photos'
import PlanItem from './Upgrades/PlanItem'
import { observer } from 'mobx-react-lite'

import './style.scss'
import { toJS } from 'mobx'
import { InlineFinancingCalculator } from '@/components/Financing/InlineCalculator'

interface PlansProps {
  currentProject: Project
}

const Plans: React.FC<PlansProps> = observer(({ currentProject }) => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [hideFinance, setHideFinance] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [incentivesModal, setIncentivesModal] = useState(false)
  const [catalogue, setCatalogue] = useState(ModelStore.productCatalogue)

  useEffect(() => {
    if (currentProject && currentProject?.plans) {
      console.log(toJS(currentProject.plans))
      setPlans(currentProject.plans)
      if (!currentPlan?.id) {
        setCurrentPlan(currentProject.plans[0])
      }
    }
  })

  useEffect(() => {
    if (catalogue.length === 0) {
      ModelStore.fetchCatalogue().then((data) => setCatalogue(data))
    }
  }, [])

  async function handlePlanCreation(name: string) {
    if (!currentProject.id) {
      return
    }

    const plan: Plan = {
      name: name,
      projectId: currentProject.id,
    }

    const newPlan = await ModelStore.createPlan(currentProject.id, plan)
    setCurrentPlan(newPlan)
  }

  async function handlePlanDeletion() {
    if (!currentProject.id || !currentPlan?.id) {
      return
    }
    await ModelStore.deletePlan(currentProject.id, currentPlan?.id)

    const newPlansList = plans.filter((plan) => plan.id !== currentPlan?.id)

    setPlans(newPlansList)
    setCurrentPlan(newPlansList[0] || {})
  }

  async function handlePlanEdition(name: string) {
    const updatedPlan: Plan = {
      id: currentPlan?.id,
      name: name,
    }

    await ModelStore.patchPlan(currentProject.id as string, updatedPlan)

    setCurrentPlan(updatedPlan)
  }

  return (
    <>
      <IncentivesModal
        open={incentivesModal}
        onClose={() => setIncentivesModal(false)}
        currentPlanId={currentPlan?.id as string}
        projectId={currentProject.id as string}
      />
      <DeletePlanModal
        open={deleteModal}
        onConfirm={handlePlanDeletion}
        onClose={() => setDeleteModal(false)}
        plan={currentPlan ?? {}}
      />
      <PlanModal
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false)
          setEditMode(false)
        }}
        onConfirm={(name) => handlePlanCreation(name)}
        onEditConfirm={(name) => handlePlanEdition(name)}
        currentName={currentPlan?.name || ''}
        editMode={editMode}
      />
      <div className="planCreation">
        <div className="planCreation__buttons">
          {plans?.length > 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {plans?.map((plan) => (
                <Chip
                  key={plan.id}
                  label={plan.name}
                  color={currentPlan?.id === plan.id ? 'primary' : 'default'}
                  onClick={() => setCurrentPlan(plan)}
                />
              ))}
              <IconButton
                sx={{
                  borderRadius: '4px',
                  border: '1px solid #2196F3',
                  color: '#2196F3',
                  padding: '4px 11px',
                }}
                aria-label="add"
                onClick={() => setCreateModalOpen(true)}
              >
                <Icons.Add />
              </IconButton>
            </div>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => setCreateModalOpen(true)}
              startIcon={<Icons.Add />}
            >
              Create new plan
            </Button>
          )}
        </div>
        {currentPlan?.id && (
          <div className="planCreation__wrapper">
            <div className={`planCreation__leftContainer ${hideFinance ? 'hidden' : ''}`}>
              <div className="planCreation__leftHeader">
                <p className="planCreation__title">{currentPlan.name}</p>
                <IconButton
                  sx={{
                    borderRadius: '4px',
                    border: '1px solid #2196F3',
                    color: '#2196F3',
                    padding: '4px 11px',
                  }}
                  aria-label="add"
                  onClick={() => {
                    setEditMode(true)
                    setCreateModalOpen(true)
                  }}
                >
                  <Icons.Edit />
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
                  <Icons.Delete onClick={() => setDeleteModal(true)} />
                </IconButton>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setIncentivesModal(true)}
                  startIcon={<Icons.Check />}
                  sx={{
                    backgroundColor: '#2E7D32',
                  }}
                >
                  Complete Plan
                </Button>
              </div>
              <small>Click on “+ ADD” buttons to start adding projects.</small>
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Home Performance'}
                property={'HomePerformance'}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'HVAC'}
                property={'HVAC'}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Appliance Upgrades'}
                property={'Appliances'}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Energy and Storage'}
                property={'Electrical'}
              />
              <Photos plan={currentPlan} project={currentProject} />
            </div>
            <div className={`planCreation__rightContainer ${hideFinance ? 'hidden' : ''}`}>
              <div className="planCreation__rightHeader">
                <IconButton
                  sx={{
                    borderRadius: '4px',
                    border: '1px solid #2196F3',
                    color: '#2196F3',
                    padding: '4px 11px',
                  }}
                  onClick={() => setHideFinance(!hideFinance)}
                >
                  <Icons.DoubleArrow />
                </IconButton>
                <span>Finance & Impact</span>
              </div>
              <div className='planCreation__cost'>
                <div className="planCreation__sectionHeader">
                  <div>
                    <Icons.AttachMoney fontSize="small" />
                    <p>Cost</p>
                  </div>
                  <IconButton
                    sx={{
                      borderRadius: '4px',
                      backgroundColor: '#2196F3',
                      color: '#fff',
                      padding: '4px 11px',
                    }}
                  >
                    <Icons.Tune />
                  </IconButton>
                </div>
                <div className="planCreation__sectionItem">
                  Estimated Cost
                  <span>-</span>
                </div>
                <Divider />
                <div className="planCreation__sectionItem">
                  Incentives
                  <span>-</span>
                </div>
                <Divider />
                <div className="planCreation__sectionItem">
                  Cost
                  <span>-</span>
                </div>
                <Divider />
                <InlineFinancingCalculator
                  totalAmount={17000}
                  financingOptions={ModelStore.financingOptions}
                  onUpdate={() => null}
                />
              </div>
              <div className="planCreation__upgradeImpact">
                <div className="planCreation__sectionHeader">
                  <div>
                    <Icons.Home fontSize="small" />
                    <p>Upgrade Impact</p>
                  </div>
                </div>
                <div className="planCreation__sectionItem">
                  Comfort:
                  <div className="planCreation__sectionStars">
                    <Icons.Star />
                    <Icons.Star />
                  </div>
                </div>
                <div className="planCreation__sectionItem">
                  Health & Safety:
                  <div className="planCreation__sectionStars">
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                  </div>
                </div>
                <div className="planCreation__sectionItem">
                  Performance
                  <div className="planCreation__sectionStars">
                    <Icons.Star />
                    <Icons.Star />
                  </div>
                </div>
                <div className="planCreation__sectionItem">
                  Emissions
                  <div className="planCreation__sectionStars">
                    <Icons.Star />
                    <Icons.Star />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
})

export default Plans
