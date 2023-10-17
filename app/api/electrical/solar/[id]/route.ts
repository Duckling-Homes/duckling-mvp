import {
  deleteProjectSolar,
  updateProjectSolar,
  validateSolarProject,
} from '@/app/utils/repositories/electrical/solar'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a project solar object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateSolarProject(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectSolar(params.id))
  }
)

/**
 * Update a project solar object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      location,
      ownership,
      moduleType,
      tracking,
      arrayOrientation,
      arrayTilt,
      maxPowerOutput,
      numberOfPanels,
      yearInstalled,
      annualOutput,
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateSolarProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectSolar(params.id, {
        location,
        ownership,
        moduleType,
        tracking,
        arrayOrientation,
        arrayTilt,
        maxPowerOutput,
        numberOfPanels,
        yearInstalled,
        annualOutput,
        notes,
      })
    )
  }
)
