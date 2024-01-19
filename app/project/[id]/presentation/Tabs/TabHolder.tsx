'use client'

import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import HomeSummary from './HomeSummary'
import PlansPresentation from './PlansPresentation'

const TabHolder: React.FC<{
  project: Project
  photos: PhotoDetails[]
}> = observer(({ project, photos }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setCurrentTabIndex(newValue)
  }
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
        ((project.plans && project.plans?.length > 0) ? <PlansPresentation project={project} photos={photos} /> : <div style={{ backgroundColor: "#fff", padding: "16px", display: "flex", justifyContent: "center", alignContent: "center", margin: "16px", borderRadius: "8px"}}>{`This project doesn't have any plans to present yet`}</div>)
      )}
    </div>
  )
})

export default TabHolder
