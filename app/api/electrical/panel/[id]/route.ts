import {
  updateProjectElectricalPanel,
  validateElectricalPanelProject,
  deleteProjectElectricalPanel,
} from '@/app/utils/repositories/electrical/panel'
import withErrorHandler from '@/app/utils/withErrorHandler'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Delete a project electricalPanel object
 */
export const DELETE = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const orgContext = req.headers.get('organization-context')
    await validateElectricalPanelProject(orgContext as string, params.id)

    return NextResponse.json(await deleteProjectElectricalPanel(params.id))
  }
)

/**
 * Update a project electricalPanel object
 */
export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const {
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
      notes,
    } = await req.json()

    const orgContext = req.headers.get('organization-context')
    await validateElectricalPanelProject(orgContext as string, params.id)

    return NextResponse.json(
      await updateProjectElectricalPanel(params.id, {
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
        notes,
      })
    )
  }
)
