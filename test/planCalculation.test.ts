import { calculatePriceOfItems } from '@/app/utils/planCalculation'
import { CatalogueItem, Plan } from '@/types/types'

describe('calculatePriceOfItems', () => {
  it('should correctly calculate the total price of items in the plan', () => {
    const items: CatalogueItem[] = [
      { quantity: 2, basePricePer: 100 },
      { quantity: 3, basePricePer: 50 },
    ]
    const mockPlan: Plan = {
      planDetails: {
        selectedIncentives: [],
        imageIds: [],
        catalogueItems: items,
      },
    }

    const totalPrice = calculatePriceOfItems(mockPlan)
    expect(totalPrice).toBe(350)
  })

  it('should return 0 if plan details are missing or invalid', () => {
    const mockPlan: Plan = {}
    const totalPrice = calculatePriceOfItems(mockPlan)
    expect(totalPrice).toBe(0)
  })
})
