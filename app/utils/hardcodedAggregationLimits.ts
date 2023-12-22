import { AggregationLimit, AggregationLimitClass } from './planCalculation'

const hardcodedAggregationLimits: AggregationLimit[] = [
  {
    id: 'uuid-al-101',
    limitName:
      'Annual Federal Tax Credit Limit - heat pumps, heat pump water heaters, and biomass stoves/boilers',
    limitDescription: '',
    limitWarning:
      'You have met the maximum annual tax credit limit for heat pumps, heat pump water heaters, and biomass stoves/boilers',
    impactedIncentiveIds: ['uuid-101', 'uuid-105'],
    limitAmount: 2000,
  },
  {
    id: 'uuid-al-102',
    limitName:
      'Annual Federal Tax Credit Limit - home envelope improvements (windows/doors/skylights, insulation, electrical), furnaces, boilers, and central air conditioners',
    limitDescription: '',
    limitWarning:
      'You have met the maximum annual tax credit limit for envelope improvements, furnaces, boilers, and central air conditioners',
    impactedIncentiveIds: [
      'uuid-113',
      'uuid-109',
      'uuid-108',
      'uuid-107',
      'uuid-106',
      'uuid-104',
      'uuid-103',
      'uuid-102',
    ],
    limitAmount: 1200,
  },
  {
    id: 'uuid-al-103',
    limitName: 'High-Efficiency Electric Home Rebate Limit',
    limitDescription: '',
    limitWarning:
      'You have met the maximum limit for rebates through the HEEHRA program',
    impactedIncentiveIds: [
      'uuid-119',
      'uuid-120',
      'uuid-121',
      'uuid-122',
      'uuid-123',
      'uuid-124',
      'uuid-125',
      'uuid-126',
      'uuid-127',
      'uuid-128',
      'uuid-129',
      'uuid-130',
      'uuid-131',
      'uuid-132',
    ],
    limitAmount: 14000,
  },
]

// Instantiate AggregationLimitClass for each hardcoded aggregation limit
export const aggregationLimits = hardcodedAggregationLimits.map(
  (limit) => new AggregationLimitClass(limit)
)
