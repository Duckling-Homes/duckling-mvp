import { ProjectNotFoundError } from '@/app/utils/errors'
import { createProjectElectricalPanel } from '@/app/utils/repositories/electrical/panel'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create project electrical panel
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    id,
    panelType,
    panelAmperageRating,
    availableNewCircuits,
    total15AmpCircuits,
    total20AmpCircuits,
    total30AmpCircuits,
    total40AmpCircuits,
    total50AmpCircuits,
    total60AmpCircuits,
    total70AmpCircuits,
    location,
    notes,
    projectId,
  } = await req.json()
  const orgContext = req.headers.get('organization-context')
  const project = await getProject(projectId)

  if (!project || project.organizationId !== orgContext) {
    return NextResponse.json(new ProjectNotFoundError(projectId).toJSON())
  }
  return NextResponse.json(
    await createProjectElectricalPanel({
      id,
      panelType,
      panelAmperageRating,
      availableNewCircuits,
      total15AmpCircuits,
      total20AmpCircuits,
      total30AmpCircuits,
      total40AmpCircuits,
      total50AmpCircuits,
      total60AmpCircuits,
      total70AmpCircuits,
      location,
      notes,
      projectId,
    })
  )
})
