import { aggregationLimits } from '@/app/utils/hardcodedAggregationLimits'
import {
  AggregationLimitClass,
  calculateIncentiveAmount,
  calculatePriceOfItem,
  calculatePreliminaryCatalogItems,
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

    calculateIncentiveAmount(incentive, 600, 0)
    expect(incentive.calculatedAmount).toBe(500)
  })

  it('calculates percentage incentive correctly', () => {
    const incentive: Incentive = {
      calculationType: 'Percentage',
      calculationRateValue: 0.1, // 10%
      maxLimit: '100',
    }

    calculateIncentiveAmount(incentive, 500, 0)
    expect(incentive.calculatedAmount).toBe(50)
    calculateIncentiveAmount(incentive, 500, 75)
    expect(incentive.calculatedAmount).toBe(25)
  })
})

describe('calculatePreliminaryCatalogItems', () => {
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

    const result = calculatePreliminaryCatalogItems(plan)
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

  describe('processCatalogueItems on agg limit class ', () => {
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
        mockCatalogueItems[0].incentives![1].finalCalculations?.usedAmount
      ).toEqual(1000)

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

describe('processCatalogueItems on agg limit class2', () => {
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
    ).toEqual(1000)
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

describe('processPlanWithAggregationLimits case 1', () => {
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

describe('processPlanWithAggregationLimits case 2', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-121',
          quantity: '1200',
          basePricePer: 2.1,
          calculatedPrice: 2520,
          incentives: [
            {
              id: 'uuid-133',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1000,
              maxLimit: '1000',
              calculatedAmount: 1000,
            },
            {
              id: 'uuid-107',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '1200',
              calculatedAmount: 756,
            },
          ],
        },
        {
          id: 'uuid-pc-111',
          quantity: 1,
          basePricePer: 24468.47,
          calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-137',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1500,
              maxLimit: '1500',
              calculatedAmount: 1500,
            },
            {
              id: 'uuid-101',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: 2000,
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
    ).toBe(1000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.usedAmount
    ).toBe(756)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(1500)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(2000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
  })
})

describe('processPlanWithAggregationLimits case 3', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-121',
          quantity: '1200',
          basePricePer: 2.1,
          //calculatedPrice: 2520,
          incentives: [
            {
              id: 'uuid-125',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 1,
              maxLimit: '1600',
              //calculatedAmount: 1600,
            },
            {
              id: 'uuid-107',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '1200',
              //calculatedAmount: 756,
            },
          ],
        },
        {
          id: 'uuid-pc-111',
          quantity: 1,
          basePricePer: 24468.47,
          //calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-119',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 1,
              maxLimit: '8000',
              // calculatedAmount: 8000,
            },
            {
              id: 'uuid-101',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              // calculatedAmount: 2000,
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
    ).toBe(1600)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.usedAmount
    ).toBe(756)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(8000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(2000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
  })
})

describe('processPlanWithAggregationLimits case 4', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-111',
          quantity: '1',
          basePricePer: 24468.47,
          calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-119',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 1,
              maxLimit: '8000',
              calculatedAmount: 8000,
            },
            {
              id: 'uuid-101',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: 2000,
            },
          ],
        },
        {
          id: 'uuid-pc-120',
          quantity: 1,
          basePricePer: 24692.21,
          calculatedPrice: 24692.21,
          incentives: [
            {
              id: 'uuid-119',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 1,
              maxLimit: '8000',
              calculatedAmount: 0,
            },
            {
              id: 'uuid-101',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
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

    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations.usedAmount
    ).toBe(8000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.usedAmount
    ).toBe(2000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(0)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBe('Incentive Aggregation limit reached.')
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(0)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBe('Incentive Aggregation limit reached.')
  })
})

describe('processPlanWithAggregationLimits case 5', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-106',
          quantity: '800',
          basePricePer: 3.18,
          calculatedPrice: 2544,
          incentives: [
            {
              id: 'uuid-132',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.5,
              maxLimit: '1600',
              calculatedAmount: 1272,
            },
            {
              id: 'uuid-133',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1000,
              maxLimit: '1000',
              calculatedAmount: 1000,
            },
          ],
        },
        {
          id: 'uuid-pc-121',
          quantity: 1200,
          basePricePer: 2.1,
          calculatedPrice: 2520,
          incentives: [
            {
              id: 'uuid-132',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.5,
              maxLimit: '1600',
              calculatedAmount: 328,
            },
            {
              id: 'uuid-133',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1000,
              maxLimit: '1000',
              calculatedAmount: 0,
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits

    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations.usedAmount
    ).toBe(1272)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.usedAmount
    ).toBe(1000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(328)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBe('Incentive Amount Reduced By Aggregation Limit.')
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(0)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBe('Incentive Aggregation limit reached.')
  })
})

