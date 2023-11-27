import { getProjectAppliances } from '@/app/utils/repositories/appliances/appliances'
import { getProjectElectrical } from '@/app/utils/repositories/electrical/electrical'
import { getProjectEnvelopes } from '@/app/utils/repositories/envelopes/envelopes'
import { getProject } from '@/app/utils/repositories/project'
import { getProjectData } from '@/app/utils/repositories/projectData'
import { getProjectRooms } from '@/app/utils/repositories/projectRoom'

export const getProjectObject = async (id: string) => {
  const project = await getProject(id)
  const projectData = await getProjectData(id)
  const rooms = await getProjectRooms(id)
  const envelopes = await getProjectEnvelopes(id)
  const appliances = await getProjectAppliances(id)
  const electrical = await getProjectElectrical(id)

  return {
    ...project,
    data: projectData,
    rooms,
    envelopes,
    appliances,
    electrical,
  }
}
