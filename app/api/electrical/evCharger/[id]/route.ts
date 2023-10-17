import {
  deleteProjectEvCharger,
  updateProjectEvCharger,
  validateEvChargerProject,
} from '@/app/utils/repositories/electrical/evCharger'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a project evCharger object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateEvChargerProject(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectEvCharger(params.id))
  }
)

/**
 * Update a project evCharger object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      chargingLevel,
      amperage,
      acPowerSourceVolatge,
      maxChargingPower,
      manufacturer,
      modelNumber,
      serialNumber,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateEvChargerProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectEvCharger(params.id, {
        chargingLevel,
        amperage,
        acPowerSourceVolatge,
        maxChargingPower,
        manufacturer,
        modelNumber,
        serialNumber,
        notes,
      })
    )
  }
)
