import { getProjectCooktopAppliances } from './cooktop'
import { getProjectHVACAppliances } from './hvac'
import { getProjectOtherAppliances } from './other'
import { getProjectWaterHeaterAppliances } from './waterHeater'

export async function getProjectAppliances(projectId: string) {
  const hvacAppliances = (await getProjectHVACAppliances(projectId)).map(
    (hvac) => {
      return { ...hvac, type: 'HVAC' }
    }
  )
  const waterHeaterAppliances = (
    await getProjectWaterHeaterAppliances(projectId)
  ).map((waterHeater) => {
    return { ...waterHeater, type: 'WaterHeater' }
  })
  const cooktopAppliances = (await getProjectCooktopAppliances(projectId)).map(
    (cooktop) => {
      return { ...cooktop, type: 'Cooktop' }
    }
  )
  const otherAppliances = (await getProjectOtherAppliances(projectId)).map(
    (other) => {
      return { ...other, type: 'Other' }
    }
  )

  return [
    ...hvacAppliances,
    ...waterHeaterAppliances,
    ...cooktopAppliances,
    ...otherAppliances,
  ]
}