describe('processPlanWithAggregationLimits case 6', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-111',
          quantity: '1',
          basePricePer: 24468.47,
          calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-101',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: 2000,
            },
            {
              id: 'uuid-119',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 1,
              maxLimit: '8000',
              calculatedAmount: 8000,
            },
          ],
        },
        {
          id: 'uuid-pc-129',
          quantity: 1,
          basePricePer: 5325.98,
          calculatedPrice: 5325.98,
          incentives: [
            {
              id: 'uuid-105',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: 0,
            },
            {
              id: 'uuid-122',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 1,
              maxLimit: '1750',
              calculatedAmount: 1750,
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations.usedAmount
    ).toBe(2000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.usedAmount
    ).toBe(8000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(0)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBe('Incentive Aggregation limit reached')
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(1750)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
  })
})

describe('processPlanWithAggregationLimits case 7', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-127',
          quantity: '8200',
          basePricePer: 2.86,
          calculatedPrice: 23452,
          incentives: [
            {
              id: 'uuid-111',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '',
              calculatedAmount: 7035.6,
            },
          ],
        },
        {
          id: 'uuid-pc-124',
          quantity: 1,
          basePricePer: 12424.99,
          calculatedPrice: 12424.99,
          incentives: [
            {
              id: 'uuid-112',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '',
              calculatedAmount: 3727.497,
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations.usedAmount
    ).toBeCloseTo(7035.6)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(3727.497)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
  })
})

describe('processPlanWithAggregationLimits case 9', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-101',
          quantity: '1',
          basePricePer: 16292.64,
          calculatedPrice: 16292.64,
          incentives: [],
        },
        {
          id: 'uuid-pc-111',
          quantity: 1,
          basePricePer: 24468.47,
          calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-137',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1500,
              maxLimit: '1500',
              calculatedAmount: 1500,
            },
            {
              id: 'uuid-101',
              selected: true,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: 2000,
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives![0].finalCalculations.usedAmount
    ).toBe(1500)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.usedAmount
    ).toBe(2000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations.warningText
    ).toBeUndefined()
  })
})

describe('processPlanWithAggregationLimits case 10', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-121',
          quantity: '1200',
          basePricePer: 2.1,
          calculatedPrice: 2520,
          incentives: [
            {
              id: 'uuid-133',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1000,
              maxLimit: '1000',
              calculatedAmount: 1000,
            },
            {
              id: 'uuid-107',
              selected: false,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '1200',
              calculatedAmount: undefined, // No amount as it's not selected
            },
          ],
        },
        {
          id: 'uuid-pc-111',
          quantity: 1,
          basePricePer: 24468.47,
          calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-137',
              selected: true,
              calculationType: 'FlatRate',
              calculationRateValue: 1500,
              maxLimit: '1500',
              calculatedAmount: 1500,
            },
            {
              id: 'uuid-101',
              selected: false,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: undefined, // No amount as it's not selected
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations.usedAmount
    ).toBe(1000)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    // @ts-ignore
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations?.usedAmount
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.usedAmount
    ).toBe(1500)
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations.warningText
    ).toBeUndefined()
    // @ts-ignore
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations?.usedAmount
    ).toBeUndefined()
  })
})

describe('processPlanWithAggregationLimits case 11', () => {
  it('should correctly process a plan with various catalogue items and incentives', () => {
    // Mock Plan with various CatalogueItems and Incentives
    const mockPlan: Plan = {
      catalogueItems: [
        {
          id: 'uuid-pc-121',
          quantity: '1200',
          basePricePer: 2.1,
          calculatedPrice: 2520,
          incentives: [
            {
              id: 'uuid-133',
              selected: false,
              calculationType: 'FlatRate',
              calculationRateValue: 1000,
              maxLimit: '1000',
              calculatedAmount: undefined,
            },
            {
              id: 'uuid-107',
              selected: false,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '1200',
              calculatedAmount: undefined,
            },
          ],
        },
        {
          id: 'uuid-pc-111',
          quantity: 1,
          basePricePer: 24468.47,
          calculatedPrice: 24468.47,
          incentives: [
            {
              id: 'uuid-137',
              selected: false,
              calculationType: 'FlatRate',
              calculationRateValue: 1500,
              maxLimit: '1500',
              calculatedAmount: undefined,
            },
            {
              id: 'uuid-101',
              selected: false,
              calculationType: 'Percentage',
              calculationRateValue: 0.3,
              maxLimit: '2000',
              calculatedAmount: undefined,
            },
          ],
        },
      ],
    }

    // Call the function to test
    processPlanWithAggregationLimits(mockPlan, aggregationLimits)

    // Assertions to validate the processing of aggregation limits
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives![0].finalCalculations
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[0].incentives[1].finalCalculations
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[0].finalCalculations
    ).toBeUndefined()
    expect(
      // @ts-ignore
      mockPlan.catalogueItems[1].incentives[1].finalCalculations
    ).toBeUndefined()
  })
})
