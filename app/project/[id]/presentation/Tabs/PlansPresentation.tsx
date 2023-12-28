'use client'

import { Plan, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'

import '../style.scss'
import ModelStore from '@/app/stores/modelStore'
import { LargeFinancingCalculator } from '@/components/Financing/LargeCalculator'
import { useEffect, useState } from 'react'
import { Button, Chip, Divider, IconButton } from '@mui/material'
import PlanPresentation from '../Components/PlanPresentation'

const PlansPresentation: React.FC<{
  project: Project
}> = observer(({ project }) => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>()

  useEffect(() => {
    if (project && project?.plans) {
      setPlans(project.plans)
      if (!currentPlan?.id) {
        setCurrentPlan(project.plans[0])
      }
    }
  })
  const financingOptions = ModelStore.financingOptions

  return (
    <>
      <div className="planSelection">
        <div className="planSelection__buttons">
          {plans?.length > 0 && (
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
            </div>
          )}
          {/* <LargeFinancingCalculator
        totalAmount={260000}
        financingOptions={financingOptions}
      /> */}
        </div>
      </div>
      {currentPlan && <PlanPresentation plan={currentPlan} />}
    </>
  )
})

export default PlansPresentation
