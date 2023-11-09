import { db } from '../db'
import { Organization } from '@/types/types'
import { FetchOperationOpts } from './types'

export class OrganizationSyncOperations {
  get = async (organizationID: string, opts?: FetchOperationOpts) => {
    if (opts?.forceSync) {
      const response = await fetch(
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
        added: Date.now(),
      })
    }

    const resp = await db.objects.where('id').equals(organizationID).first()
    return resp?.json as Organization
  }
}
