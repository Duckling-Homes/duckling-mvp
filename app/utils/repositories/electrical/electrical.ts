import { getProjectBatteries } from './battery'
import { getProjectEvChargers } from './evCharger'
import { getProjectGenerators } from './generator'
import { getProjectElectricalPanels } from './panel'
import { getAllProjectSolar } from './solar'

export async function getProjectElectrical(projectId: string) {
  const panels = (await getProjectElectricalPanels(projectId)).map((panel) => {
    return { ...panel, type: 'ElectricalPanel' }
  })
  const solar = (await getAllProjectSolar(projectId)).map((solar) => {
    return { ...solar, type: 'Solar' }
  })
  const evChargers = (await getProjectEvChargers(projectId)).map(
    (evCharger) => {
      return { ...evCharger, type: 'EvCharger' }
    }
  )
  const batteries = (await getProjectBatteries(projectId)).map((battery) => {
    return { ...battery, type: 'Battery' }
  })
  const generators = (await getProjectGenerators(projectId)).map(
    (generator) => {
      return { ...generator, type: 'Generator' }
    }
  )

  return [...panels, ...solar, ...evChargers, ...batteries, ...generators]
}
