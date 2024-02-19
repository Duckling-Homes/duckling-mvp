'use client'
import { CatalogueItem, PhotoDetails, Plan } from '@/types/types'
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CatalogItemView from './CatalogItemView'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Markdown from 'react-markdown'
import CostCard from './CostCard'

import '../style.scss'

const PlanPresentation: React.FC<{
  plan: Plan
  photos: PhotoDetails[]
}> = observer(({ plan, photos }) => {
  const financingOptions = ModelStore.financingOptions
  const [displayedPhoto, setDisplayedPhoto] = useState<PhotoDetails>()
  const [photoIndex, setPhotoIndex] = useState<number>(0)
  useEffect(() => {
    setPhotoIndex(0)
    if (photos && photos.length > 0) {
      setDisplayedPhoto(photos[0])
    } else {
      setDisplayedPhoto(undefined)
    }
  }, [photos])

  const sortCatalogItems = () => {
    const catalogMapping: Record<string, CatalogueItem[]> = {}
    let catalogueItems = []

    if (plan.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails).catalogueItems
    }

    for (const item of catalogueItems) {
      if (!catalogMapping[item.category ?? '']) {
        catalogMapping[item.category ?? ''] = []
      }

      catalogMapping[item.category ?? ''].push(item)
    }

    return catalogMapping
  }

  const incrementPhoto = () => {
    const newIndex = photoIndex + 1
    setPhotoIndex(newIndex)
    setDisplayedPhoto(photos[newIndex])
  }

  const decrementPhoto = () => {
    const newIndex = photoIndex - 1
    setPhotoIndex(newIndex)
    setDisplayedPhoto(photos[newIndex])
  }

  function calculateEstimatedCost(plan: Plan) {
    let catalogueItems = []
    let estimatedCost = 0

    if (plan.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails).catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item?.quantity && item?.basePricePer) {
        estimatedCost += ((item?.quantity as number) || 0) * item.basePricePer
        if (item?.additionalCosts) {
          item?.additionalCosts.forEach((cost) => {
            estimatedCost += Number(cost.price)
          })
        }
      }
    })

    return estimatedCost
  }

  function calculateRebates(plan: Plan) {
    let totalRebates = 0
    let catalogueItems = []

    if (plan.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails).catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item.incentives) {
        item.incentives.forEach((incentive) => {
          if (incentive.selected && incentive.type == 'Rebate') {
            totalRebates += incentive.finalCalculations?.usedAmount || 0
          }
        })
      }
    })

    return totalRebates
  }

  function calculateNetCost(plan: Plan) {
    const estimatedCost = calculateEstimatedCost(plan)
    const totalRebates = calculateRebates(plan)

    return estimatedCost - totalRebates
  }

  function calculateFinalCost(plan: Plan) {
    const netCost = calculateNetCost(plan)
    let totalTaxCredits = 0
    let catalogueItems = []

    if (plan.catalogueItems) {
      catalogueItems = plan.catalogueItems
    } else if (plan.planDetails) {
      catalogueItems = JSON.parse(plan.planDetails).catalogueItems
    }

    catalogueItems?.forEach((item: CatalogueItem) => {
      if (item.incentives) {
        item.incentives.forEach((incentive) => {
          if (incentive.selected && incentive.type == 'TaxCredit') {
            totalTaxCredits += incentive.finalCalculations?.usedAmount || 0
          }
        })
      }
    })

    return netCost - totalTaxCredits
  }

  function formatCurrency(amount) {
    amount = parseFloat(amount)

    amount = Math.round((amount + Number.EPSILON) * 100) / 100

    return (
      '$' +
      amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )
  }

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
            <Markdown>{plan.copy?.comfort}</Markdown>
          </div>
        </div>
        <div className="benefit">
          <div className="benefit__headerLeft">
            <FavoriteBorderIcon color="primary" />
            <p>Health & Safety</p>
          </div>
          <div className="benefit__text">
            <Markdown>{plan.copy?.health}</Markdown>
          </div>
        </div>
        <div className="benefit">
          <div className="benefit__headerLeft">
            <Home color="primary" />
            <p>Other Benefits</p>
          </div>
          <div className="benefit__text">
            <Markdown>{plan.copy?.recommended}</Markdown>
          </div>
        </div>
      </div>

      {/* Plan Scope */}
      <div className="scope">
        <div className="scope__header">
          <WbSunnyOutlinedIcon />
          <p>Scope</p>
        </div>
        {/* Plan Photos */}
        {photos.length > 0 && (
          <div className="scope__photoHeader">
            {displayedPhoto && (
              <div style={{ flexDirection: 'row' }}>
                <Button
                  disabled={photoIndex == 0}
                  style={{ marginRight: '16px' }}
                  variant="outlined"
                  size="small"
                  onClick={decrementPhoto}
                >
                  <ArrowBackIosIcon />
                </Button>
                <Button
                  disabled={photoIndex == photos.length - 1}
                  style={{ marginRight: '16px' }}
                  variant="outlined"
                  size="small"
                  onClick={incrementPhoto}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </div>
            )}
            <div className="scope__photoDisplay">
              {displayedPhoto && (
                <>
                  <img
                    src={displayedPhoto.photoUrl}
                    alt={`Image ${displayedPhoto.id}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                      margin: '16px',
                    }}
                  />
                  <div style={{ flexDirection: 'row' }}>
                    <span style={{ fontWeight: 'bold' }}>
                      {displayedPhoto.name ? `${displayedPhoto.name}. ` : ''}
                    </span>
                    {displayedPhoto.homeownerNotes
                      ? displayedPhoto.homeownerNotes
                      : ''}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* Catalog Items */}
        {Object.entries(sortCatalogItems()).map(([category, items]) => (
          <CatalogItemView
            key={category}
            category={category}
            catalogItems={items}
          />
        ))}
      </div>

      <div className="financing">
        <div className="financing__header">
          <AttachMoneyIcon />
          <p>Financing</p>
        </div>
        <div className="financing__content">
          <CostCard
            plan={plan}
            totalValue={formatCurrency(calculateEstimatedCost(plan))}
            netCost={formatCurrency(calculateNetCost(plan))}
            finalCost={formatCurrency(calculateFinalCost(plan))}
          />
          <div className="financing__card">
            <LargeFinancingCalculator
              totalAmount={calculateFinalCost(plan)}
              financingOptions={financingOptions}
            />
          </div>
        </div>
      </div>
    </>
  )
})

export default PlanPresentation
