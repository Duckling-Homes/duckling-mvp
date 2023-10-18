import {
  deleteProjectBattery,
  updateProjectBattery,
  validateBatteryProject,
} from '@/app/utils/repositories/electrical/battery'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a project battery object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateBatteryProject(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectBattery(params.id))
  }
)

/**
 * Update a project battery object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      totalCapacity,
      ratedPowerOutput,
      ratedPeakOutput,
      voltage,
      gridConnected,
      manufacturer,
      modelNumber,
      serialNumber,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateBatteryProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectBattery(params.id, {
        totalCapacity,
        ratedPowerOutput,
        ratedPeakOutput,
        voltage,
        gridConnected,
        manufacturer,
        modelNumber,
        serialNumber,
        notes,
      })
    )
  }
)
