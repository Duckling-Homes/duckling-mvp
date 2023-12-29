'use client'
import { CatalogueItem, Plan } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { Home } from '@mui/icons-material'
import { LargeFinancingCalculator } from '@/components/Financing/LargeCalculator'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import NorthIcon from '@mui/icons-material/North'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import ModelStore from '@/app/stores/modelStore'

import '../style.scss'
import CatalogItemView from './CatalogItemView'

const PlanPresentation: React.FC<{
  plan: Plan
}> = observer(({ plan }) => {
  const financingOptions = ModelStore.financingOptions
  console.log('kiley', plan.catalogueItems)
  console.log('kiley', plan.planDetails)

  const catalogItems = [
    { category: 'Home Performance', subcategory: 'MINE' },
    { category: 'HVAC', subcategory: 'MINE' },
    { category: 'Appliance Upgrades', subcategory: 'MINE' },
    { category: 'Energy and Storage', subcategory: 'MINE' },
  ]

  const sortCatalogItems = () => {
    let catalogMapping: Record<string, CatalogueItem[]> = {}

    for (const item of catalogItems) {
      if (!catalogMapping[item.category]) {
        catalogMapping[item.category] = []
      }

      catalogMapping[item.category].push(item)
    }

    return catalogMapping
  }
  // Going to need to build the categoryItems into a dict
  return (
    <>
      {/* Plan Summary */}
      <div className="summary">
        <div className="summary__header">
          <AssignmentOutlinedIcon />
          <p>Summary</p>
        </div>
        <div className="summary__text">
          <p>{plan.copy?.summary}</p>
        </div>
      </div>

      {/* Plan Scope */}
      <div className="scope">
        <div className="scope__header">
          <WbSunnyOutlinedIcon />
          <p>Scope</p>
        </div>
        {Object.entries(sortCatalogItems()).map(([category, items]) => (
          <CatalogItemView
            key={category}
            category={category}
            catalogItems={items}
          />
        ))}
      </div>

      {/* Home Benefits Copy */}
      <div className="benefitsOverview">
        <div className="benefitsOverview__header">
          <NorthIcon />
          <p>Benefits to Your Home</p>
        </div>
        <div className="benefit">
          <div className="benefit__headerLeft">
            <AcUnitIcon color="primary" />
            <p>Comfort</p>
          </div>
          <div className="benefit__text">
            <p>{plan.copy?.comfort}</p>
          </div>
        </div>
        <div className="benefit">
          <div className="benefit__headerLeft">
            <FavoriteBorderIcon color="primary" />
            <p>Health & Safety</p>
          </div>
          <div className="benefit__text">
            <p>{plan.copy?.health}</p>
          </div>
        </div>
        <div className="benefit">
          <div className="benefit__headerLeft">
            <Home color="primary" />
            <p>Other Benefits</p>
          </div>
          <div className="benefit__text">
            <p>{plan.copy?.recommended}</p>
          </div>
        </div>
      </div>

      <div className="financing">
        <div className="financing__header">
          <AttachMoneyIcon />
          <p>Financing</p>
        </div>
        <LargeFinancingCalculator
          totalAmount={260000}
          financingOptions={financingOptions}
        />
      </div>
    </>
  )
})

export default PlanPresentation
