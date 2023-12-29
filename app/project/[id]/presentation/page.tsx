'use client'

import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import HomeSummary from './Tabs/HomeSummary'
import PlansPresentation from './Tabs/PlansPresentation'
import ModelStore from '@/app/stores/modelStore'
import { PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'

const Presentation = observer(() => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)
  const [photos, setPhotos] = useState<PhotoDetails[]>([])

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setCurrentTabIndex(newValue)
  }

  // TODO: going to need to get this from presenetation not project
  const project = ModelStore.currentProject as Project

  useEffect(() => {
    if (project.images && project.images.length > 0) {
      const downloadPromises = project.images.map((image: PhotoDetails) => {
        return ModelStore.downloadPhoto(image.id!).then((response) => {
          return { ...image, photoUrl: response }
        })
      })

      Promise.all(downloadPromises)
        .then((photos) => {
          setPhotos(photos)
        })
        .catch((error) => {
          console.error('Failed to download photos:', error)
        })
    }
  }, [project.images?.length])

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div hidden={currentTabIndex !== index}>{component}</div>
  )

  return (
    <div>
      <Tabs
        sx={{ background: '#FAFAFA' }}
        variant="fullWidth"
        value={currentTabIndex}
        onChange={handleChangeTab}
      >
        <Tab label="Home Summary" />
        <Tab label="Plans" />
      </Tabs>
      {renderTabContent(0, <HomeSummary project={project} />)}
      {renderTabContent(
        1,
        <PlansPresentation project={project} photos={photos} />
      )}
    </div>
  )
})

export default Presentation
