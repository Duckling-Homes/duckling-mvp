import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

export const GET = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const project = await getProject(params.id)
    // Return all the project data... return all the plan data...
    // return all the images that are in the plans...f

    const projectData = await getProjectData(params.id)
    console.log('********** ', params.id)
    console.log(projectData)
    console.log(project)
    return NextResponse.json({
      ...project,
      data: projectData,
    })
  }
)
