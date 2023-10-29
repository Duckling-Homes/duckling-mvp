import withErrorHandler from '@/app/utils/withErrorHandler'
import {
  deleteProject,
  getProject,
  updateProject,
} from '../../../utils/repositories/project'
import { NextRequest, NextResponse } from 'next/server'
import { getProjectData } from '../../../utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'
import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getImagesByProjectId } from '@/app/utils/repositories/image'

/**
 * Get project by id
 * exmaple: curl http://localhost:3000/api/projects/[id]
 */
export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    const project = await getProject(params.id)

    if (!project || project.organizationId !== orgContext) {
      return NextResponse.json(
        { message: `Project not found` },
        { status: 404 }
      )
    }

    const projectData = await getProjectData(params.id)
    const rooms = await getProjectRooms(params.id)
    const envelopes = await getProjectEnvelopes(params.id)
    const appliances = await getProjectAppliances(params.id)
    const electrical = await getProjectElectrical(params.id)
    const images = await getImagesByProjectId(params.id, orgContext)

    return NextResponse.json({
      ...project,
      data: projectData,
      rooms,
      envelopes,
      appliances,
      electrical,
      images,
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
      return NextResponse.json(
        { message: `Project not found` },
        { status: 404 }
      )
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
      return NextResponse.json(
        { message: `Project not found` },
        { status: 404 }
      )
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
