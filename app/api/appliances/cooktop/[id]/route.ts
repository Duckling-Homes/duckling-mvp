import {
  deleteCooktopAppliance,
  updateCooktopAppliance,
  validateCooktopProject,
} from '@/app/utils/repositories/appliances/cooktop'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a cooktop appliance object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateCooktopProject(orgContext as string, params.id)

    return NextResponse.json(await deleteCooktopAppliance(params.id))
  }
)

/**
 * Update a cooktop appliance object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      fuel,
      age,
      manufacturer,
      modelNumber,
      serialNumber,
      isInduction,
      location,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateCooktopProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateCooktopAppliance(params.id, {
        fuel,
        age,
        manufacturer,
        modelNumber,
        serialNumber,
        isInduction,
        location,
        notes,
      })
    )
  }
)
