'use client'

import ModelStore from '@/app/stores/modelStore'
import PhotoPickerModal from '@/components/Modals/PhotoPicker'
import { PhotoDetails, Plan, PlanDetails, Project } from '@/types/types'
import { CameraAlt } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import PhotoDisplay from '@/components/PhotoDisplay'

interface PlanPhotoProps {
  plan: Plan
  project: Project
}

const Photos: React.FC<PlanPhotoProps> = observer(({ plan, project }) => {
  const parsePlanDetails = () => {
    const planDetails = {} as PlanDetails

    if (planDetails && !planDetails?.imageIds) {
      planDetails.imageIds = [] as string[]
    }
    return planDetails
  }

  const [openPhotoPicker, setOpenPhotoPicker] = useState<boolean>(false)
  const [planDetails, setPlanDetails] = useState<PlanDetails>(
    parsePlanDetails()
  )

  useEffect(() => {
    setPlanDetails(parsePlanDetails())
  }, [plan])

  const filterForDisplay = (photos: PhotoDetails[]) => {
    return photos.filter(
      (photo) => planDetails?.imageIds.includes(photo.id ?? '')
    )
  }

  const handleFinishSelect = async (selectedPhotos: Set<string>) => {
    if (plan.projectId) {
      const newPlanDetails = {
        ...planDetails,
        imageIds: Array.from(selectedPhotos),
      }
      const newPlan = { ...plan }
      newPlan.planDetails = JSON.stringify(newPlanDetails)
      setPlanDetails(newPlanDetails)
      await ModelStore.patchPlan(plan.projectId, newPlan)
    }
  }

  return (
    <div className="photos">
      <div className="photos_header">
        <div
          className="photos__text"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <CameraAlt />
            <p>Photos</p>
          </div>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setOpenPhotoPicker(true)
            }}
          >
            Select Photos
          </Button>
        </div>
      </div>
      <PhotoPickerModal
        open={openPhotoPicker}
        onClose={() => {
          setOpenPhotoPicker(false)
        }}
        filterPhotos={(photos) => {
          return photos
        }}
        handleFinishSelect={handleFinishSelect}
        initialSelection={new Set(planDetails?.imageIds)}
      />
      {planDetails?.imageIds.length > 0 && (
        <PhotoDisplay
          currentProject={project}
          filterPhotos={filterForDisplay}
          editable={false}
        ></PhotoDisplay>
      )}
    </div>
  )
})

export default Photos
