'use client'

import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import HomeSummary from './Tabs/HomeSummary'
import PlansPresentation from './Tabs/PlansPresentation'
import ModelStore from '@/app/stores/modelStore'
import { Project } from '@/types/types'
import { observer } from 'mobx-react-lite'

const Presentation = observer(() => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setCurrentTabIndex(newValue)
  }

  // TODO: going to need to get this from presenetation not project
  const project = ModelStore.currentProject as Project

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
      {renderTabContent(1, <PlansPresentation project={project} />)}
    </div>
  )
})

export default Presentation
