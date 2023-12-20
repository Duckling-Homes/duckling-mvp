import { ProjectNotFoundError } from '@/app/utils/errors'
import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'
import { getImagesByProjectId } from '@/app/utils/repositories/image'
import { getPlansByProjectId } from '@/app/utils/repositories/plan'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'
import {
  deleteProject,
  getProject,
  updateProject,
} from '../../../utils/repositories/project'
import { getProjectData } from '../../../utils/repositories/projectData'

/**
 * Get project by id
 * exmaple: curl http://localhost:3000/api/projects/[id]
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    const project = await getProject(params.id)

    if (!project || project.organizationId !== orgContext) {
      return NextResponse.json(new ProjectNotFoundError(params.id).toJSON())
    }

    const projectData = await getProjectData(params.id)
    const rooms = await getProjectRooms(params.id)
    const envelopes = await getProjectEnvelopes(params.id)
    const appliances = await getProjectAppliances(params.id)
    const electrical = await getProjectElectrical(params.id)
    const images = await getImagesByProjectId(params.id, orgContext)
    const plans = await getPlansByProjectId(params.id)

    return NextResponse.json({
      ...project,
      data: projectData,
      rooms,
      envelopes,
      appliances,
      electrical,
      images,
      plans,
    })
  }
)

/**
 * Delete a project by id
 * exmaple: curl -X DELETE http://localhost:3000/api/projects/[id]
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    const project = await getProject(params.id)

    if (!project || project.organizationId !== orgContext) {
      return NextResponse.json(new ProjectNotFoundError(params.id).toJSON())
    }

    return NextResponse.json(await deleteProject(params.id))
  }
)

/**
 * Update a project
 * exmaple: curl -X PATCH http://localhost:3000/api/projects/[id] -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com"}' -H "Content-Type: application/json"
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      homeownerAddress,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    const project = await getProject(params.id)

    if (!project || project.organizationId !== orgContext) {
      return NextResponse.json(new ProjectNotFoundError(params.id).toJSON())
    }

    return NextResponse.json(
      await updateProject(params.id, {
        name,
        homeownerName,
        homeownerPhone,
        homeownerEmail,
        homeownerAddress,
      })
    )
  }
)
