'use client'
import { CatalogueItem, PhotoDetails, Plan } from '@/types/types'
import { observer } from 'mobx-react-lite'
import { CheckCircle, Home, Print } from '@mui/icons-material'
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
import { Button, Divider, Typography } from '@mui/material'
import Markdown from 'react-markdown'
import CostCard from './CostCard'

import '../style.scss'
import { ReviewPlanModal } from '@/components/Modals/ReviewPlanModal'
import { PrintHidden } from '@/components/Print/PrintHidden'
import { formatDateTime } from '@/app/utils/utils'
import { PrintOnly } from '@/components/Print/PrintOnly'
import { toJS } from 'mobx'

const PlanPresentation: React.FC<{
  plan: Plan
  photos: PhotoDetails[]
}> = observer(({ plan, photos }) => {
  const financingOptions = ModelStore.financingOptions
  const [displayedPhoto, setDisplayedPhoto] = useState<PhotoDetails>()
  const [photoIndex, setPhotoIndex] = useState<number>(0)
  const [reviewState, setReviewState] = useState<
    'notReviewed' | 'reviewing' | 'reviewed'
  >(plan.approvedAt ? 'reviewed' : 'notReviewed')

  useEffect(() => {
    if (plan.approvedAt) {
      setReviewState('reviewed')
    } else {
      setReviewState('notReviewed')
    }
  }, [plan])

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
            estimatedCost += Number(cost.totalPrice)
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

  function formatCurrency(amount: string | number) {
    let formatedAmount = parseFloat(amount as string)

    formatedAmount = Math.round((formatedAmount + Number.EPSILON) * 100) / 100

    return (
      '$' +
      formatedAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    )
  }

  function getSignatureImage() {
    if (!plan || !plan.signature) {
      return ''
    }

    return JSON.parse(plan.signature as string).signatureBase64
  }

  function getSigner() {
    if (!plan || !plan.signature) {
      return 'the customer'
    }
    return JSON.parse(plan?.signature as string).signer
  }

  return (
    <>
      {/* Plan Summary */}
      {plan.copy?.summary && (
        <div className="summary">
          <div className="summary__header">
            <AssignmentOutlinedIcon />
            <p>Summary</p>
          </div>
          <div className="summary__text">
            <p>{plan.copy?.summary}</p>
          </div>
        </div>
      )}

      {/* Home Benefits Copy */}
      {(plan.copy?.comfort || plan.copy?.health || plan.copy?.recommended) && (
        <div className="benefitsOverview">
          <div className="benefitsOverview__header">
            <NorthIcon />
            <p>Benefits to Your Home</p>
          </div>
          {plan.copy?.comfort && (
            <div className="benefit">
              <div className="benefit__headerLeft">
                <AcUnitIcon color="primary" />
                <p>Comfort</p>
              </div>
              <div className="benefit__text">
                <Markdown>{plan.copy?.comfort}</Markdown>
              </div>
            </div>
          )}
          {plan.copy?.health && (
            <div className="benefit">
              <div className="benefit__headerLeft">
                <FavoriteBorderIcon color="primary" />
                <p>Health & Safety</p>
              </div>
              <div className="benefit__text">
                <Markdown>{plan.copy?.health}</Markdown>
              </div>
            </div>
          )}
          {plan.copy?.recommended && (
            <div className="benefit">
              <div className="benefit__headerLeft">
                <Home color="primary" />
                <p>Additional Benefits</p>
              </div>
              <div className="benefit__text">
                <Markdown>{plan.copy?.recommended}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}

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
          {ModelStore.organization?.id !=
          'dde63049-e00b-4e81-8beb-69fe7526eaa6' ? (
            <div className="financing__wrapper">
              <div className="financing__card">
                <LargeFinancingCalculator
                  totalAmount={calculateFinalCost(plan)}
                  financingOptions={financingOptions}
                />
              </div>
            </div>
          ) : (
            <PrintHidden style={{ width: '100%' }}>
              <div className="financing__wrapper">
                <div className="financing__card">
                  <LargeFinancingCalculator
                    totalAmount={calculateFinalCost(plan)}
                    financingOptions={financingOptions}
                  />
                </div>
              </div>
            </PrintHidden>
          )}
        </div>
      </div>

      {ModelStore.organization?.id != 'dde63049-e00b-4e81-8beb-69fe7526eaa6' ? (
        <PrintHidden>
          <div className="acceptance">
            <div className="acceptance__header">
              {reviewState === 'notReviewed' && (
                <Button
                  color="primary"
                  onClick={() => setReviewState('reviewing')}
                >
                  Review and Accept Proposal
                </Button>
              )}
              {reviewState === 'reviewed' && (
                <>
                  <div className="signature">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        alignSelf: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      Your plan has been approved. <CheckCircle />
                    </div>
                    <div>
                      <img
                        src={`${getSignatureImage()}`}
                        alt="Signature"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                    <Divider
                      sx={{
                        marginTop: '4px',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                      }}
                    />
                    <div className="signature__details">
                      <Typography variant="body1">{getSigner()}</Typography>
                      <Typography variant="body1">
                        {formatDateTime(plan.approvedAt as string)}
                      </Typography>
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                  >
                    <Button
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                      onClick={() => window.print()}
                    >
                      Print <Print />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </PrintHidden>
      ) : (
        <PrintHidden>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Button
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => window.print()}
            >
              Print <Print />
            </Button>
          </div>
        </PrintHidden>
      )}

      {ModelStore.organization?.id !=
        'dde63049-e00b-4e81-8beb-69fe7526eaa6' && (
        <PrintOnly>
          <div className="signature">
            <div>
              <img
                src={`${getSignatureImage()}`}
                alt="Signature"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <Divider
              sx={{ marginTop: '4px', borderColor: 'rgba(0, 0, 0, 0.5)' }}
            />
            <div className="signature__details">
              <Typography variant="body1">{getSigner()}</Typography>
              <Typography variant="body1">
                {formatDateTime(plan.approvedAt as string)}
              </Typography>
            </div>
          </div>
        </PrintOnly>
      )}

      {reviewState === 'reviewing' && (
        <PrintHidden>
          <ReviewPlanModal
            open={reviewState === 'reviewing'}
            onCancel={() => setReviewState('notReviewed')}
            onAccept={(signature) => {
              ModelStore.approvePlan(plan.id!, signature)
              setReviewState('reviewed')
            }}
          />
        </PrintHidden>
      )}
    </>
  )
})

export default PlanPresentation
