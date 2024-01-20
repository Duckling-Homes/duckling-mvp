'use client'
import { observer } from 'mobx-react-lite'
import '../style.scss'
import { Divider, FormLabel } from '@mui/material'
import { CatalogueItem } from '@/types/types'
import { Bolt, Construction, DeviceThermostat, Home } from '@mui/icons-material'
import Markdown from 'react-markdown'

const CatalogItemView: React.FC<{
  category: string
  catalogItems: CatalogueItem[]
}> = observer(({ category, catalogItems }) => {
  function renderIcon() {
    switch (category) {
      case 'Home Performance':
      case 'HomePerformance':
        return <Home color="primary" />
      case 'HVAC':
        return <DeviceThermostat color="primary" />
      case 'Appliance Upgrades':
      case 'Appliances':
        return <Construction color="primary" />
      case 'Energy and Storage':
      case 'Electrical':
        return <Bolt color="primary" />
    }
  }

  return (
    <div className="catalogItem">
      <div className="catalogItem__headerLeft">
        {renderIcon()}
        <p>{category}</p>
      </div>
      {(catalogItems || []).map((item) => (
        <>
          <Divider />
          <FormLabel>{item.subcategory}</FormLabel>
          <p
            style={{
              fontSize: '18px',
              fontWeight: '500',
            }}
          >
            {item.name}
          </p>
          <Markdown>{item.description}</Markdown>
        </>
      ))}
    </div>
  )
})

export default CatalogItemView
