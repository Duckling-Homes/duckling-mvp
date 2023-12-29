'use client'
import { observer } from 'mobx-react-lite'
import '../style.scss'
import { Chip, FormLabel } from '@mui/material'
import { CatalogueItem } from '@/types/types'
import { Bolt, Construction, DeviceThermostat, Home } from '@mui/icons-material'

const CatalogItemView: React.FC<{
  category: string
  catalogItems: CatalogueItem[]
}> = observer(({ category, catalogItems }) => {
  function renderIcon() {
    switch (category) {
      case 'Home Performance':
        return <Home color="primary" />
      case 'HVAC':
        return <DeviceThermostat color="primary" />
      case 'Appliance Upgrades':
        return <Construction color="primary" />
      case 'Energy and Storage':
        return <Bolt color="primary" />
    }
  }

  return (
    <div className="catalogItem">
      <div className="catalogItem__headerLeft">
        {renderIcon()}
        <p>{category}</p>
      </div>
    </div>
  )
})

export default CatalogItemView
