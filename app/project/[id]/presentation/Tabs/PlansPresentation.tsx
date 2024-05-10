'use client'

import { PhotoDetails, Plan, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import PlanPresentation from '../Components/PlanPresentation'

import '../style.scss'
import { PrintHidden } from '@/components/Print/PrintHidden'
import { toJS } from 'mobx'
import { PrintOnly } from '@/components/Print/PrintOnly'

const PlansPresentation: React.FC<{
  project: Project
  photos: PhotoDetails[]
}> = observer(({ project, photos }) => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>()
  const [planPhotos, setPlanPhotos] = useState<PhotoDetails[]>([])

  const getPlanImages = (plan: Plan) => {
    if (plan.planDetails) {
      const parsedPlan = JSON.parse(plan.planDetails)
      return parsedPlan.imageIds ?? []
    }
    return []
  }

  useEffect(() => {
    if (project && project?.plans) {
      setPlans(project.plans)
      if (!currentPlan?.id) {
        setCurrentPlan(project.plans[0])
        const planImages = getPlanImages(project.plans[0])
        const newPlanPhotos = photos.filter((photo) =>
          planImages.includes(photo.id ?? '')
        )
        setPlanPhotos(newPlanPhotos)
      }
    }
  }, [project])

  useEffect(() => {
    if (currentPlan) {
      const planImages = getPlanImages(currentPlan)
      const newPlanPhotos = photos.filter((photo) =>
        planImages.includes(photo.id ?? '')
      )
      setPlanPhotos(newPlanPhotos)
    }

    console.log('CURRENT PLAN', toJS(currentPlan))
  }, [currentPlan, photos])

  return (
    <>
      <PrintHidden>
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
          </div>
        </div>
      </PrintHidden>
      {currentPlan && (
        <>
          <PrintOnly
            style={{
              textAlign: 'center',
              marginTop: '16px',
              marginBottom: '16px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              marginLeft: '16px',
              marginRight: '16px',
            }}
          >
            <h2>Plan: {currentPlan?.name}</h2>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>
              Approved on{' '}
              {new Date(currentPlan?.approvedAt ?? '').toLocaleDateString()} at{' '}
              {new Date(currentPlan?.approvedAt ?? '').toLocaleTimeString()}
            </p>
          </PrintOnly>
          <PlanPresentation plan={currentPlan} photos={planPhotos} />
        </>
      )}
    </>
  )
})

export default PlansPresentation
