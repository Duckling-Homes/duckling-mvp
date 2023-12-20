import { aggregationLimits } from '@/app/utils/hardcodedAggregationLimits'
import {
  AggregationLimitClass,
  calculateIncentiveAmount,
  calculatePriceOfItem,
  processCatalogItems,
  processPlanWithAggregationLimits,
} from '@/app/utils/planCalculation'
import { CatalogueItem, Incentive, Plan } from '@/types/types'

describe('calculatePriceOfItem', () => {
  it('calculates the price of an item correctly', () => {
    const item: CatalogueItem = {
      quantity: 2,
      basePricePer: 100,
    }

    const result = calculatePriceOfItem(item)
    expect(result.calculatedPrice).toBe(200)
  })

  it('handles string quantities correctly', () => {
    const item: CatalogueItem = {
      quantity: '3',
      basePricePer: 50,
    }

    const result = calculatePriceOfItem(item)
    expect(result.calculatedPrice).toBe(150)
  })
})

describe('calculateIncentiveAmount', () => {
  it('calculates flat rate incentive correctly', () => {
    const incentive: Incentive = {
      calculationType: 'FlatRate',
      calculationRateValue: 500,
      maxLimit: '1000',
    }

    calculateIncentiveAmount(incentive, 600)
    expect(incentive.calculatedAmount).toBe(500)
  })

  it('calculates percentage incentive correctly', () => {
    const incentive: Incentive = {
      calculationType: 'Percentage',
      calculationRateValue: 0.1, // 10%
      maxLimit: '100',
    }

    calculateIncentiveAmount(incentive, 500)
    expect(incentive.calculatedAmount).toBe(50)
  })
})

describe('processCatalogItems', () => {
  it('processes catalog items and their incentives correctly', () => {
    const plan: Plan = {
      catalogueItems: [
        {
          quantity: 1,
          basePricePer: 300,
          incentives: [
            {
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 200,
              maxLimit: '500',
            },
          ],
        },
      ],
    }

    const result = processCatalogItems(plan)
    expect(result[0].calculatedPrice).toBe(300)
    expect(result[0].incentives?.[0].calculatedAmount).toBe(200)
  })
})

describe('AggregationLimitClass', () => {
  const mockAggregationLimit = {
    id: 'uuid-al-101',
    limitName: 'Test Limit',
    limitDescription: 'Test Description',
    limitWarning: 'Test Warning',
    impactedIncentiveIds: ['uuid-101', 'uuid-105'],
    limitAmount: 2000,
  }
  const aggregationLimit = new AggregationLimitClass(mockAggregationLimit)

  describe('isImpacted', () => {
    it('returns true for impacted incentive IDs', () => {
      expect(aggregationLimit.isImpacted('uuid-101')).toBe(true)
      expect(aggregationLimit.isImpacted('uuid-105')).toBe(true)
    })

    it('returns false for non-impacted incentive IDs', () => {
      expect(aggregationLimit.isImpacted('uuid-999')).toBe(false)
    })
  })

  describe('processCatalogueItems', () => {
    const mockCatalogueItems: CatalogueItem[] = [
      {
        incentives: [
          {
            id: 'uuid-101',
            selected: true,
            calculatedAmount: 1500,
            calculationType: 'FlatRate',
            calculationRateValue: 1500,
            maxLimit: '2000',
          },
          {
            id: 'uuid-999',
            selected: true,
            calculatedAmount: 1000,
            calculationType: 'FlatRate',
            calculationRateValue: 1000,
            maxLimit: '1000',
          },
        ],
      },
      {
        incentives: [
          {
            id: 'uuid-105',
            selected: true,
            calculatedAmount: 1000,
            calculationType: 'FlatRate',
            calculationRateValue: 1000,
            maxLimit: '2000',
          },
        ],
      },
    ]

    it('correctly processes and applies aggregation limits', () => {
      aggregationLimit.processCatalogueItems(mockCatalogueItems)

      // First incentive should be fully used
      expect(
        mockCatalogueItems[0].incentives![0].finalCalculations?.usedAmount
      ).toBe(1500)
      expect(
        mockCatalogueItems[0].incentives![0].finalCalculations?.warningText
      ).toBeUndefined()

      // Second incentive (non-impacted) should not be modified
      expect(
        mockCatalogueItems[0].incentives![1].finalCalculations
      ).toBeUndefined()

      // Third incentive should be partially used due to aggregation limit
      expect(
        mockCatalogueItems[1].incentives![0].finalCalculations?.usedAmount
      ).toBe(500)
      expect(
        mockCatalogueItems[1].incentives![0].finalCalculations?.warningText
      ).toBe('Partially used')
    })
  })
})

describe('processCatalogueItems', () => {
  const mockCatalogueItems: CatalogueItem[] = [
    {
      incentives: [
        {
          id: 'uuid-101',
          selected: true,
          calculatedAmount: 2000, // Set to match the limit exactly
          calculationType: 'FlatRate',
          calculationRateValue: 2000,
          maxLimit: '2000',
        },
        {
          id: 'uuid-999',
          selected: true,
          calculatedAmount: 1000,
          calculationType: 'FlatRate',
          calculationRateValue: 1000,
          maxLimit: '1000',
        },
      ],
    },
    {
      incentives: [
        {
          id: 'uuid-105',
          selected: true,
          calculatedAmount: 1000,
          calculationType: 'FlatRate',
          calculationRateValue: 1000,
          maxLimit: '2000',
        },
      ],
    },
  ]

  it('correctly processes and applies aggregation limits', () => {
    aggregationLimits[0].processCatalogueItems(mockCatalogueItems)

    // First incentive should be fully used, reaching its limit
    expect(
      mockCatalogueItems[0].incentives![0].finalCalculations?.usedAmount
    ).toBe(2000)
    expect(
      mockCatalogueItems[0].incentives![0].finalCalculations?.warningText
    ).toBeUndefined()

    // Second incentive (non-impacted) should not be modified
    expect(
      mockCatalogueItems[0].incentives![1].finalCalculations?.usedAmount
    ).toBeUndefined()
    // Second incentive (non-impacted) should not be modified
    expect(
      mockCatalogueItems[0].incentives![1].finalCalculations?.warningText
    ).toBeUndefined()

    // Third incentive should be partially used due to aggregation limit
    // Assuming the limit is shared with the first incentive and it's already fully used
    expect(
      mockCatalogueItems[1].incentives![0].finalCalculations?.usedAmount
    ).toBe(0)
    expect(
      mockCatalogueItems[1].incentives![0].finalCalculations?.warningText
    ).toBe('Incentive Aggregation limit reached')
  })
})

describe('processPlanWithAggregationLimits', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'item-1',
          quantity: '10',
          basePricePer: 500,
          calculatedPrice: 1500,
          incentives: [
            {
              id: 'uuid-101', // Impacted by first limit
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 500,
              maxLimit: '1000',
              calculatedAmount: 0,
            },
            {
              id: 'uuid-120', // Impacted by third limit
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.1,
              maxLimit: '5000',
              calculatedAmount: 0,
            },
          ],
        },
        {
          id: 'item-2',
          quantity: 2,
          basePricePer: 800,
          calculatedPrice: 1600,
          incentives: [
            {
              id: 'uuid-105', // Impacted by first limit
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 300,
              maxLimit: '600',
              calculatedAmount: 0,
            },
            {
              id: 'uuid-127', // Not impacted
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.2,
              maxLimit: '2000',
              calculatedAmount: 0,
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits
    // @ts-ignore
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations.usedAmount
    ).toBe(500)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.usedAmount
    ).toBe(500)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(300)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(320)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
  })
})
