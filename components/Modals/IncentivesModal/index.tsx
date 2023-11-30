import { useState } from 'react'
import { Close } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material'

import './styles.scss'

const STEPS = ['Select Incentives', 'Review Copy'];

const Incentives = () => {
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
        <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
        <Divider />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
        <Divider />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
        <Divider />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
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
        <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
        <Divider />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
        <Divider />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
        <Divider />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Checkbox />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: 1
          }}>
            <span>Inflation Reduction Act Heat Pump</span>
            <small>Lorem ipsum dolor sit amet consectetur. Mi diam nibh vulputate lobortis aenean ut. </small>  
          </div>
          <span>
            $6,000.00
          </span>
        </div>
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
}> = ({ open, onConfirm, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  function handleNext() {
    if (activeStep === STEPS.length - 1) {
      console.log('save plan')
      setActiveStep(0)
      onClose()
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function renderStep() {
    switch(activeStep) {
      case 0:
        return (
          <Incentives />
        )
      case 1:
        return (
          <CopyReview />
        )
    }
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
            {STEPS.map((label, index) => {
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
