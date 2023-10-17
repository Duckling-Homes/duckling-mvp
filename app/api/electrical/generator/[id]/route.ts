import {
  deleteProjectGenerator,
  updateProjectGenerator,
  validateGeneratorProject,
} from '@/app/utils/repositories/electrical/generator'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a project generator object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateGeneratorProject(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectGenerator(params.id))
  }
)

/**
 * Update a project generator object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      generatorType,
      fuelType,
      ratedContinuousWattage,
      ratedPeakWattage,
      voltage,
      numberOfPhases,
      transferSwitch,
      connection,
      yearInstalled,
      manufacturer,
      modelNumber,
      serialNumber,
      location,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateGeneratorProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectGenerator(params.id, {
        generatorType,
        fuelType,
        ratedContinuousWattage,
        ratedPeakWattage,
        voltage,
        numberOfPhases,
        transferSwitch,
        connection,
        yearInstalled,
        manufacturer,
        modelNumber,
        serialNumber,
        location,
        notes,
      })
    )
  }
)
