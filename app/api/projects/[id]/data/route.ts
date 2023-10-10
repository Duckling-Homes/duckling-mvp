import withErrorHandler from '@/app/utils/withErrorHandler'
import { getProject } from '../../../../utils/repositories/project'
import { NextRequest, NextResponse } from 'next/server'
import { upsertProjectData } from './repository'

/**
 * Upsert project data
 */
export const POST = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
      squareFootage,
      roomCount,
      bathroomCount,
      bedroomCount,
      stories,
      yearBuilt,
      basementType,
      comfortIssueTags,
      comfortIssueNotes,
      healthSafetyIssueTags,
      healthSafetyIssueNotes,
      homeownerGoalsTags,
      homeownerGoalsNotes,
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
      await upsertProjectData({
        projectId: params.id,
        squareFootage,
        roomCount,
        bathroomCount,
        bedroomCount,
        stories,
        yearBuilt,
        basementType,
        comfortIssueTags,
        comfortIssueNotes,
        healthSafetyIssueTags,
        healthSafetyIssueNotes,
        homeownerGoalsTags,
        homeownerGoalsNotes,
      })
    )
  }
)
