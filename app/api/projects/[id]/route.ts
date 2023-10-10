import withErrorHandler from '@/app/utils/withErrorHandler'
import { deleteProject, getProject, updateProject } from '../repository'
import { NextRequest, NextResponse } from 'next/server'
import { getProjectData } from './data/repository'

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

    return NextResponse.json({
      ...project,
      data: projectData,
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
