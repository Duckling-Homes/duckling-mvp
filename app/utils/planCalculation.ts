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

export function calculateIncentiveAmount(
  incentive: Incentive,
  totalEligibleCost: number,
  alreadyUsedAmount: number
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

  // Adjust the calculation based on the amount already used
  const effectiveMaxLimit =
    parseFloat(incentive.maxLimit || 'Infinity') - alreadyUsedAmount
  incentive.calculatedAmount = Math.min(calculatedAmount, effectiveMaxLimit)
  if (incentive.calculatedAmount < calculatedAmount) {
    if (incentive.calculatedAmount == 0) {
      // we got completely nuked by another incentive
      incentive.preliminaryWarningText = 'Incentive Aggregation limit reached'
    } else if (alreadyUsedAmount) {
      // we got SOME amount but less than we thought we should
      incentive.preliminaryWarningText =
        'Incentive Amount Reduced By Aggregation Limit'
    }
  }
}

export function calculatePreliminaryCatalogItems(plan: Plan): CatalogueItem[] {
  const incentiveUsageMap = new Map<string, number>()

  return (plan.catalogueItems || []).map((item) => {
    item = calculatePriceOfItem(item)

    item.incentives?.forEach((incentive) => {
      if (incentive.selected) {
        const alreadyUsedAmount = incentiveUsageMap.get(incentive.id!) || 0
        calculateIncentiveAmount(
          incentive,
          item.calculatedPrice || 0,
          alreadyUsedAmount
        )

        // Update the total used amount for the incentive
        incentiveUsageMap.set(
          incentive.id!,
          alreadyUsedAmount + (incentive.calculatedAmount || 0)
        )
      }
    })

    return item
  })
}

export interface ProcessableAggregationLimit {
  id: string
  limitName: string
  limitDescription?: string
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

  constructor(aggregationLimit: ProcessableAggregationLimit) {
    this.id = aggregationLimit.id
    this.limitName = aggregationLimit.limitName
    this.limitDescription = aggregationLimit.limitDescription || ''
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

  updateIncentiveFinalCalculations(
    incentive: Incentive,
    newFinalCalcs: {
      usedAmount: number
      warningText?: string
    }
  ): void {
    // Combine the preliminaryWarningText with newFinalCalcs.warningText if they exist
    let newWarningText = `${
      incentive.preliminaryWarningText
        ? incentive.preliminaryWarningText + '.'
        : ''
    }${newFinalCalcs.warningText || ''}`
    newWarningText = newWarningText.trim()
    newFinalCalcs.warningText = newWarningText || undefined
    if (!incentive.finalCalculations) {
      incentive.finalCalculations = newFinalCalcs
    } else if (
      newFinalCalcs?.usedAmount <=
      (incentive?.finalCalculations?.usedAmount || 0)
    ) {
      incentive.finalCalculations = newFinalCalcs
    }
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
            const newCalculations = {
              usedAmount: calculatedAmount,
              warningText: undefined,
            }
            this.updateIncentiveFinalCalculations(incentive, newCalculations)
            usedLimit += incentive?.finalCalculations?.usedAmount || 0
          } else {
            // If the calculated amount exceeds the available limit
            const newCalculations = {
              usedAmount: availableLimit,
              warningText:
                availableLimit > 0
                  ? 'Partially used'
                  : 'Incentive Aggregation limit reached',
            }
            this.updateIncentiveFinalCalculations(incentive, newCalculations)
            usedLimit += incentive?.finalCalculations?.usedAmount || 0
          }
        } else if (
          usedLimit >= this.limitAmount &&
          this.isImpacted(incentive.id) &&
          incentive.selected
        ) {
          // For incentives after the limit has been reached
          const newCalculations = {
            usedAmount: 0,
            warningText: 'Incentive Aggregation limit reached',
          }
          this.updateIncentiveFinalCalculations(incentive, newCalculations)
        } else if (incentive.selected) {
          const newCalculations = {
            usedAmount: incentive.calculatedAmount || 0,
          }
          this.updateIncentiveFinalCalculations(incentive, newCalculations)
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
  const processedCatalogItems = calculatePreliminaryCatalogItems(plan)

  // Apply each aggregation limit to the processed catalog items
  aggregationLimits.forEach((limit) =>
    limit.processCatalogueItems(processedCatalogItems)
  )
}
