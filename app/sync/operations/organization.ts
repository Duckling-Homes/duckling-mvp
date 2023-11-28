import { db } from '../db'
import { Organization } from '@/types/types'
import { isOnline, synchronizedFetch } from '../utils'

export class OrganizationSyncOperations {
  get = async (organizationID: string) => {
    if (isOnline()) {
      const response = await synchronizedFetch(
        `/api/organizations/${organizationID}`,
        {
          method: 'GET',
        }
      )
      const org: Organization = await response.json()
      await db.putObject({
        id: organizationID,
        type: 'Organizations',
        json: org,
        source: 'api'
      })
    }

    const resp = await db.objects.where('id').equals(organizationID).first()
    return resp?.json as Organization
  }

  getCatalogue = async () => {
    const response = await synchronizedFetch(
      `/api/productCatalogue/`,
      {
        method: 'GET',
      }
    )
    const catalogue = await response.json()

    return catalogue

  }
}
