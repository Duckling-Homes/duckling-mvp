import { CatalogueItem, Plan } from '@/types/types'

export function calculatePriceOfItem(item: CatalogueItem): number {
  // Assuming quantity is a number and basePricePer is defined
  const quantity =
    typeof item.quantity === 'string'
      ? parseInt(item.quantity, 10)
      : item.quantity || 0
  const basePrice = item.basePricePer || 0
  // Additional costs can be included here if they are part of the item structure
  return quantity * basePrice
}

export function calculatePriceOfItems(plan: Plan): number {
  if (!plan.planDetails || typeof plan.planDetails === 'string') {
    return 0
  }
  return Object.values(plan.planDetails)
    .flat()
    .filter((item): item is CatalogueItem => typeof item !== 'string')
    .reduce((total, item) => total + calculatePriceOfItem(item), 0)
}
