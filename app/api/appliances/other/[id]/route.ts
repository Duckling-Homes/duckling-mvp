import {
  deleteOtherAppliance,
  updateOtherAppliance,
  validateOtherApplianceProject,
} from '@/app/utils/repositories/appliances/other'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete an other appliance object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateOtherApplianceProject(orgContext as string, params.id)

    return NextResponse.json(await deleteOtherAppliance(params.id))
  }
)

/**
 * Update an other appliance object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      location,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateOtherApplianceProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateOtherAppliance(params.id, {
        fuel,
        age,
        manufacturer,
        modelNumber,
        serialNumber,
        location,
        notes,
      })
    )
  }
)
