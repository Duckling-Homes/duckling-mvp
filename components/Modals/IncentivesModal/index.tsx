import { useEffect, useState } from 'react'
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
} from '@mui/material'

import './styles.scss'
import ModelStore from '@/app/stores/modelStore';

const STEPS = ['Select Incentives', 'Review Copy'];

const Incentives = ({ rebates, taxCredits, selectedIncentives, onCheck }) => {


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
        Rebate
        {
          rebates.length > 0 ? rebates.map(incentive => (
            <>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Checkbox onChange={() => onCheck(incentive.id)} checked={selectedIncentives.includes(incentive.id)}/>
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
                  {`$${incentive.maxLimit}`}
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
        Tax Credits
        {
          taxCredits.length > 0 ? taxCredits.map(incentive => (
            <>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Checkbox onChange={() => onCheck(incentive.id)} checked={selectedIncentives.includes(incentive.id)}/>
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
                  {`$${incentive.maxLimit}`}
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


const CopyReview = () => {
  return (
    <div>
      Copy Review
    </div>
  )
}

const IncentivesModal: React.FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
}> = ({ open, onConfirm, onClose, currentPlanId, projectId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedIncentives, setSelectedIncentives] = useState([])
  const plan = ModelStore?.getPlan(currentPlanId)

  useEffect(() => {
    console.log(plan)
    // if (selectedIncentives.length === 0 && plan) {
    //   if (plan.planDetails.selectedIncentives) {
    //     setSelectedIncentives(plan.planDetails.selectedIncentives)
    //   }
    // }
  })

  function getAllIncentivesByType(type) {
    const incentives = [];

    if (!plan) {
      return incentives
    }

    Object.values(plan.planDetails).forEach(categoryArray => {
      categoryArray.forEach(item => {
        if (item.incentives && item.incentives.length > 0) {
          const filteredIncentives = item.incentives.filter(incentive => incentive.type === type)

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

  function handleSelectIncentive(incentiveId) {
    const isInSelected = selectedIncentives.includes(incentiveId);
    let updatedSelection = []

    if (isInSelected) {
      updatedSelection = selectedIncentives.filter(id => id !== incentiveId);
    } else {
      updatedSelection = [...selectedIncentives, incentiveId];
    }

    setSelectedIncentives(updatedSelection)
  }

  function renderStep() {
    switch(activeStep) {
      case 0:
        return (
          <Incentives
            onCheck={(incentiveId) => handleSelectIncentive(incentiveId)}
            selectedIncentives={selectedIncentives}
            rebates={getAllIncentivesByType('Rebate')}
            taxCredits={getAllIncentivesByType('TaxCredit')}
          />
        )
      case 1:
        return (
          <CopyReview />
        )
    }
  }

  function savePlan() {
    const newPlan = { ...plan };

    newPlan.planDetails = {
      ...newPlan.planDetails,
      selectedIncentives: selectedIncentives,
    };

    newPlan.planDetails = JSON.stringify(newPlan.planDetails);

    console.log(newPlan)
    ModelStore.patchPlan(projectId, newPlan);
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
}

export default IncentivesModal
