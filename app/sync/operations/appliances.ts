import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { ProjectAppliance } from '@/types/types';
import { SyncAPI } from '..';

export class ApplianceSyncOperations {

    create = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
        appliance.id = appliance.id ?? uuidv4();
        await db.enqueueRequest(`/api/appliances/${applianceType}`, {
            method: 'POST',
            body: JSON.stringify({
                ...appliance,
                projectId: projectID
            })
        });

        await SyncAPI.projects._swap(projectID, (proj) => {
            proj.appliances = proj.appliances ?? [];
            proj.appliances.push(appliance);
            return proj;
        });
        return appliance;
    };

    update = async (projectID: string, applianceType: string, appliance: ProjectAppliance) => {
        await db.enqueueRequest(`/api/appliances/${applianceType}/${appliance.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...appliance,
                projectId: projectID
            })
        });

        await SyncAPI.projects._swap(projectID, (proj) => {
            const idx = proj.appliances?.findIndex(app => app.id === appliance.id);
            if (idx) {
                proj.appliances?.splice(idx, 1);
            }
            proj.appliances?.push(appliance);
            return proj;
        });

        return appliance;
    };

    delete = async (projectID: string, applianceType: string, applianceId: string) => {
        await db.enqueueRequest(`/api/appliances/${applianceType}/${applianceId}`, {
            method: 'DELETE',
        });

        await SyncAPI.projects._swap(projectID, (proj) => {
            const idx = proj.appliances?.findIndex(app => app.id === applianceId);
            if (idx) {
                proj.appliances?.splice(idx, 1);
            }
            return proj;
        });
    };
}
