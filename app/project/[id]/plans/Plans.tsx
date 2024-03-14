'use client'

import ModelStore from '@/app/stores/modelStore'
import DeletePlanModal from '@/components/Modals/DeletePlan'
import IncentivesModal from '@/components/Modals/IncentivesModal'
import PlanModal from '@/components/Modals/PlanModal'
import { CatalogueItem, Copy, Incentive, Plan, Project } from '@/types/types'
import * as Icons from '@mui/icons-material'
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Photos from './Upgrades/Photos'
import PlanItem from './Upgrades/PlanItem'
import { observer } from 'mobx-react-lite'
import { InlineFinancingCalculator } from '@/components/Financing/InlineCalculator'
import './style.scss'

interface PlansProps {
  currentProject: Project
}

const Plans: React.FC<PlansProps> = observer(({ currentProject }) => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlanID, setCurrentPlanID] = useState<string | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [hideFinance, setHideFinance] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [incentivesModal, setIncentivesModal] = useState(false)
  const [catalogue, setCatalogue] = useState(ModelStore.productCatalogue)
  const [aggregationLimits, setAggregationLimits] = useState(
    ModelStore.aggregationLimits
  )
  const [isLoading, setIsLoading] = useState(false)
  const [copyFields, setCopyFields] = useState<Copy>({
    summary: '',
    comfort: '',
    health: '',
    recommended: '',
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const currentPlan = (currentProject?.plans ?? []).find(
    (p) => p.id === currentPlanID
  )

  useEffect(() => {
    if (currentProject && currentProject?.plans) {
      setPlans(currentProject.plans)
      if (!currentPlanID) {
        setCurrentPlanID(currentProject.plans[0]?.id ?? null)
      }
    }
  })

  useEffect(() => {
    if (catalogue.length === 0) {
      ModelStore.fetchCatalogue().then((data) =>
        setCatalogue(data.productCatalogue)
      )
    }
  }, [])

  useEffect(() => {
    if (aggregationLimits.length === 0) {
      ModelStore.fetchCatalogue().then((data) =>
        setAggregationLimits(data.aggregationLimits)
      )
    }
  }, [])

  useEffect(() => {
    setCopyFields(currentPlan?.copy as Copy)
  }, [currentPlan])

  console.log(catalogue)

  async function handlePlanCreation(name: string) {
    if (!currentProject.id) {
      return
    }

    const plan: Plan = {
      name: name,
      projectId: currentProject.id,
    }

    const newPlan = await ModelStore.createPlan(currentProject.id, plan)
    setCurrentPlanID(newPlan.id as string)
  }

  async function handlePlanDeletion() {
    if (!currentProject.id || !currentPlan?.id) {
      return
    }
    await ModelStore.deletePlan(currentProject.id, currentPlan?.id)

    const newPlansList = plans.filter((plan) => plan.id !== currentPlan?.id)

    setPlans(newPlansList)
    setCurrentPlanID(newPlansList[0]?.id || null)
  }

  async function handlePlanEdition(name: string) {
    const updatedPlan: Plan = {
      ...currentPlan,
      id: currentPlan?.id,
      name: name,
    }

    await ModelStore.patchPlan(currentProject.id as string, updatedPlan)

    setCurrentPlanID(updatedPlan?.id ?? null)
  }

  function calculateEstimatedCost(plan: Plan) {
    let catalogueItems = []
    let estimatedCost = 0

    if (plan?.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan?.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails)?.catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item?.quantity && item?.basePricePer) {
        estimatedCost += ((item.quantity as number) || 0) * item.basePricePer
        if (item?.additionalCosts) {
          item?.additionalCosts.forEach((cost) => {
            estimatedCost += Number(cost.price)
          })
        }
      }
    })

    return estimatedCost
  }

  function calculateRebates(plan: Plan) {
    let totalRebates = 0
    let catalogueItems = []

    if (plan?.catalogueItems) {
      catalogueItems = plan?.catalogueItems
    } else if (plan?.planDetails) {
      catalogueItems = JSON.parse(plan?.planDetails)?.catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item.incentives) {
        item.incentives.forEach((incentive) => {
          if (incentive.selected && incentive.type == 'Rebate') {
            totalRebates += incentive.finalCalculations?.usedAmount || 0
          }
        })
      }
    })

    return totalRebates
  }

  function calculateNetCost(plan: Plan) {
    const estimatedCost = calculateEstimatedCost(plan)
    const totalRebates = calculateRebates(plan)

    return estimatedCost - totalRebates
  }

  function calculateFinalCost(plan: Plan) {
    const netCost = calculateNetCost(plan)
    let totalTaxCredits = 0
    let catalogueItems = []

    if (plan.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails).catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item.incentives) {
        item.incentives.forEach((incentive) => {
          if (incentive.selected && incentive.type == 'TaxCredit') {
            totalTaxCredits += incentive.finalCalculations?.usedAmount || 0
          }
        })
      }
    })

    return netCost - totalTaxCredits
  }

  function renderIncentivesList(type: string, plan: Plan) {
    let catalogueItems = []
    const incentivesToRender = [] as Incentive[]

    if (plan?.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan?.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails)?.catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item.incentives) {
        item.incentives.forEach((incentive) => {
          if (incentive.selected && incentive.type == type) {
            incentivesToRender.push(incentive)
          }
        })
      }
    })

    return incentivesToRender.map((incentive) => (
      <div className="incentive" key={incentive.id}>
        <div className="textWrapper">
          <span className="name">{incentive.name}</span>
          <small>{incentive.finalCalculations?.warningText}</small>
        </div>
        <span>{`$${
          incentive.finalCalculations?.usedAmount.toFixed(2) || 0
        }`}</span>
      </div>
    ))
  }

  async function duplicatePlan() {
    if (!currentProject.id || !currentPlan?.id) {
      console.error("current project doesn't have an id")
      return
    }

    const plan = {
      ...currentPlan,
      name: `${currentPlan.name} copy`,
    }

    delete plan.id

    const newPlan = await ModelStore.createPlan(currentProject.id, plan)

    setCurrentPlanID(newPlan.id as string)
  }

  async function handleGenerateSummary() {
    if (!currentProject.id || !currentPlan?.id) {
      console.error("current project or plan doesn't have an id")
      return
    }
    setIsLoading(true)
    await ModelStore.generateCopy(currentPlan, currentProject.id)
    setIsLoading(false)
  }

  function updateCopyFields(newValue: string, field: string) {
    if (!currentProject.id || !currentPlan?.id) {
      console.error("current project or plan doesn't have an id")
      return
    }

    const oldFields = { ...copyFields } as Copy
    oldFields[field] = newValue

    setCopyFields(oldFields)
    ModelStore.updatePlanCopy(currentPlan.id, oldFields)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IncentivesModal
        open={incentivesModal}
        onClose={() => setIncentivesModal(false)}
        currentPlanId={currentPlan?.id as string}
        projectId={currentProject.id as string}
        aggregationLimits={aggregationLimits}
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
                  onClick={() => setCurrentPlanID(plan.id ?? null)}
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
            <div
              className={`planCreation__leftContainer ${
                hideFinance ? 'hidden' : ''
              }`}
            >
              <div className="planCreation__leftHeader">
                <p className="planCreation__title">{currentPlan.name}</p>
                <IconButton
                  sx={{
                    borderRadius: '4px',
                    color: '#2196F3',
                    padding: '4px 11px',
                    border: '1px solid #2196F3',
                  }}
                  aria-label="add"
                  onClick={(e) => handleClick(e)}
                >
                  <Icons.MoreHoriz />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem>
                    <Button
                      sx={{
                        color: '#000',
                      }}
                      startIcon={<Icons.Edit />}
                      aria-label="add"
                      onClick={() => {
                        setEditMode(true)
                        setCreateModalOpen(true)
                        handleClose()
                      }}
                    >
                      Edit Plan
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      sx={{
                        color: '#000',
                      }}
                      startIcon={<Icons.Delete />}
                      onClick={() => {
                        setDeleteModal(true)
                        handleClose()
                      }}
                    >
                      Delete Plan
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      sx={{
                        color: '#000',
                      }}
                      startIcon={<Icons.ContentCopy />}
                      onClick={() => {
                        duplicatePlan()
                        handleClose()
                      }}
                    >
                      Duplicate Plan
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
              <small>Click on “+ ADD” buttons to start adding projects.</small>
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Home Performance'}
                property={'HomePerformance'}
                aggregationLimits={aggregationLimits}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'HVAC'}
                property={'HVAC'}
                aggregationLimits={aggregationLimits}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Appliance Upgrades'}
                property={'Appliances'}
                aggregationLimits={aggregationLimits}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Electrical'}
                property={'Electrical'}
                aggregationLimits={aggregationLimits}
              />
              <PlanItem
                catalogue={catalogue}
                plan={currentPlan}
                title={'Additional Services'}
                property={'Other'}
                aggregationLimits={aggregationLimits}
              />
              <Photos plan={currentPlan} project={currentProject} />
            </div>
            <div
              className={`planCreation__rightContainer ${
                hideFinance ? 'hidden' : ''
              }`}
            >
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
              <div className="planCreation__cost">
                <div className="planCreation__sectionHeader">
                  <div>
                    <Icons.AttachMoney fontSize="small" />
                    <p>Cost</p>
                  </div>
                  <Button
                    sx={{
                      fontSize: '10px',
                    }}
                    variant="contained"
                    size="small"
                    onClick={() => setIncentivesModal(true)}
                    // endIcon={<Icons.Tune />}
                  >
                    Set Incentives
                  </Button>
                </div>
                <div className="planCreation__sectionItem">
                  <div className="title">
                    Estimated Cost
                    <span>{`$${calculateEstimatedCost(currentPlan).toFixed(
                      2
                    )}`}</span>
                  </div>
                </div>
                <Divider />
                <div className="planCreation__sectionItem">
                  <div className="title">
                    Rebates
                    <span>{`$${calculateRebates(currentPlan).toFixed(
                      2
                    )}`}</span>
                  </div>
                  <div className="incentiveList">
                    {renderIncentivesList('Rebate', currentPlan)}
                  </div>
                </div>
                <Divider />
                <div className="planCreation__sectionItem">
                  <div className="title">
                    Net Cost
                    <span>{`$${calculateNetCost(currentPlan).toFixed(
                      2
                    )}`}</span>
                  </div>
                  <div className="incentiveList">
                    {renderIncentivesList('TaxCredit', currentPlan)}
                  </div>
                </div>
                <Divider />
                <div className="planCreation__sectionItem">
                  <div className="title">
                    Final Cost
                    <span>{`$${calculateFinalCost(currentPlan).toFixed(
                      2
                    )}`}</span>
                  </div>
                </div>
                <Divider />
                <InlineFinancingCalculator
                  totalAmount={calculateFinalCost(currentPlan)}
                  financingOptions={ModelStore.financingOptions}
                  onUpdate={() => null}
                />
              </div>
              <div className="planCreation__upgradeImpact">
                <div className="planCreation__sectionHeader">
                  <div>
                    <Icons.Home fontSize="small" />
                    <p>Plan Summary</p>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleGenerateSummary()}
                  >
                    Generate
                  </Button>
                </div>
                {isLoading ? (
                  <div className="planCreation__copyReview">
                    <span>Generating Copy</span>
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <div className="planCreation__sectionItem">
                      Plan Summary
                      <TextField
                        multiline
                        value={copyFields?.summary || ''}
                        onChange={({ target }) =>
                          updateCopyFields(target.value, 'summary')
                        }
                      />
                    </div>
                    <div className="planCreation__sectionItem">
                      Comfort Summary
                      <TextField
                        multiline
                        value={copyFields?.comfort || ''}
                        onChange={({ target }) =>
                          updateCopyFields(target.value, 'comfort')
                        }
                      />
                    </div>
                    <div className="planCreation__sectionItem">
                      Health Summary
                      <TextField
                        multiline
                        value={copyFields?.health || ''}
                        onChange={({ target }) =>
                          updateCopyFields(target.value, 'health')
                        }
                      />
                    </div>
                    <div className="planCreation__sectionItem">
                      Additional Benefits
                      <TextField
                        multiline
                        value={copyFields?.recommended || ''}
                        onChange={({ target }) =>
                          updateCopyFields(target.value, 'recommended')
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
})

export default Plans
