import { getProjectAirSealing } from './projectAirSealing'
import { getProjectInsulation } from './projectInsulation'

export async function getProjectEnvelopes(projectId: string) {
  const insulations = (await getProjectInsulation(projectId)).map(
    (insulation) => {
      return { ...insulation, type: 'Insulation' }
    }
  )
  const airSealings = (await getProjectAirSealing(projectId)).map(
    (airSealing) => {
      return { ...airSealing, type: 'AirSealing' }
    }
  )

  return [...insulations, ...airSealings]
}
