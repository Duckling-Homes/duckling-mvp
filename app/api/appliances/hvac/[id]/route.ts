import {
  deleteHVACAppliance,
  updateHVACAppliance,
  validateHVACProject,
} from '@/app/utils/repositories/appliances/hvac'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete an hvac appliance object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateHVACProject(orgContext as string, params.id)

    return NextResponse.json(await deleteHVACAppliance(params.id))
  }
)

/**
 * Update an hvac appliance object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      hvacSystemType,
      havcSystem,
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      heatingCapacity,
      coolingCapacity,
      location,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateHVACProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateHVACAppliance(params.id, {
        hvacSystemType,
        havcSystem,
        fuel,
        age,
        manufacturer,
        modelNumber,
        serialNumber,
        heatingCapacity,
        coolingCapacity,
        location,
        notes,
      })
    )
  }
)
