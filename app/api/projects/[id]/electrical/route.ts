import { getProjectBatteries } from '@/app/utils/repositories/electrical/battery'
import { getProjectEvChargers } from '@/app/utils/repositories/electrical/evCharger'
import { getProjectGenerators } from '@/app/utils/repositories/electrical/generator'
import { getProjectElectricalPanels } from '@/app/utils/repositories/electrical/panel'
import { getAllProjectSolar } from '@/app/utils/repositories/electrical/solar'
import { getProject } from '@/app/utils/repositories/project'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Fetch electrical for a project
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

    const panels = (await getProjectElectricalPanels(params.id)).map(
      (panel) => {
        return { ...panel, type: 'ElectricalPanel' }
      }
    )
    const solar = (await getAllProjectSolar(params.id)).map((solar) => {
      return { ...solar, type: 'Solar' }
    })
    const evChargers = (await getProjectEvChargers(params.id)).map(
      (evCharger) => {
        return { ...evCharger, type: 'EvCharger' }
      }
    )
    const batteries = (await getProjectBatteries(params.id)).map((battery) => {
      return { ...battery, type: 'Battery' }
    })
    const generators = (await getProjectGenerators(params.id)).map(
      (generator) => {
        return { ...generator, type: 'Generator' }
      }
    )

    return NextResponse.json([
      ...panels,
      ...solar,
      ...evChargers,
      ...batteries,
      ...generators,
    ])
  }
)
