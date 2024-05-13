import { Close } from '@mui/icons-material'
import { Button, Checkbox, Divider, IconButton, Modal } from '@mui/material'

import ModelStore from '@/app/stores/modelStore'
import {
  ProcessableAggregationLimit,
  AggregationLimitClass,
  processPlanWithAggregationLimits,
} from '@/app/utils/planCalculation'
import { CatalogueItem, Incentive, Plan, PlanDetails } from '@/types/types'
import { observer } from 'mobx-react-lite'
import './styles.scss'
import { AggregationLimit } from '@prisma/client'
import { formatCurrency } from '@/app/utils/utils'

const Incentives: React.FC<{
  rebates: Incentive[]
  taxCredits: Incentive[]
  onCheck: (incentiveId: string, parentId: string) => void
}> = ({ rebates, taxCredits, onCheck }) => {
  function calculateIncentiveValue(incentive: Incentive) {
    switch (incentive.calculationType) {
      case 'FlatRate':
        return `up to ${formatCurrency(
          (incentive.calculationRateValue as number) || 0
        )} per project`
      case 'PerUnit':
        return formatPerUnitIncentive(incentive)
      case 'Percentage':
        return formatPercentageIncentive(incentive)
    }
  }

  function formatPerUnitIncentive(incentive: Incentive) {
    if (incentive.maxLimit) {
      return `${formatCurrency(
        (incentive.calculationRateValue as number) || 0
      )} per unit, up to ${formatCurrency(incentive.maxLimit)}`
    } else {
      return `${formatCurrency(
        (incentive.calculationRateValue as number) || 0
      )} per unit`
    }
  }

  function formatPercentageIncentive(incentive: Incentive) {
    if (!incentive.calculationRateValue) {
      return ''
    }

    if (incentive.maxLimit) {
      return `${incentive?.calculationRateValue * 100}%, up to ${formatCurrency(
        incentive.maxLimit
      )}`
    } else {
      return `${incentive?.calculationRateValue * 100}%`
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div
        style={{
          padding: '16px',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: '500',
          }}
        >
          Rebate
        </span>
        {rebates?.length > 0 ? (
          rebates.map((incentive: Incentive) => (
            <>
              <div
                key={incentive.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Checkbox
                  onChange={() =>
                    onCheck(
                      incentive.id as string,
                      incentive.parentId as string
                    )
                  }
                  checked={incentive.selected}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: 1,
                    minWidth: '65%',
                  }}
                >
                  <span>{incentive.name}</span>
                  <small>{incentive.descriptionText}</small>
                </div>
                <span>{calculateIncentiveValue(incentive)}</span>
              </div>
              <Divider />
            </>
          ))
        ) : (
          <span>There are no rebates to select</span>
        )}
      </div>
      <div
        style={{
          padding: '16px',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: '500',
          }}
        >
          Tax Credits
        </span>
        {taxCredits?.length > 0 ? (
          taxCredits.map((incentive: Incentive) => (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Checkbox
                  onChange={() =>
                    onCheck(
                      incentive.id as string,
                      incentive.parentId as string
                    )
                  }
                  checked={incentive.selected}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: 1,
                  }}
                >
                  <span>{incentive.name}</span>
                  <small>{incentive.descriptionText}</small>
                </div>
                <span>{calculateIncentiveValue(incentive)}</span>
              </div>
              <Divider />
            </>
          ))
        ) : (
          <span>There are no Tax Credits to select</span>
        )}
      </div>
    </div>
  )
}

