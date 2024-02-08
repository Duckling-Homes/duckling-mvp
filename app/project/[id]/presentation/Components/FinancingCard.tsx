import { Divider } from '@mui/material'

import './style.scss'
import { CatalogueItem, Incentive, Plan } from '@/types/types'

const FinancingCard = ({ plan, totalValue, netCost, finalCost }) => {
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
          <small>{incentive.name}</small>
          <small>{`-$${
            incentive.finalCalculations?.usedAmount.toFixed(2) || 0
          }`}</small>
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

    return catalogueItems.map((item: CatalogueItem, index) => {
      const cost = item.calculatedPrice
        ? item.calculatedPrice
        : item.basePricePer && item.quantity
          ? item.basePricePer * item.quantity
          : 0

      return (
        <>
          <div className="item" key={item.customId}>
            <small>{item.name}</small>
            <small>{`$${cost.toFixed(2) || 0}`}</small>
          </div>
          {index !== catalogueItems.length - 1 && <Divider variant="middle" />}
        </>
      )
    })
  }

  return (
    <div className="financingCard">
      <div className="bottomCard">
        <div className="secondCard">
          <div className="thirdCard">
            <div className="title">
              Upgrade Value
              <span>{totalValue}</span>
            </div>
            {renderPlanItemsList(plan)}
          </div>
          <div className="content">
            <div className="title">Rebates</div>
            {renderIncentivesList('Rebate', plan).length > 0 ? (
              renderIncentivesList('Rebate', plan)
            ) : (
              <div className="item">
                <small>No Rebates were selected for this plan</small>
              </div>
            )}
            <Divider />
            <div className="title">
              Cost after Rebates
              <span>{netCost}</span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="title">Tax Credits</div>
          {renderIncentivesList('TaxCredit', plan).length > 0 ? (
            renderIncentivesList('TaxCredit', plan)
          ) : (
            <div className="item">
              <small>No Tax Credits were selected for this plan</small>
            </div>
          )}
          <Divider />
          <div className="title">
            Final Value
            <span>{finalCost}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancingCard
