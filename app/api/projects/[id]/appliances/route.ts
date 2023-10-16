import { getProjectCooktopAppliances } from '@/app/utils/repositories/appliances/cooktop'
import { getProjectHVACAppliances } from '@/app/utils/repositories/appliances/hvac'
import { getProjectOtherAppliances } from '@/app/utils/repositories/appliances/other'
import { getProjectWaterHeaterAppliances } from '@/app/utils/repositories/appliances/waterHeater'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Fetch appliances for a project
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

    const hvacAppliances = (await getProjectHVACAppliances(params.id)).map(
      (hvac) => {
        return { ...hvac, type: 'HVAC' }
      }
    )
    const waterHeaterAppliances = (
      await getProjectWaterHeaterAppliances(params.id)
    ).map((waterHeater) => {
      return { ...waterHeater, type: 'WaterHeater' }
    })
    const cooktopAppliances = (
      await getProjectCooktopAppliances(params.id)
    ).map((cooktop) => {
      return { ...cooktop, type: 'Cooktop' }
    })
    const otherAppliances = (await getProjectOtherAppliances(params.id)).map(
      (other) => {
        return { ...other, type: 'Other' }
      }
    )

    return NextResponse.json([
      ...hvacAppliances,
      ...waterHeaterAppliances,
      ...cooktopAppliances,
      ...otherAppliances,
    ])
  }
)