const IncentivesModal: React.FC<{
  open: boolean
  onClose: () => void
  currentPlanId: string
  projectId: string
  aggregationLimits: AggregationLimit[]
}> = observer(
  ({ open, onClose, currentPlanId, projectId, aggregationLimits }) => {
    const [plan]: [Plan, PlanDetails] = ModelStore?.getPlan(currentPlanId) as [
      Plan,
      PlanDetails,
    ]

    function getAllIncentivesByType(type: string) {
      const uniqueIncentivesSet = new Set<string>()
      const dedupedIncentives = [] as Incentive[]
      let catalogueItems = []

      if (!plan) {
        return []
      }

      if (plan.catalogueItems) {
        catalogueItems = plan.catalogueItems
      } else if (plan.planDetails) {
        const planDetails = JSON.parse(plan.planDetails)
        catalogueItems = planDetails.catalogueItems
      }

      catalogueItems?.forEach((item: CatalogueItem) => {
        if (item.incentives && Array.isArray(item.incentives)) {
          item.incentives.forEach((incentive) => {
            if (
              incentive.type === type &&
              !uniqueIncentivesSet.has(incentive.id as string)
            ) {
              incentive.parentId = item.customId
              uniqueIncentivesSet.add(incentive.id as string)
              dedupedIncentives.push(incentive)
            }
          })
        }
      })

      return dedupedIncentives
    }

    function handleNext() {
      savePlan()
      onClose()
      return
      // if (activeStep === STEPS.length - 1) {
      //   savePlan()
      //   setActiveStep(0)
      //   onClose()
      //   return
      // }
      // setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    function handleBack() {
      // setActiveStep((prevActiveStep) => prevActiveStep - 1)
      onClose()
    }

    function handleSelectIncentive(incentiveId: string, parentId: string) {
      let catalogueItems = []

      if (plan.catalogueItems) {
        catalogueItems = plan.catalogueItems
      } else if (plan.planDetails) {
        const planDetails = JSON.parse(plan.planDetails)
        catalogueItems = planDetails.catalogueItems
      }

      catalogueItems?.forEach((item: CatalogueItem) => {
        if (item?.customId === parentId) {
          item?.incentives?.forEach((incentive: Incentive) => {
            if (incentive.id === incentiveId) {
              if (incentive.selected) {
                incentive.selected = false
              } else {
                incentive.selected = true
              }
            }
          })
        }
      })
      ModelStore.updatePlanCategory(
        plan.id as string,
        catalogueItems as CatalogueItem[]
      )
    }

    // function renderStep() {
    //   switch (activeStep) {
    //     case 0:
    //       return (
    //         <Incentives
    //           onCheck={(incentiveId: string, parentId: string) =>
    //             handleSelectIncentive(incentiveId, parentId)
    //           }
    //           rebates={getAllIncentivesByType('Rebate') as Incentive[]}
    //           taxCredits={getAllIncentivesByType('TaxCredit') as Incentive[]}
    //         />
    //       )
    //     case 1:
    //       return (
    //         <CopyReview plan={plan as Plan} projectId={projectId as string} />
    //       )
    //   }
    // }

    async function savePlan() {
      const catalogueItems: CatalogueItem[] =
        ModelStore.catalogueItems as CatalogueItem[]

      const newPlan = {
        ...plan,
        catalogueItems: catalogueItems,
      }

      if (newPlan.planDetails) {
        delete newPlan.planDetails
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const aggLimitClasses = aggregationLimits.map((limit: any) => {
        // Transform the limit object
        const processedLimit: ProcessableAggregationLimit = {
          ...limit,
          impactedIncentiveIds: limit.impactedIncentives.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (incentive: any) => incentive?.id
          ),
        }

        // Create a new instance of AggregationLimitClass with the transformed object
        return new AggregationLimitClass(processedLimit)
      })

      processPlanWithAggregationLimits(newPlan, aggLimitClasses)

      newPlan.planDetails = JSON.stringify(newPlan)

      ModelStore.patchPlan(projectId, newPlan)
    }

    return (
      <Modal
        open={open}
        className="incentivesModal"
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="incentivesModal__content">
          <div className="incentivesModal__header">
            <p>Select Incentives</p>
            <IconButton
              sx={{
                borderRadius: '4px',
                border: '1px solid #2196F3',
                color: '#2196F3',
                padding: '4px 10px',
              }}
              onClick={onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </div>
          <div className="incentivesModal__body">
            <Incentives
              onCheck={(incentiveId: string, parentId: string) =>
                handleSelectIncentive(incentiveId, parentId)
              }
              rebates={getAllIncentivesByType('Rebate') as Incentive[]}
              taxCredits={getAllIncentivesByType('TaxCredit') as Incentive[]}
            />
          </div>
          <div className="incentivesModal__footer">
            <Button onClick={handleBack}>Cancel</Button>
            <Button onClick={handleNext}>Finish</Button>
          </div>
        </div>
      </Modal>
    )
  }
)

export default IncentivesModal
