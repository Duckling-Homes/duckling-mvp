import { CatalogueItem, Incentive, Plan } from '@/types/types'

export function calculatePriceOfItem(item: CatalogueItem): CatalogueItem {
  const quantity =
    typeof item.quantity === 'string'
      ? parseInt(item.quantity, 10)
      : item.quantity || 0
  const basePrice = item.basePricePer || 0
  item.calculatedPrice = quantity * basePrice
  return item
}

export interface IncentiveCalculationResult {
  incentiveId: string
  calculatedAmount: number
}

export function calculateIncentiveAmount(
  incentive: Incentive,
  totalEligibleCost: number
): void {
  let calculatedAmount = 0

  if (incentive.calculationType === 'FlatRate') {
    calculatedAmount = Math.min(
      totalEligibleCost,
      incentive.calculationRateValue || 0
    )
  } else if (incentive.calculationType === 'Percentage') {
    calculatedAmount = (incentive.calculationRateValue || 0) * totalEligibleCost
  }

  // Check against max limit
  const maxLimit = parseFloat(incentive.maxLimit || 'Infinity')
  incentive.calculatedAmount = Math.min(calculatedAmount, maxLimit)
}

export function processCatalogItems(plan: Plan): CatalogueItem[] {
  return (plan.catalogueItems || []).map((item) => {
    item = calculatePriceOfItem(item)
    item.incentives?.forEach((incentive) => {
      if (incentive.selected) {
        calculateIncentiveAmount(incentive, item.calculatedPrice || 0)
      }
    })
    return item
  })
}

export interface AggregationLimit {
  id: string
  limitName: string
  limitDescription: string
  limitWarning: string
  impactedIncentiveIds: string[]
  limitAmount: number
}

export class AggregationLimitClass {
  id: string
  limitName: string
  limitDescription: string
  limitWarning: string
  impactedIncentiveIds: string[]
  limitAmount: number

  constructor(aggregationLimit: AggregationLimit) {
    this.id = aggregationLimit.id
    this.limitName = aggregationLimit.limitName
    this.limitDescription = aggregationLimit.limitDescription
    this.limitWarning = aggregationLimit.limitWarning
    this.impactedIncentiveIds = aggregationLimit.impactedIncentiveIds
    this.limitAmount = aggregationLimit.limitAmount
  }

  // Method to check if an incentive is impacted by this limit
  isImpacted(incentiveId?: string): boolean {
    if (!incentiveId) {
      return false
    }
    return this.impactedIncentiveIds.includes(incentiveId)
  }

  processCatalogueItems(catalogueItems: CatalogueItem[]): void {
    let usedLimit = 0

    for (const item of catalogueItems) {
      for (const incentive of item.incentives || []) {
        if (this.isImpacted(incentive.id) && incentive.selected) {
          const availableLimit = this.limitAmount - usedLimit
          const calculatedAmount = incentive.calculatedAmount || 0

          if (calculatedAmount <= availableLimit) {
            // If the calculated amount is within the available limit
            incentive.finalCalculations = {
              usedAmount: calculatedAmount,
              warningText: undefined,
            }
            usedLimit += calculatedAmount
          } else {
            // If the calculated amount exceeds the available limit
            incentive.finalCalculations = {
              usedAmount: availableLimit,
              warningText:
                availableLimit > 0
                  ? 'Partially used'
                  : 'Incentive Aggregation limit reached',
            }
            usedLimit = this.limitAmount // Set to max limit
          }
        } else if (
          usedLimit >= this.limitAmount &&
          this.isImpacted(incentive.id) &&
          incentive.selected
        ) {
          // For incentives after the limit has been reached
          incentive.finalCalculations = {
            usedAmount: 0,
            warningText: 'Incentive Aggregation limit reached',
          }
        }
      }
    }
  }
}

export function processPlanWithAggregationLimits(
  plan: Plan,
  aggregationLimits: AggregationLimitClass[]
): void {
  // First, process all catalog items in the plan
  const processedCatalogItems = processCatalogItems(plan)

  // Apply each aggregation limit to the processed catalog items
  aggregationLimits.forEach((limit) =>
    limit.processCatalogueItems(processedCatalogItems)
  )
}
