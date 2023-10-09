import withErrorHandler from '@/app/utils/withErrorHandler'
import { createProject, getProjects } from './repository'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Create a project
 * example: curl -X POST http://localhost:3000/api/projects -d '{"name":"Renovation Seattle", "homeownerName":"Rahul Patni", "homeownerPhone":"123-231-1233", "homeownerEmail":"asdf@asdf.com", "homeownerAddress": "123 Main"}' -H "Content-Type: application/json"
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const {
    name,
    homeownerName,
    homeownerPhone,
    homeownerEmail,
    homeownerAddress,
  } = await req.json()

  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(
    await createProject({
      name,
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      homeownerAddress,
      organizationId: orgContext as string,
    })
  )
})

/**
 * Get all projects
 * exmaple: curl http://localhost:3000/api/projects
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const orgContext = req.headers.get('organization-context')

  return NextResponse.json(await getProjects(orgContext as string))
})
