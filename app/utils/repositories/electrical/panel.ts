import { Prisma } from '@prisma/client'
import prisma from '../../../../lib/prisma'

export async function createProjectElectricalPanel(
  panelData: Prisma.ElectricalPanelUncheckedCreateInput
) {
  return await prisma.electricalPanel.create({
    data: {
      id: panelData.id,
      panelType: panelData.panelType,
      panelAmperageRating: panelData.panelAmperageRating,
      availableNewCircuits: panelData.availableNewCircuits,
      total15AmpCircuits: panelData.total15AmpCircuits,
      total20AmpCircuits: panelData.total20AmpCircuits,
      total30AmpCircuits: panelData.total30AmpCircuits,
      total40AmpCircuits: panelData.total40AmpCircuits,
      total50AmpCircuits: panelData.total50AmpCircuits,
      total60AmpCircuits: panelData.total60AmpCircuits,
      total70AmpCircuits: panelData.total70AmpCircuits,
      location: panelData.location,
      notes: panelData.notes,
      project: {
        connect: {
          id: panelData.projectId,
        },
      },
    },
  })
}

export async function updateProjectElectricalPanel(
  id: string,
  panelData: Prisma.ElectricalPanelUpdateInput
) {
  return await prisma.electricalPanel.update({
    where: { id },
    data: panelData,
  })
}

export async function deleteProjectElectricalPanel(id: string) {
  return await prisma.electricalPanel.delete({
    where: { id },
  })
}

export async function getProjectElectricalPanels(projectId: string) {
  return await prisma.electricalPanel.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'asc' }],
  })
}

export async function validateElectricalPanelProject(
  organizationId: string,
  id: string
) {
  const panel = await prisma.electricalPanel.findUnique({
    where: { id },
    include: {
      project: true,
    },
  })
  if (!panel || panel.project.organizationId != organizationId) {
    throw new Error('panel not found')
  }
}
