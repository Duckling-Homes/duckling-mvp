'use client'

import { PhotoDetails, Plan, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import PlanPresentation from '../Components/PlanPresentation'

import '../style.scss'
import { toJS } from 'mobx'

const PlansPresentation: React.FC<{
  project: Project
  photos: PhotoDetails[]
}> = observer(({ project, photos }) => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan>()
  const [planPhotos, setPlanPhotos] = useState<PhotoDetails[]>([])

  const parsePlanDetails = (plan: Plan) => {
    console.log(toJS(plan))

    let catalogueItems = []

    if (plan?.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan?.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails)?.catalogueItems
    }

    if (catalogueItems && !catalogueItems?.imageIds) {
      catalogueItems.imageIds = [] as string[]
    }
    return catalogueItems
  }

  useEffect(() => {
    if (project && project?.plans) {
      setPlans(project.plans)
      if (!currentPlan?.id) {
        setCurrentPlan(project.plans[0])
        const planDetails = parsePlanDetails(project.plans[0])
        const newPlanPhotos = photos.filter(
          (photo) => planDetails?.imageIds?.includes(photo.id ?? '')
        )

        setPlanPhotos(newPlanPhotos)
      }
    }
  }, [project])

  useEffect(() => {
    if (currentPlan) {
      const planDetails = parsePlanDetails(currentPlan)
      const newPlanPhotos = photos.filter(
        (photo) => planDetails?.imageIds?.includes(photo.id ?? '')
      )
      setPlanPhotos(newPlanPhotos)
    }
  }, [currentPlan, photos])

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
        </div>
      </div>
      {currentPlan && (
        <PlanPresentation plan={currentPlan} photos={planPhotos} />
      )}
    </>
  )
})

export default PlansPresentation
