import prisma from '../../../lib/prisma'

// Get all aggregation limits with only the IDs of impacted incentives
export async function getAggregationLimits() {
  return await prisma.aggregationLimit.findMany({
    include: {
      impactedIncentives: {
        select: {
          id: true, // Select only the ID of each impacted incentive
        },
      },
    },
  })
}
