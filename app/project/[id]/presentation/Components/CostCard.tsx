import { Divider } from '@mui/material'

import './style.scss'
import { CatalogueItem, Incentive, Plan } from '@/types/types'

interface CostCardProps {
  plan: Plan
  totalValue: string | number
  netCost: string | number
  finalCost: string | number
}

const CostCard: React.FC<CostCardProps> = ({
  plan,
  totalValue,
  netCost,
  finalCost,
}) => {
  function renderIncentivesList(type: string, plan: Plan) {
    let catalogueItems = []
    const incentivesToRender = [] as Incentive[]

    if (plan?.catalogueItems) {
      catalogueItems = plan?.catalogueItems
    } else if (plan?.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails)?.catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item.incentives) {
        item.incentives.forEach((incentive) => {
          if (incentive.selected && incentive.type == type) {
            incentivesToRender.push(incentive)
          }
        })
      }
    })

    return incentivesToRender.map((incentive, index) => (
      <>
        <div className="item" key={incentive.id}>
          <span>{incentive.name}</span>
          <span>{`-$${
            incentive.finalCalculations?.usedAmount.toFixed(2) || 0
          }`}</span>
        </div>
        {index !== incentivesToRender.length - 1 && (
          <Divider variant="middle" />
        )}
      </>
    ))
  }

  function renderPlanItemsList(plan: Plan) {
    let catalogueItems = []

    if (plan?.catalogueItems) {
      catalogueItems = plan?.catalogueItems
    } else if (plan?.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails)?.catalogueItems
    }

    console.log(catalogueItems)

    return catalogueItems.map((item: CatalogueItem, index: number) => {
      const cost = item.calculatedPrice
        ? item.calculatedPrice
        : item.basePricePer && item.quantity
          ? item.basePricePer * item.quantity
          : 0

      return (
        <>
          <div className="item" key={item.customId}>
            <span>{item.name}</span>
            <span>{`$${cost.toFixed(2) || 0}`}</span>
          </div>
          {index !== catalogueItems.length - 1 && <Divider variant="middle" />}
        </>
      )
    })
  }

  return (
    <div className="costCard">
      <div className="bottomCard">
        <div className="secondCard">
          <div className="thirdCard">
            <div className="title">
              Total estimated cost
              <span>{totalValue}</span>
            </div>
            {renderPlanItemsList(plan)}
          </div>
          {renderIncentivesList('Rebate', plan).length > 0 && (
            <div className="content">
              <div className="title">Rebates</div>
              {renderIncentivesList('Rebate', plan)}
              <Divider />
              <div className="title">
                Estimated cost after rebates
                <span>{netCost}</span>
              </div>
            </div>
          )}
        </div>
        {renderIncentivesList('TaxCredit', plan).length > 0 && (
          <div className="content">
            <div className="title">Tax Credits</div>
            {renderIncentivesList('TaxCredit', plan)}
            <Divider />
            <div className="title">
              Estimated cost after tax credits
              <span>{finalCost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CostCard
