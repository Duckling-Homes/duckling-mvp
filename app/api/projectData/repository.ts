import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export async function createProjectData(
  projectData: Prisma.ProjectDataUncheckedCreateInput
) {
  return await prisma.projectData.create({
    data: {
      squareFootage: projectData.squareFootage,
      roomCount: projectData.roomCount,
      bathroomCount: projectData.bathroomCount,
      bedroomCount: projectData.bedroomCount,
      stories: projectData.stories,
      yearBuilt: projectData.yearBuilt,
      basementType: projectData.basementType,
      comfortIssueTags: projectData.comfortIssueTags,
      comfortIssueNotes: projectData.comfortIssueNotes,
      healthSafetyIssueTags: projectData.healthSafetyIssueTags,
      healthSafetyIssueNotes: projectData.healthSafetyIssueNotes,
      homeownerGoalsTags: projectData.homeownerGoalsTags,
      homeownerGoalsNotes: projectData.homeownerGoalsNotes,
      project: {
        connect: {
          id: projectData.projectId,
        },
      },
    },
  })
}

export async function getProjectData(projectId: string) {
  return await prisma.projectData.findUnique({
    where: { projectId },
  })
}

export async function updateProjectData(
  projectId: string,
  projectUpdates: Prisma.ProjectUpdateInput
) {
  return await prisma.projectData.update({
    where: { projectId },
    data: projectUpdates,
  })
}
