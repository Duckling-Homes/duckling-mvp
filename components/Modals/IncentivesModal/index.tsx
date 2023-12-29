import { Close } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Modal,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

import ModelStore from '@/app/stores/modelStore'
import { CatalogueItem, Copy, Incentive, Plan, PlanDetails } from '@/types/types'
import './styles.scss'
import { observer } from 'mobx-react-lite'
import { processPlanWithAggregationLimits } from '@/app/utils/planCalculation'
import { aggregationLimits } from '@/app/utils/hardcodedAggregationLimits'

const STEPS = ['Select Incentives', 'Review Copy']

const Incentives: React.FC<{
  rebates: Incentive[]
  taxCredits: Incentive[]
  onCheck: (incentiveId: string, parentId: string, parentCat: string) => void
}> = ({ rebates, taxCredits, onCheck }) => {

  function calculateIncentiveValue(incentive: Incentive) {
    switch(incentive.calculationType) {
      case 'FlatRate':
        return `up to $${incentive.calculationRateValue} per project`
      case 'PerUnit':
        return `$${incentive.calculationRateValue} per unit, up to $${incentive.maxLimit}`
      case 'Percentage':
        return `${(incentive.calculationRateValue as number)* 100}%, up to $${incentive.maxLimit}`
    }
  }
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      <div style={{
        padding: "16px",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        <span style={{
          fontSize: '20px',
          fontWeight: '500'
        }}>Rebate</span>
        {
          rebates?.length > 0 ? rebates.map((incentive: Incentive) => (
            <>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Checkbox
                  onChange={() => onCheck(incentive.id as string, incentive.parentId as string, incentive.parentCat as string)}
                  checked={incentive.selected}/>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1,
                  minWidth: "65%"
                }}>
                  <span>{incentive.name}</span>
                  <small>{incentive.descriptionText}</small>  
                </div>
                <span>
                  {calculateIncentiveValue(incentive)}
                </span>
              </div>
              <Divider />
            </>
          )) : <span>There are no rebates to select</span>
        }
      </div>
      <div style={{
        padding: "16px",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        <span style={{
          fontSize: '20px',
          fontWeight: '500'
        }}>Tax Credits</span>
        {
          taxCredits?.length > 0 ? taxCredits.map((incentive: Incentive) => (
            <>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Checkbox
                  onChange={() => onCheck(incentive.id as string, incentive.parentId as string, incentive.parentCat as string)}
                  checked={incentive.selected}/>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flex: 1
                }}>
                  <span>{incentive.name}</span>
                  <small>{incentive.descriptionText}</small>  
                </div>
                <span>
                  {calculateIncentiveValue(incentive)}
                </span>
              </div>
              <Divider />
            </>
          )) : <span>There are no Tax Credits to select</span>
        }
      </div>
    </div>
  )
}

const CopyReview: React.FC<{
  plan: Plan
  projectId: string
}> = ({ plan, projectId }) => {
  const [copyFields, setCopyFields] = useState({
    summary: '',
    recommended: '',
    comfort: '',
    health: ''
  })

  useEffect(() => {
    if (!plan.copy) {
      ModelStore.generateCopy(plan, projectId)
    }
    setCopyFields(plan?.copy as Copy)
  }, [])

  function updateCopyFields(newValue: string, field: string) {
    const oldFields = {...copyFields} as Copy

    oldFields[field] = newValue

    setCopyFields(oldFields)
    ModelStore.updatePlanCopy(plan.id as string, oldFields)
  }

  return (
    <div className='copyReview'>
      <div className='copyReview__wrapper'>
        <span className='copyReview__title'>Home Summary</span>
        <TextField
          multiline
          value={plan.copy?.summary || copyFields.summary}
          onChange={({target}) => updateCopyFields(target.value, 'summary')}
        />
      </div>
      <div className='copyReview__wrapper'>
        <span className='copyReview__title'>Plan Summary</span>
        <TextField
          multiline
          value={plan.copy?.recommended || copyFields.recommended}
          onChange={({target}) => updateCopyFields(target.value, 'recommended')}
        />
      </div>
      <div className='copyReview__wrapper'>
        <span className='copyReview__title'>Comfort Summary</span>
        <TextField
          multiline
          value={plan.copy?.comfort || copyFields.comfort}
          onChange={({target}) => updateCopyFields(target.value, 'comfort')}

        />
      </div>
      <div className='copyReview__wrapper'>
        <span className='copyReview__title'>Health Summary</span>
        <TextField
          multiline
          value={plan.copy?.health || copyFields.health}
          onChange={({target}) => updateCopyFields(target.value, 'health')}
        />
      </div>

    </div>
  )
}

const IncentivesModal: React.FC<{
  open: boolean
  onClose: () => void
  currentPlanId: string
  projectId: string
}> = observer(
  ({ open, onClose, currentPlanId, projectId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [plan, planDetails]: [Plan, PlanDetails] = ModelStore?.getPlan(currentPlanId) as [Plan, PlanDetails]

  function getAllIncentivesByType(type: string) {
    const incentives = [] as Incentive[];
    const uniqueIds = new Set();

    if (!plan) {
      return incentives;
    }
  
    const incentivesByCat = Object.values(planDetails)

    incentivesByCat.forEach(categoryArray => {
      categoryArray.forEach((item: CatalogueItem) => {
        if (item.incentives && item.incentives.length > 0) {
          const filteredIncentives = item.incentives.filter((incentive) => {
            incentive.parentId = item.id as string
            incentive.parentCat = item.category as string
            if (incentive.type === type && !uniqueIds.has(incentive.id)) {
              uniqueIds.add(incentive.id);
              return true;
            }
            return false;
          });

          incentives.push(...filteredIncentives);
        }
      });
    });

    return incentives
  }


  function handleNext() {
    if (activeStep === STEPS.length - 1) {
      savePlan()
      setActiveStep(0)
      onClose()
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function handleSelectIncentive(incentiveId: string, parentId: string, parentCat: string) {
    const details = {...planDetails}

    console.log(incentiveId, 'caiu')

    details[parentCat].forEach((workItem: CatalogueItem) => {
      if (workItem?.id === parentId) {
        workItem?.incentives?.forEach((incentive: Incentive) => {
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

    console.log(details[parentCat])

    ModelStore.updatePlanCategory(plan.id as string, details[parentCat] as CatalogueItem[], parentCat)

  }

  function renderStep() {
    switch(activeStep) {
      case 0:
        return (
          <Incentives
            onCheck={
              (incentiveId: string, parentId: string, parentCat: string) => handleSelectIncentive(incentiveId, parentId, parentCat)
            }
            rebates={getAllIncentivesByType('Rebate') as Incentive[]}
            taxCredits={getAllIncentivesByType('TaxCredit') as Incentive[]}
          />
        )
      case 1:
        return (
          <CopyReview
            plan={plan as Plan}
            projectId={projectId as string}
          />
        )
    }
  }

  async function savePlan() {
    console.log(planDetails)
    const catalogueItems = [].concat(...Object.values(planDetails))

    console.log(catalogueItems)

    const newPlan = {
      ...plan,
      planDetails: JSON.stringify(planDetails),
      catalogueItems: catalogueItems
    }

    processPlanWithAggregationLimits(newPlan, aggregationLimits)

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
          <Stepper activeStep={activeStep}>
            {STEPS.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {renderStep()}
        </div>
        <div className="incentivesModal__footer">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </Modal>
  )
})

export default IncentivesModal
