import {
  deleteWaterHeaterAppliance,
  updateWaterHeaterAppliance,
  validateWaterHeaterProject,
} from '@/app/utils/repositories/appliances/waterHeater'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a water heater appliance object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateWaterHeaterProject(orgContext as string, params.id)

    return NextResponse.json(await deleteWaterHeaterAppliance(params.id))
  }
)

/**
 * Update a water heater appliance object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      systemType,
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      tankVolume,
      location,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateWaterHeaterProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateWaterHeaterAppliance(params.id, {
        systemType,
        fuel,
        age,
        manufacturer,
        modelNumber,
        serialNumber,
        tankVolume,
        location,
        notes,
      })
    )
  }
)
