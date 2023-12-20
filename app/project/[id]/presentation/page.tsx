'use client'

import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import HomeSummary from './Tabs/HomeSummary'

const Presentation = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setCurrentTabIndex(newValue)
  }

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div
      style={{
        backgroundColor: '#FFF',
      }}
      hidden={currentTabIndex !== index}
    >
      {component}
    </div>
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
      {renderTabContent(0, <HomeSummary></HomeSummary>)}
      {renderTabContent(1, <div>plans</div>)}
    </div>
  )
}

export default Presentation
